import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComplaintsComponent } from './Complaints/list-complaints/list-complaints.component';
import { ListEventsComponent } from './Events/list-events/list-events.component';
import { AddComplaintsComponent } from './Complaints/add-complaints/add-complaints.component';
import { AddEventsComponent } from './Events/add-events/add-events.component';
import { MenuComponent } from './menu/menu.component';
import { MenuFrontComponent } from './menu-front/menu-front.component';
import { UpdateEventComponent } from './Events/update-event/update-event.component';
import { UpdateComplaintsComponent } from './Complaints/update-complaints/update-complaints.component';
import { QrcodeComponent } from './Qrcode/qrcode/qrcode.component';
import { ListEventsFrontComponent } from './Events/list-events-front/list-events-front.component';
import { VideochatComponent } from './Events/videochat/videochat.component';
import { ListUserComplaintsComponent } from './Complaints/list-user-complaints/list-user-complaints.component';
import { WeatherComponent } from './Events/weather/weather.component';
import { DetailEventComponent } from './Events/detail-event/detail-event.component';
import { ListQuizComponent } from './quizz/list-quiz/list-quiz.component';
import { QuizComponent } from './userQuiz/quiz/quiz.component';
import { ListOffersComponent } from './Offers/list-offers/list-offers.component';
import { ListOffersinteressComponent } from './Offers/list-offersinteress/list-offersinteress.component';

import { ListTagsComponent } from './Tags/list-tags/list-tags.component';


import { AddOffersComponent } from './Offers/add-offers/add-offers.component';
import { AddTagsComponent } from './Tags/add-tags/add-tags.component';

import { UpdateOffersComponent } from './Offers/update-offers/update-offers.component';
import { UpdateTagsComponent } from './Tags/update-tags/update-tags.component';
import { QuestionUComponent } from './userQuiz/question/question.component';
import { QuestionComponent } from './quizz/question/question.component';
import { Offer } from './model/Offer/offer.model';
import { OfferFrontComponent } from './Offers/offer-front/offer-front.component';
import { CandidacyComponent } from './candidacy/candidacy.component';
import { CandidacyDetailComponent } from './candidacy-detail/candidacy-detail.component';
import { CandidacyAddComponent } from './candidacy-add/candidacy-add.component';
import { CoursesComponent } from './courses/courses.component';
import { CoursesAddComponent } from './courses-add/courses-add.component';
import { UpdateCoursesComponent } from './update-courses/update-courses.component';
//User
import { SignupComponent } from './User/Front_end/signup/signup.component';
import { ForgetpasswordComponent } from './User/Front_end/forgotpassword/forgetpassword.component';
import { LoginComponent } from './User/Front_end/login/login.component';
import { ListUsersComponent } from './User/Back_end/list-users/list-users.component';
import { AddUserComponent } from './User/Back_end/add-user/add-user.component';
import { EditprofileComponent } from './User/Front_end/editprofile/editprofile.component';
import { ResetPasswordComponent } from './User/Front_end/reset-password/reset-password.component';
import { CodeActivationComponent } from './User/Front_end/code-activation/code-activation.component';
import { CoursesBackComponent } from './courses-back/courses-back.component';
import { CoursesDetailComponent } from './courses-detail/courses-detail.component';
import { DocumentComponent } from './document/document.component';
import { ListOffershistoryComponent } from './Offers/list-offershistory/list-offershistory.component';
import { CalendarComponent } from './calendar/calendar.component';
import { FeedsComponent } from './feeds/feeds.component';
import { ResponseComponent } from './quizz/response/response.component';
//Accomodation
//Accomodation
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
import { FrontHouseDetailsComponent } from './accomodation/components/front-house-details/front-house-details.component';

import { MapComponent } from './accomodation/components/map/map.component';
import { CandidacyFrontComponent } from './candidacy-front/candidacy-front.component';




