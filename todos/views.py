from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from .models import User, Todo
from .serializers import UserSerializer, TodoSerializer, LoginSerializer


# ─── REGISTER ────────────────────────────────────────
@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# ─── LOGIN ───────────────────────────────────────────
@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    serializer = LoginSerializer(data=request.data)
    if serializer.is_valid():
        user_name = serializer.validated_data['user_name']
        password  = serializer.validated_data['password']

        try:
            user = User.objects.get(user_name=user_name, password=password)
        except User.DoesNotExist:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

        # generate JWT token for this user
        refresh = RefreshToken()
        refresh['user_id']   = user.id
        refresh['user_name'] = user.user_name

        return Response({
            'access':  str(refresh.access_token),
            'refresh': str(refresh),
            'user':    UserSerializer(user).data
        })

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# ─── USERS ───────────────────────────────────────────
@api_view(['GET'])
@permission_classes([AllowAny])
def user_list(request):
    users = User.objects.all()
    return Response(UserSerializer(users, many=True).data)


# ─── TODOS ───────────────────────────────────────────
@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def todo_list(request):

    if request.method == 'GET':
        todos = Todo.objects.all()
        return Response(TodoSerializer(todos, many=True).data)

    if request.method == 'POST':
        serializer = TodoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([AllowAny])
def todo_detail(request, pk):
    try:
        todo = Todo.objects.get(pk=pk)
    except Todo.DoesNotExist:
        return Response({'error': 'Todo not found'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        return Response(TodoSerializer(todo).data)

    if request.method == 'PUT':
        serializer = TodoSerializer(todo, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'DELETE':
        todo.delete()
        return Response({'message': 'Todo deleted'}, status=status.HTTP_204_NO_CONTENT)