import {Field} from "./Field";
import React from "react";

export const Step = ({ step }) => {
    return (
        <fieldset>
            {step.fields.map((field) => {
                return <Field key={field.name} field={field} />;
            })}
        </fieldset>
    );
};