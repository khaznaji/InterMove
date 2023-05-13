import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddEventsComponent } from './Events/add-events/add-events.component';
import { ListEventsComponent } from './Events/list-events/list-events.component';
import { AddComplaintsComponent } from './Complaints/add-complaints/add-complaints.component';
import { ListComplaintsComponent } from './Complaints/list-complaints/list-complaints.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MenuFrontComponent } from './menu-front/menu-front.component';
import { UpdateEventComponent } from './Events/update-event/update-event.component';
import { UpdateComplaintsComponent } from './Complaints/update-complaints/update-complaints.component';
import { QrcodeComponent } from './Qrcode/qrcode/qrcode.component';
import { VideochatComponent } from './Events/videochat/videochat.component';
import { VideochatPageComponent } from './Events/videochat-page/videochat-page.component';
import { ListEventsFrontComponent } from './Events/list-events-front/list-events-front.component';
import { EmbedVideoService } from 'ngx-embed-video';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ListUserComplaintsComponent } from './Complaints/list-user-complaints/list-user-complaints.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { NgxPaginationModule } from 'ngx-pagination';
import { WeatherComponent } from './Events/weather/weather.component';
import { DetailEventComponent } from './Events/detail-event/detail-event.component';
import { ToastrModule } from 'ngx-toastr';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { MatNativeDateModule } from '@angular/material/core';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { QuizComponent } from './userQuiz/quiz/quiz.component';
import {  QuestionUComponent } from './userQuiz/question/question.component';
import { MatTableModule } from '@angular/material/table';

import { ListQuizComponent } from './quizz/list-quiz/list-quiz.component';
import { CommonModule } from '@angular/common';
import { AddOffersComponent } from './Offers/add-offers/add-offers.component';
import { ListOffersComponent } from './Offers/list-offers/list-offers.component';
import { UpdateOffersComponent } from './Offers/update-offers/update-offers.component';
import { AddTagsComponent } from './Tags/add-tags/add-tags.component';
import { ListTagsComponent } from './Tags/list-tags/list-tags.component';
import { UpdateTagsComponent } from './Tags/update-tags/update-tags.component';
import { QuestionComponent } from './quizz/question/question.component';

import { CandidacyComponent } from './candidacy/candidacy.component';
import { CandidacyDetailComponent } from './candidacy-detail/candidacy-detail.component';
import { CandidacyAddComponent } from './candidacy-add/candidacy-add.component';
import { CoursesAddComponent } from './courses-add/courses-add.component';
import { CoursesComponent } from './courses/courses.component';
import { UpdateCoursesComponent } from './update-courses/update-courses.component';
import { ListOffersinteressComponent } from './Offers/list-offersinteress/list-offersinteress.component';
import {MatIconModule} from '@angular/material/icon';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
//import {NgxExtendedPdfViewerModule} from "ngx-extended-pdf-viewer";
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { CoursesDetailComponent } from './courses-detail/courses-detail.component';
import { CoursesBackComponent } from './courses-back/courses-back.component';

//user imports
import { GalleryModule } from  'ng-gallery';
import { SignupComponent } from './User/Front_end/signup/signup.component';
import { LoginComponent } from './User/Front_end/login/login.component';
import { ForgetpasswordComponent } from './User/Front_end/forgotpassword/forgetpassword.component';
import { ListUsersComponent } from './User/Back_end/list-users/list-users.component';
import { AddUserComponent } from './User/Back_end/add-user/add-user.component';
import { HttpInterceptorService } from './User/security/http-interceptor.service';
import { EditprofileComponent } from './User/Front_end/editprofile/editprofile.component';
import { NgxCaptchaModule } from 'ngx-captcha';
import { CodeActivationComponent } from './User/Front_end/code-activation/code-activation.component';
import { ResetPasswordComponent } from './User/Front_end/reset-password/reset-password.component';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from 'angularx-social-login';
import { ListOffershistoryComponent } from './Offers/list-offershistory/list-offershistory.component';
import { FeedsComponent } from './feeds/feeds.component';
import { ConversationComponent } from './Messages/conversation/conversation.component';

import { ResponseComponent } from './quizz/response/response.component'

//Accomodation imports
import { AddAgencyComponent } from './accomodation/components/Agency/add-agency/add-agency.component';
import { AgencyDetailsComponent } from './accomodation/components/Agency/agency-details/agency-details.component';
import { AgenciesListComponent } from './accomodation/components/Agency/agencies-list/agencies-list.component';
import { AgentsListComponent } from './accomodation/components/Agent/agents-list/agents-list.component';
import { AgentDetailsComponent } from './accomodation/components/Agent/agent-details/agent-details.component';
import { AddAgentComponent } from './accomodation/components/Agent/add-agent/add-agent.component';
import { HousesListComponent } from './accomodation/components/Houses/houses-list/houses-list.component';
import { AddHousesComponent } from './accomodation/components/Houses/add-houses/add-houses.component';
import { HouseDetailsComponent } from './accomodation/components/Houses/house-details/house-details.component';

