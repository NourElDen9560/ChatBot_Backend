import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { FooterComponent } from './shared/footer/footer.component';
import { NavbarComponent } from './shared/navbar/navbar.component';

import { AuthInterceptor } from './services/interceptor/auth.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSelectModule} from '@angular/material/select';
import {NgbPaginationModule, NgbAccordionModule , NgbCarouselModule} from '@ng-bootstrap/ng-bootstrap';

import { ChatbotComponent } from './pages/chatbot/chatbot.component';
@NgModule({
  declarations: [
    AppComponent,
   
    FooterComponent,
    NavbarComponent,
   ChatbotComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule , 
    FormsModule , 
    ReactiveFormsModule ,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSelectModule    ,NgbPaginationModule,NgbModule,NgbAccordionModule,NgbPaginationModule,NgbCarouselModule
  
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS , useClass:AuthInterceptor, multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
