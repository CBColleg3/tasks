import React, { useState } from "react";
import { Button } from "react-bootstrap";

export type HolidayType =
    | "Christmas"
    | "Thanksgiving"
    | "Groundhog Day"
    | "MLK Day"
    | "Veteran's Day";

//maps old state to new state
const Next_Holiday_DATE: Record<HolidayType, HolidayType> = {
    "MLK Day": "Groundhog Day",
    "Groundhog Day": "Veteran's Day",
    "Veteran's Day": "Thanksgiving",
    Thanksgiving: "Christmas",
    Christmas: "MLK Day"
};

const Next_Holiday_ALPHA: Record<HolidayType, HolidayType> = {
    Christmas: "Groundhog Day",
    "Groundhog Day": "MLK Day",
    "MLK Day": "Thanksgiving",
    Thanksgiving: "Veteran's Day",
    "Veteran's Day": "Christmas"
};

export function CycleHoliday(): JSX.Element {
    const [holiday, setHoliday] = useState<HolidayType>("Christmas");

    function changeHolidayAlpha(): void {
        const newHoliday = Next_Holiday_ALPHA[holiday];
        setHoliday(newHoliday);
    }

    function changeHolidayDate(): void {
        const newHoliday = Next_Holiday_DATE[holiday];
        setHoliday(newHoliday);
    }

    function setHolidayEmoji(holidayType: HolidayType): string {
        let emojiString = "";
        switch (holidayType) {
            case "Christmas": {
                emojiString = "🎅";
                break;
            }

            case "Thanksgiving": {
                emojiString = "🦃";
                break;
            }

            case "MLK Day": {
                emojiString = "🤚🏿";
                break;
            }

            case "Groundhog Day": {
                emojiString = "🐗";
                break;
            }

            case "Veteran's Day": {
                emojiString = "🪖";
                break;
            }
        }
        return emojiString;
    }

    return (
        <div>
            <div>
                <span> Holiday: {setHolidayEmoji(holiday)} </span>
            </div>
            <Button onClick={() => changeHolidayAlpha()}>
                <div>Advance by Alphabet</div>
            </Button>
            <Button onClick={() => changeHolidayDate()}>Advance by Year</Button>
        </div>
    );
}
