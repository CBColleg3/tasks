import { Question } from "./question";

export interface Quiz {
    id: number;
    questions: Question[];
    title: string;
    description: string;
    //totalQuestions: number;
}
