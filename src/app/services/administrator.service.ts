import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ChangePasswordForm, Concept, Question, QuestionUpdate, User } from '../admin/models/evaluation.models';
import { RegisterForm } from '../core/interfaces/user-register.interface';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class AdministratorService {

  constructor(private http: HttpClient) { }
  
  getTotalLearningObjectApprovedAndDisapproved(){
    return this.http.get(`${ baseUrl }/total-oa-approved-and-disapproved/`).pipe(map((data: any) => data));
  }
  getTotalTeacherAndExpert(){
    return this.http.get(`${ baseUrl }/total-expert-teacher-approved-and-disapproved/`).pipe(map((data: any) => data));
  }
  // Evaluation Concept
  postEvaluationExpert(concept: Concept){
    return this.http.post<Concept>(`${ baseUrl }/object-learning-concept-evaluation/`, concept)
  }
  putEvaluationExpert(concept: Concept){
    return this.http.put<Concept>(`${ baseUrl }/object-learning-concept-evaluation/${concept.id}/`, concept)
  }
  getEvaluationExpert(){
    return this.http.get<Concept[]>(`${ baseUrl }/object-learning-concept-evaluation/`).pipe(map((data: any) => data));
  }
  retrieveEvaluationExpert(id: number){
    return this.http.get<Concept>(`${ baseUrl }/object-learning-concept-evaluation/${id}/`).pipe(map((data: any) => data));
  }
  deleteEvaluationExpert(id: number){
    return this.http.delete(`${ baseUrl }/object-learning-concept-evaluation/${id}/`).pipe(map((data: any) => data));
  }

  // Evaluation Questions
  postQuestionExpert(question: Question){
    return this.http.post<Question>(`${ baseUrl }/learning-objective-assessment-questions/`, question);
  }
  getQuestionExpert(conceptId: number){
    return this.http.get<Question>(`${ baseUrl }/learning-objective-assessment-questions/${conceptId}/`).pipe(map((data: any) => data));
  }
  deleteQuestionExpert(conceptId: number){
    return this.http.delete(`${ baseUrl }/learning-objective-assessment-questions/${conceptId}/`).pipe(map((data: any) => data));
  }
  updateQuestionExpert(question: QuestionUpdate){
    return this.http.put<QuestionUpdate>(`${ baseUrl }/learning-objective-assessment-questions/${question.id}/`,question);
  }
  // Teacher upload
  listLearningObjectUploadByTeacher(teacherId: number){
    return this.http.get(`${ baseUrl }/learning-objects/upload-teacher/${teacherId}/`).pipe(map((data: any) => data));
  }

  // Administrator
  registerAdministratorUser(formData: RegisterForm,){
    return this.http.post(`${ baseUrl }/management-administrator/`, formData)
  }
  updateAdministratorDataUser(user: User){
    let data = {
      'first_name':user.first_name,
      'last_name':user.last_name,
      'country':user.administrator.country,
      'city':user.administrator.city,
      'phone':user.administrator.phone
    }
    return this.http.put(`${ baseUrl }/management-administrator/${user.id}/`,data);
  }
  getAdministratorUser(userId: number){
    return this.http.get(`${ baseUrl }/management-administrator/${userId}/`).pipe(map((data: any) => data))
  }
  changePassword(id:number,data: ChangePasswordForm){
    return this.http.put(`${ baseUrl }/user/change_password/${id}/`,data);
  }
  // Superuser
  listAdministratorUser(){
    return this.http.get(`${ baseUrl }/management-superuser/`).pipe(map((data: any) => data));
  }
  updateAdministratorUser(id: number, status: number){
    let data = {
      'administrator_is_active':status
    }
    return this.http.put(`${ baseUrl }/management-superuser/${id}/`,data);
  }
  // Objetos de Aprendizaje
  listLearningObject(status: number){
    return this.http.get(`${ baseUrl }/learning-objects-approved-and-disapproved/${status}/`).pipe(map((data: any) => data));
  }
  updatePublicandPrivateLearningObject(id: number, status: number){
   let data = {
      'public':status
    }
    return this.http.patch(`${ baseUrl }/learning-objects-update-public/${id}/`,data);
  }
  getLearningObject(slug: string){
    return this.http.get(`${ baseUrl }/learning-object/${slug}/`).pipe(map((data: any) => data));
  }
  getTeacherAndExpertToAprove(){
    return this.http.get(`${ baseUrl }/teacher-expert-to-approve/`).pipe(map((data: any) => data));
  }
  getTeacherAndExpertToAproveProfile(id: number){
    return this.http.get(`${ baseUrl }/teacher-expert-to-approve/${id}`).pipe(map((data: any) => data));
  }
  getTeacherAndExpertAproved(){
    return this.http.get(`${ baseUrl }/teacher-expert-approved/`).pipe(map((data: any) => data));
  }
  getTeacherAndExpertprovedProfile(id: number){
    return this.http.get(`${ baseUrl }/teacher-expert-approved/${id}`).pipe(map((data: any) => data));
  }
  updateTeacherAndExpertToAprove(id:number,teacher_status:number,expert_status: number){
    let data = {
      'teacher_is_active':teacher_status,
      'expert_is_active':expert_status
    }
    return this.http.put(`${ baseUrl }/teacher-expert-to-approve/${id}/`,data);
  }
  updateTeacherAndExpertAproved(id:number,teacher_status:number,expert_status: number){
    let data = {
      'teacher_is_active':teacher_status,
      'expert_is_active':expert_status
    }
    return this.http.put(`${ baseUrl }/teacher-expert-approved/${id}/`,data);
  }
  getLearningObjectEvaluatedByExpert(id:number){
    return this.http.get(`${ baseUrl }/learning-objects/evaluated-expert/${id}/`).pipe(map((data: any) => data));
  }
  getStudentList(){
    return this.http.get(`${ baseUrl }/student-list/by-admin`).pipe(map((data: any) => data));
  }
}