const routes: Routes = [
  { path: 'weather', component: WeatherComponent },



  {
    path: 'front', component: MenuFrontComponent, children: [
      { path: 'addComplaints', component: AddComplaintsComponent },
      { path: 'editComplaints/:id', component: UpdateComplaintsComponent },
      { path: 'listEvent', component: ListEventsFrontComponent },
      { path: 'listComplaints', component: ListUserComplaintsComponent },
      { path: 'detailevent/:id', component: DetailEventComponent },
      { path: 'userQuiz', component: QuizComponent },
      { path: 'userQuestion/:id', component: QuestionUComponent },
      { path: 'offer', component: OfferFrontComponent },
      { path :'feeds',component: FeedsComponent} ,
      {
        path : "courses",component:CoursesComponent
      },
      {
        path : "candidacy",component:CandidacyFrontComponent
      },
      //user-front


      //accomodation
      { path :'Houses',component: FrontHousesListComponent},
    { path :'HouseDetails/:id',component: FrontHouseDetailsComponent},






    ]

  },
//User-dashboard
{ path :'calendar',component: CalendarComponent} ,


{ path: 'login', component: LoginComponent },
{ path: 'editprofile', component: EditprofileComponent },
{ path: 'signup', component: SignupComponent },
{ path: 'forgotpassword', component: ForgetpasswordComponent },
{ path: 'reset', component: ResetPasswordComponent },
{ path: 'active', component: CodeActivationComponent }, 
  {
    path: '', component: MenuComponent, children: [

      //Accomodation
//Agency
{ path :'listAgencies',component: AgenciesListComponent} , 
{ path: 'agencies/:id', component: AgencyDetailsComponent },
{ path: 'addAgency', component: AddAgencyComponent },
//Agent
{ path :'listAgents',component: AgentsListComponent} , 
{ path: 'agents/:id', component: AgentDetailsComponent },
{ path: 'addAgent', component: AddAgentComponent },
//Houses
{ path :'listHouses',component: HousesListComponent} , 
{ path: 'houses/:id', component: HouseDetailsComponent },
{ path: 'addHouse', component: AddHousesComponent },
{ path: 'list_users', component: ListUsersComponent },
{ path: 'add_user_back', component: AddUserComponent },
      { path :'listOffershistory',component: ListOffershistoryComponent} ,

      //Lina
      { path: 'listEvents', component: ListEventsComponent },
      { path: 'listComplaints', component: ListComplaintsComponent },
      { path: 'addEvent', component: AddEventsComponent },
      { path: 'editEvent/:id', component: UpdateEventComponent },
      {
        path : "candidacy",component:CandidacyComponent
      },
      {
        path : "candidacy/detail/:id",component:CandidacyDetailComponent
      },
      {
        path : "candidacy/add",component:CandidacyAddComponent
        
      },
      {
        path : "courses/add",component:CoursesAddComponent
      },
      {
        path : "courses/update/:id",component:UpdateCoursesComponent
      },
      { path :'coursesback',component: CoursesBackComponent} ,
      { path: 'qrcode', component: QrcodeComponent },
      { path: 'video', component: VideochatComponent },
      //Achraf
      { path: 'listQuestion', component: QuestionComponent },
    
      { path: 'listQuiz', component: ListQuizComponent },
      { path :'listReponse', component: ResponseComponent},
      //Koch
      { path: 'addOffer', component: AddOffersComponent },
      { path: 'listOffer', component: ListOffersComponent },
      { path: 'updateOffer', component: UpdateOffersComponent },
    
      { path: 'listOffers', component: ListOffersComponent },
      { path: 'listOffersinteress', component: ListOffersinteressComponent },
    
    
      { path: 'listTags', component: ListTagsComponent },
      { path: 'addTags', component: AddTagsComponent },
      { path: 'updateTags/:id', component: UpdateTagsComponent },
    
    
      { path: 'addOffers', component: AddOffersComponent },
      { path: 'addTags', component: AddTagsComponent },
    
      { path: 'editOffer/:id', component: UpdateOffersComponent },
      { path: 'editTag/:id', component: UpdateTagsComponent },
    
      { path: 'editEvent/:id', component: UpdateEventComponent },
    
      { path: 'listTags', component: ListTagsComponent }
    
    
      ,
      {
        path : "courses/detail/:id",component:CoursesDetailComponent
      },
      
      { path :'listDocument',component: DocumentComponent} ,]
  },
 

  //accomodation
  
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
