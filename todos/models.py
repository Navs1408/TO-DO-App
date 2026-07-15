from django.db import models

class User(models.Model):
    user_name  = models.CharField(max_length=150, unique=True)
    password   = models.CharField(max_length=255)
    email      = models.EmailField(unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'USER'

    def __str__(self):
        return self.user_name


class Todo(models.Model):
    user         = models.ForeignKey(User, on_delete=models.CASCADE)
    title        = models.CharField(max_length=255)
    description  = models.TextField(blank=True, null=True)
    is_completed = models.BooleanField(default=False)

    class Meta:
        db_table = 'TODO'

    def __str__(self):
        return self.title