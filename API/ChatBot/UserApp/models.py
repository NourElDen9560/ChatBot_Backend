from django.db import models

# Create your models here.
class User(models.Model):
    UserId = models.AutoField(primary_key=True)
    Username = models.CharField(max_length=50)
    UserEmail = models.EmailField(max_length=50)
    Userpassword = models.CharField(max_length=50)