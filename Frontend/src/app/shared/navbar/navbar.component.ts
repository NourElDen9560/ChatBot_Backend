import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';

import { UserapiService } from 'src/app/services/userapi.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
//, public myprofilecomponent:MyprofileComponent
  constructor(public user:UserapiService   , private router:Router) { }

  LogInOrNot = false;
  p:any = ''
  MyData:User={
name:'', password:'', email:'',age:0
  }
  photo:any;
  ngOnInit(): void {
  
    this.MyAccount();
    const token = localStorage.getItem('UserToken');
    if(token)
    this.user.isLogin = true;
   // this.LogInOrNot = true;
  this.photo=localStorage.getItem('photo');
   //this.MyAccount()
  }
  
    
  onChange(event: any){
    console.log(event.value);
  }

  MyAccount(){
    this.user.MyProfile().subscribe(
      (res)=>{
        
console.log(res.data);
this.MyData = res.data;
this.p = res.data.image;
        
console.log(this.MyData);
      },
      (err)=>{console.log(err) }
    )
  }
  LogOutHandler(){
    this.user.LogOutApi().subscribe(
      (res)=>{
        console.log("LogOut Successfully");
        this.user.isLogin=false
      }
      , 
      (err)=>{console.log(err) }
      ,
      ()=>{
        this.user.AdminOrNot = false;
        localStorage.removeItem('UserToken');
        localStorage.removeItem('photo');
        this.LogInOrNot=false;
        

 this.router.navigate(['/login']);
// window.location.reload();       
      }
    )
  }


}
