from rest_framework import serializers
from .models import User, Todo


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model  = User
        fields = ['id', 'user_name', 'email', 'password', 'created_at']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        user = User.objects.create(
            user_name = validated_data['user_name'],
            email     = validated_data['email'],
            password  = validated_data['password'],
        )
        return user


class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Todo
        fields = ['id', 'user', 'title', 'description', 'is_completed']

    def create(self, validated_data):
        return Todo.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.title        = validated_data.get('title', instance.title)
        instance.description  = validated_data.get('description', instance.description)
        instance.is_completed = validated_data.get('is_completed', instance.is_completed)
        instance.save()
        return instance


class LoginSerializer(serializers.Serializer):
    user_name = serializers.CharField()
    password  = serializers.CharField()