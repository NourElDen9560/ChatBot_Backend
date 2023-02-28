from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from UserApp.models import User
from UserApp.serializer import UserSerializer
import pandas as pd 
import numpy as np
import pickle 
import nltk
nltk.download('stopwords')
from nltk.stem import SnowballStemmer
from nltk.corpus import stopwords

import re
# Create your views here.
stop_words=set(nltk.corpus.stopwords.words('english'))

with open('F:\\ChatBot_GpIS\\VScode\\API\\ChatBot\\UserApp\\sof_first_model.sav', 'rb') as f:
    multilabel_model = pickle.load(f)
with open('F:\\ChatBot_GpIS\\VScode\\API\\ChatBot\\UserApp\\tfidf_object.pickle', 'rb') as k:
    tfidf_vectorizer = pickle.load(k)
with open('F:\\ChatBot_GpIS\\VScode\\API\\ChatBot\\UserApp\\multilabel_binarizer.pickle', 'rb') as g:
    mlb = pickle.load(g)
print(multilabel_model)

def model_func(question):
    # processing the question - 
    question = question.replace('<p>',' ')
    
    f1 = lambda x : re.sub('(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)' , ' ' , x)
    question = f1(question)
    
    question = question.replace('</p>',' ')
    question = question.replace('\n',' ')
    question = question.replace('</a>',' ')
    
    f2 = lambda x : x.lower()
    question = f2(question)
    
    f3 = lambda x : ' '.join([w for w in x.split() if not w in stop_words])
    question = f3(question)
    
    question = question.replace('<a href=" ">','')
    
    f4 = lambda x : ' '.join([w for w in x.split() if len(w)>3])
    question = f4(question)
    # applying tfidf - 
    tr_question = tfidf_vectorizer.transform(pd.Series([question]))  
    # predicting the tags for the input question - 
    return multilabel_model.predict(tr_question)

@csrf_exempt
def UserApi(request):
    if request.method == 'GET':
        AllUsers = User.objects.all()
        print(AllUsers)
        Userserializer = UserSerializer(AllUsers , many=True)
        return JsonResponse(Userserializer.data , safe=False)
    elif request.method == 'POST':
        UserData = JSONParser().parse(request)
        print(UserData)
        Userserializer = UserSerializer(data=UserData)
        if Userserializer.is_valid():
            Userserializer.save()
            return JsonResponse("Added Succesfully",safe=False)
        print( Userserializer.errors)
        return JsonResponse("Failed To Add ",safe=False)
    elif request.method == 'PUT':
        UserData = JSONParser().parse(request)
        SingleUser  = User.objects.get(UserId=UserData["UserId"])
        Userserializer = UserSerializer(SingleUser , data=UserData)
        if Userserializer.is_valid():
            Userserializer.save()
            return JsonResponse("Updated Succesfully",safe=False)
        return JsonResponse("Failed To Update",safe=False)
@csrf_exempt
def ChatBotApi(request):
    if request.method == 'POST':
        sample_output = model_func(JSONParser().parse(request)["data"])
        return JsonResponse(mlb.inverse_transform(sample_output),safe=False)