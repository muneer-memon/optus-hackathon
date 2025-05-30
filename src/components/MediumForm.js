import {FormProvider, useForm} from "react-hook-form";
import React, {useState} from "react";
import {datamodel} from "./configHelper";
import {Field} from "./Field";
import Code from '../components/Code';

export const MediumForm = () => {
    const methods = useForm();
    const [submitted, setSubmitted] = useState(null);
    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(setSubmitted)} className='pure-form pure-form-stacked'>
                {datamodel.mediumForm.fields.map(field => <Field key={field.name} field={field} />)}
                <button type="submit" className='pure-button pure-button-primary'>Submit</button>
            </form>
            <Code submittedData={submitted} />
        </FormProvider>
    );
};