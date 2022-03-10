import React, { useState } from "react";

export function EditMode(): JSX.Element {
    const [name, setName] = useState<string>("Your Name");
    const [isStudent, setIsStudent] = useState<boolean>(true);
    const [editMode, setEditMode] = useState<boolean>(false);

    return (
        <div>
            <h3>Edit Mode</h3>
        </div>
    );
}
