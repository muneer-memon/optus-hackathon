import React, { useState, useMemo } from 'react';
import { useForm, FormProvider, useFormContext } from 'react-hook-form';
import {datamodel} from "./configHelper";
import {Step} from "./Step";
import Code from '../components/Code';

const MultiStepForm = () => {
    const formDataModel = datamodel.multiStepForm;
    const methods = useForm({ mode: 'onBlur' });
    const [stepIndex, setStepIndex] = useState(0);
    const [submittedData, setSubmittedData] = useState(null);
    const currentStep = formDataModel.steps[stepIndex];

    const onSubmit = data => {
        if (stepIndex < formDataModel.steps.length - 1) {
            setStepIndex(stepIndex + 1);
        } else {
            setSubmittedData(data);
        }
    };

    const validateStep = async () => {
        const stepFields = currentStep.fields.map(f => f.name);
        const result = await methods.trigger(stepFields);
        if (result) onSubmit(methods.getValues());
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={e => e.preventDefault()} className='pure-form pure-form-stacked'>
                <Step step={currentStep} />
                <button type="button" onClick={validateStep} className='pure-button pure-button-primary'>
                    {stepIndex < formDataModel.steps.length - 1 ? 'Next' : 'Submit'}
                </button>
            </form>
            <Code submittedData={submittedData} />
        </FormProvider>
    );
};

export default MultiStepForm;
