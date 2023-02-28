from django.urls import re_path , include
from UserApp import views

urlpatterns = [
    re_path(r'^user$',views.UserApi),
    re_path(r'^user/([0-9]+)$',views.UserApi),
    re_path(r'^autotag$',views.ChatBotApi)    

]
