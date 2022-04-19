import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AccessdeniedComponent } from '../shared/accessdenied/accessdenied.component';
import { NotfoundComponent } from '../shared/notfound/notfound.component';
import { ErrorComponent } from '../shared/error/error.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NoimagePipe } from '../pipes/noimage.pipe';
import { AdminRoutingModule } from './admin.routing';
import { AdministratorUserListComponent } from './components/administrator-user-list/administrator-user-list.component';
import { AdministratorUserRegisterComponent } from './components/administrator-user-register/administrator-user-register.component';
import { ExpertQuestionCreateListComponent } from './components/expert-question-create-list/expert-question-create-list.component';
import { LearningObjectApprovedListComponent } from './components/learning-object-approved-list/learning-object-approved-list.component';
import { LearningObjectEvaluatedDetailComponent } from './components/learning-object-evaluated-detail/learning-object-evaluated-detail.component';
import { LearningObjectPendingListComponent } from './components/learning-object-pending-list/learning-object-pending-list.component';
import { TeacherExpertApprovedComponent } from './components/teacher-expert-approved/teacher-expert-approved.component';
import { TeacherExpertPendingComponent } from './components/teacher-expert-pending/teacher-expert-pending.component';
import { TeacherExpertProfileComponent } from './components/teacher-expert-profile/teacher-expert-profile.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LearningObjectDetailComponent } from './components/learning-object-detail/learning-object-detail.component';
import { AdminProfileComponent } from './components/admin-profile/admin-profile.component';
import { UpperCapilPipeComponent } from './pipes/upper.capilal.pipe';
import { LearningObjectUploadListComponent } from './components/learning-object-upload-list/learning-object-upload-list.component';
import { LearningObjectEvaluatedListComponent } from './components/learning-object-evaluated-list/learning-object-evaluated-list.component';
import { LoadingComponent } from './components/loading/loading.component';
import { StudentComponent } from './components/student/student.component';
import { UrlSanitizerPipe } from './pipes/url.sanitizer.pipe';



@NgModule({
  declarations: [
    AdminComponent, 
    AccessdeniedComponent, 
    NotfoundComponent, 
    ErrorComponent, 
    NoimagePipe, 
    DashboardComponent, 
    AdministratorUserListComponent,
    AdministratorUserRegisterComponent, 
    ExpertQuestionCreateListComponent, 
    LearningObjectApprovedListComponent, 
    LearningObjectEvaluatedDetailComponent, 
    LearningObjectPendingListComponent, 
    TeacherExpertApprovedComponent, 
    TeacherExpertPendingComponent, 
    TeacherExpertProfileComponent, 
    LearningObjectDetailComponent, 
    AdminProfileComponent,
    UpperCapilPipeComponent,
    LearningObjectUploadListComponent,
    LearningObjectEvaluatedListComponent,
    LoadingComponent,
    StudentComponent,
    UrlSanitizerPipe
  ],
  exports: [
    AdminComponent, 
    AccessdeniedComponent, 
    NotfoundComponent, 
    ErrorComponent, 
    NoimagePipe, 
    DashboardComponent, 
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
