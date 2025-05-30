import {Field} from "./Field";
import React from "react";

export const Step = ({ step }) => {
    return (
        <div>
            {step.fields.map((field) => {
                return <Field key={field.name} field={field} />;
            })}
        </div>
    );
};