import { FrontHousesListComponent } from './accomodation/components/Front-houses-list/front-houses-list.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SearchPipe} from './accomodation/components/Front-houses-list/search.pipe';
import { FrontHouseDetailsComponent } from './accomodation/components/front-house-details/front-house-details.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import {SearchNamePipe} from './accomodation/pipes/search.pipe'
import {SearchHousePipe} from './accomodation/pipes/housesearch.pipe'
import {SearchfHousePipe} from './accomodation/pipes/fhousesearch.pipe';
import { MapComponent } from './accomodation/components/map/map.component'
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { RecomendedComponent } from './recomended/recomended.component';
import { CandidacyFrontComponent } from './candidacy-front/candidacy-front.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { OfferFrontComponent } from './Offers/offer-front/offer-front.component';
import { MenuComponent } from './menu/menu.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    AddEventsComponent,
    ListEventsComponent,
    AddComplaintsComponent,
    ListComplaintsComponent,
    MenuFrontComponent,
    UpdateEventComponent,
    UpdateComplaintsComponent,
    QrcodeComponent,
    VideochatComponent,
    VideochatPageComponent,
    ListEventsFrontComponent,
    ListUserComplaintsComponent,
    WeatherComponent,
    DetailEventComponent,
    QuizComponent,
    QuestionUComponent,
    ListQuizComponent,
    AddOffersComponent,
    ListOffersComponent,
    UpdateOffersComponent,
    AddTagsComponent,
    ListTagsComponent,
    UpdateTagsComponent,QuestionComponent, 
    ListOffersinteressComponent,
    LoginComponent,
    SignupComponent,
    ForgetpasswordComponent,
    ListUsersComponent,
    AddUserComponent,
    EditprofileComponent,
    CodeActivationComponent,
    ResetPasswordComponent,
  
    ListOffershistoryComponent,FeedsComponent,  ConversationComponent,
    ResponseComponent,
    SearchPipe,
    AddAgencyComponent,
    AgencyDetailsComponent,
    AgenciesListComponent,
    AgentsListComponent,
    AgentDetailsComponent,
    AddAgentComponent,
    HousesListComponent,
    AddHousesComponent,
    HouseDetailsComponent,
    FrontHousesListComponent,
    SearchNamePipe,
    SearchHousePipe,
    SearchfHousePipe,
    FrontHouseDetailsComponent,
    MapComponent,
    
    RecomendedComponent,
    CoursesDetailComponent,
    CoursesBackComponent,
    CandidacyFrontComponent,
    CandidacyComponent,
    CandidacyDetailComponent,
    CandidacyAddComponent,
    CoursesComponent,
    CoursesAddComponent,
    UpdateCoursesComponent,
    
    OfferFrontComponent,
    
  ],
  schemas: [NO_ERRORS_SCHEMA],
  imports: [BsDatepickerModule.forRoot(),
    BrowserModule,
    AppRoutingModule, 
    HttpClientModule,
    FormsModule,ReactiveFormsModule, 
    MatFormFieldModule, MatSelectModule, NgxFileDropModule,NgxPaginationModule,
    ToastrModule.forRoot(),    BrowserAnimationsModule,
    MatDatepickerModule,
    MatInputModule,    MatNativeDateModule,MatTableModule,
    CommonModule,
    GalleryModule,
    NgxCaptchaModule,
    SocialLoginModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    Ng2SearchPipeModule,
    MatCheckboxModule,

    //Accomodation
    MatFormFieldModule,
    FontAwesomeModule,
    CarouselModule,
    NgxMapboxGLModule.withConfig({
      accessToken: 'pk.eyJ1IjoicmF5ZW5raDk5IiwiYSI6ImNsaGRoOW5tNzBoazkzZm8yYjF1djZ6dWYifQ.Txa015ifeMAjrCPHxXZmKw', // Optional, can also be set per map (accessToken input of mgl-map)
    })
    

     
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '998943596311-agii5b72rppsj1h1tdp5f75mhnfj22s7.apps.googleusercontent.com'
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('183705634636738')
          }
        ]
      } as SocialAuthServiceConfig,
    },EmbedVideoService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    },
  ],
  //providers: [EmbedVideoService ], // Add the EmbedVideoService here
  bootstrap: [AppComponent]
})
export class AppModule { }




