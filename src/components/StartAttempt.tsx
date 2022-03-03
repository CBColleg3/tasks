import React, { useState } from "react";
import { Button } from "react-bootstrap";

export function StartAttempt(): JSX.Element {
    const [attempts, setAttempts] = useState<number>(3);
    const [progress, setProgress] = useState<boolean>(true);

    function doTheQuiz(): void {
        //If its short answer, then make it multiple choice and vice versa
        setAttempts(attempts - 1);
        setProgress(!progress);
    }

    return (
        <div>
            <div>Attempts: {attempts} </div>
            <span>
                <Button
                    onClick={() => doTheQuiz()}
                    disabled={!progress || attempts <= 0}
                >
                    Start Quiz
                </Button>
            </span>
            <div>
                <span>
                    <Button
                        onClick={() => setAttempts(attempts + 1)}
                        disabled={!progress}
                    >
                        Mulligan
                    </Button>
                </span>
            </div>
            <span>
                <span>
                    <Button
                        onClick={() => setProgress(!progress)}
                        disabled={progress}
                    >
                        Stop Quiz
                    </Button>
                </span>
            </span>

            <div></div>
        </div>
    );
}
