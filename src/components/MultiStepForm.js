import React, { useState, useMemo } from 'react';
import { useForm, FormProvider, useFormContext } from 'react-hook-form';
import {datamodel} from "./configHelper";
import {Step} from "./Step";

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
            <form onSubmit={e => e.preventDefault()}>
                <Step step={currentStep} />
                <button type="button" onClick={validateStep}>
                    {stepIndex < formDataModel.steps.length - 1 ? 'Next' : 'Submit'}
                </button>
            </form>

            {submittedData && (
                <pre>
                    {JSON.stringify(submittedData, null, 2)}
                </pre>
            )}
        </FormProvider>
    );
};

export default MultiStepForm;
