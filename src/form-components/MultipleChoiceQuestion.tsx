import React, { useState } from "react";
import { Form } from "react-bootstrap";

export function MultipleChoiceQuestion({
    options,
    expectedAnswer
}: {
    options: string[];
    expectedAnswer: string;
}): JSX.Element {
    //State
    const [curChoice, setCurChoice] = useState<string>(options[0]);

    //Control
    function updateChoice(event: React.ChangeEvent<HTMLSelectElement>) {
        setCurChoice(event.target.value);
    }

    //View
    return (
        <div>
            <div>
                <h3>Multiple Choice Question</h3>
            </div>

            <div>
                <Form.Group controlId="chooseOptions">
                    <Form.Label>What is your favorite color?</Form.Label>
                    <Form.Select value={curChoice} onChange={updateChoice}>
                        {options.map((option: string) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>
                {curChoice === expectedAnswer ? <div>✔️</div> : <div>❌</div>}
            </div>
        </div>
    );
}
