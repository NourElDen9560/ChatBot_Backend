import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserapiService } from 'src/app/services/userapi.service';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent implements OnInit {

  constructor(private data: UserapiService , private router: Router) { }
  
  login = new FormGroup(
    {data:new FormControl('', Validators.required) 
  })
  ChatBot = new FormGroup({
    answer : new FormControl('', Validators.required)
  })

  ngOnInit(): void {
  }
  GetAutoTag(){
this.data.AutoTaggingApi(this.login.value).subscribe(
  res=>{
    console.log(res[0])
    if(res[0].length == 0)
    document.getElementsByClassName('response')[0].innerHTML = "We not Suppot This Tag"
    else
    document.getElementsByClassName('response')[0].innerHTML = res[0] 

  },
  err=>console.log(err),
  ()=>{

  }
)
  }
  GetSimilarity(){
     console.log(this.ChatBot.value)
  var li= document.createElement('li')
  li.className ='userInput';
  li.innerHTML = this.ChatBot.value.answer ? this.ChatBot.value.answer : 'Undefinded'
  //li.style.cssText+="padding: 0.85em;margin: 0.5em;max-width: 100%;background-color: #fff;border-radius: 5px;border-bottom: 1px solid #777;text-transform: lowercase;box-shadow: 1px 1px 2px #666;border-top: 4px solid #CC8914;opacity: 0;animation-name: animateBubble;animation-duration: 400ms;animation-iteration-count: 1;animation-play-state: running;animation-fill-mode: forwards;" 
    document.getElementsByClassName('chatlist')[0].appendChild(li)

  }
  

}
