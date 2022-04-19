export class Concept{
    id?: number;
    concept?:string;
}
export class Question{
    id?:number;
    question:string;
    code:string;
    description:string;
    schema: string;
    evaluation_concept:number;
}
export class QuestionUpdate{
    id?:number;
    question:string;
    code:string;
    description:string;
    schema: string;
}
export class administrator{
    phone:string;
    country:string;
    city:string;

}
export class User{
    id?:number;
    first_name:string;
    last_name:string;
    administrator:administrator;
}
export class ChangePasswordForm{
    password:string;
    password2:string;
    old_password:administrator;
}
export class LearningObjects{
    id?:number;
    general_title?:string;
    // learning_object?:LearningObjectDetail;
}
export class LearningObjectDetail{
}