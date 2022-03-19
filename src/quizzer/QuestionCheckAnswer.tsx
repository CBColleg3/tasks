import React, { useState } from "react";
import { Question, QuestionType } from "../interfaces/question";
//import { Answer } from "../interfaces/answer";
import { Button } from "react-bootstrap";

// Simplify type definition of the Change Event
interface QuestionInterface {
    // The type is "a function that consumes a boolean and returns nothing"
    setQuestions: (newQuestion: Question[]) => void;
    setTotalPoints: (newPoints: number) => void;
    questions: Question[];
    index: number;
    input: string[];
    curChoice: string[];
    totalPoints: number;
}

export function QuestionCheckAnswer({
    questions,
    index,
    input,
    curChoice,
    setTotalPoints,
    totalPoints
}: QuestionInterface): JSX.Element {
    //State
    const [correctAnswer, setCorrectAnswer] = useState<boolean>(false);

    //Control
    function CheckAnswer(questionType: QuestionType) {
        if (questionType === "short_answer_question") {
            if (input[index] === questions[index].expected) {
                setCorrectAnswer(true);
                setTotalPoints(questions[index].points + totalPoints);
            } else {
                setCorrectAnswer(false);
            }
        } else {
            if (curChoice[index] === questions[index].expected) {
                setCorrectAnswer(true);
                setTotalPoints(questions[index].points + totalPoints);
            } else {
                setCorrectAnswer(false);
            }
        }
    }

    //View
    return (
        <div data-testid="check-answer-button">
            <Button onClick={() => CheckAnswer(questions[index].type)}>
                Check Answer
            </Button>
            {correctAnswer ? <div>✔️</div> : <div>❌</div>}
        </div>
    );
}
