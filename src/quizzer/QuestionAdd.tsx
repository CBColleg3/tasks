import React from "react";
import { Question } from "../interfaces/question";
//import { Answer } from "../interfaces/answer";
import { Button } from "react-bootstrap";

interface QuestionInterface {
    // The type is "a function that consumes a boolean and returns nothing"
    setQuestions: (newQuestion: Question[]) => void;
    questions: Question[];
}

export function QuestionAdd({
    setQuestions,
    questions
}: QuestionInterface): JSX.Element {
    //Control
    function appendQuestion() {
        // Making a new array of quizzes, with an additional extra one
        const modifiedQuestions: Question[] = [
            ...questions,
            {
                id: Date.now(),
                name: "New Question",
                body: "What should I add to this Question?",
                type: "short_answer_question",
                options: [],
                expected: "20",
                points: 50,
                published: false
            }
        ];
        //console.log("Date: ", Date.now());
        // Update the question array to be the new version
        setQuestions(modifiedQuestions);
    }

    //View
    return (
        <div>
            <Button
                data-testid="add-question-button"
                onClick={() => appendQuestion()}
            >
                Add Question
            </Button>
        </div>
    );
}
