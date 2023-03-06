import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserapiService {
  api = `http://localhost:3000/api/user/`
  public isLogin = false
  public AdminOrNot = false;
  public photo = "" ;
  public Date =new Date().toDateString()
  constructor(private http: HttpClient) { }
  AutoTaggingApi(Data:any):Observable<any>{
    return this.http.post(' http://127.0.0.1:8000/autotag',Data)
  }
  RegisterApi(Data:any):Observable<any>{
return this.http.post(`${this.api}register`, Data)
  }
  LoginApi(Data:any):Observable<any>{
  return  this.http.post(`${this.api}login`, Data)
      }
  LogOutApi():Observable<any>{
  return  this.http.post(`${this.api}logout`,{})
      }
  MyProfile():Observable<any>{
    return  this.http.get(`${this.api}myprofile`)
        }
  ChangeMyPasword(Data:any):Observable<any>{
    return  this.http.post(`${this.api}updatepassword` ,Data)
  
  }        
EditMyProfile(Data:any):Observable<any>{
  return  this.http.post(`${this.api}edit` ,Data)
      }  
    
UploadImage(data:any):Observable<any>{
  return this.http.post(`${this.api}uploadimg` ,data)
}
dashboard():Observable<any>{
  return this.http.get(`${this.api}showall`)
}
SearchByName(name:any):Observable<any>{
  return this.http.post(`${this.api}searchbyname` ,name)
}
CheckAndSendOtp(data:any):Observable<any>{
  return this.http.post(`${this.api}verify` ,data)
}
      
    
      
}
