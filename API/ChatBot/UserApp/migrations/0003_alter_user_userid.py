# Generated by Django 4.1 on 2023-02-22 12:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('UserApp', '0002_alter_user_userid'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='UserId',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
    ]
