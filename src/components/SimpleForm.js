import {FormProvider, useForm} from "react-hook-form";
import React, {useState} from "react";
import {datamodel} from "./configHelper";
import {Field} from "./Field";

export const SimpleForm = () => {
    const methods = useForm();
    const [submitted, setSubmitted] = useState(null);
    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(setSubmitted)}>
                {datamodel.simpleForm.fields.map(field => <Field key={field.name} field={field} />)}
                <button type="submit">Submit</button>
            </form>
            {submitted && <pre>{JSON.stringify(submitted, null, 2)}</pre>}
        </FormProvider>
    );
};