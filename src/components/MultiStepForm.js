import React, { useState, useMemo } from 'react';
import { useForm, FormProvider, useFormContext } from 'react-hook-form';

const datamodel = {
    steps: [
        {
            id: 'step1',
            fields: [
                { name: 'firstname', label: 'First Name', type: 'text', required: true },
                { name: 'lastname', label: 'Last Name', type: 'text', required: true }
            ]
        },
        {
            id: 'step2',
            fields: [
                { name: 'address', label: 'Address', type: 'text', required: true },
                { name: 'phone', label: 'Phone', type: 'text', required: true }
            ]
        },
        {
            id: 'step3',
            fields: [
                { name: 'accountno', label: 'Account Number', type: 'text', required: true },
                { name: 'account_type', label: 'Account Type', type: 'text', required: true },
                {
                    name: 'owner_of_account',
                    label: 'Are you the owner of the account?',
                    type: 'select',
                    options: ['yes', 'no'],
                    required: true
                },
                {
                    name: 'complaint',
                    label: 'Complaint',
                    type: 'text',
                    required: true,
                    visibleIf: { owner_of_account: 'yes' }
                },
                {
                    name: 'documentation',
                    label: 'Documentation',
                    type: 'text',
                    required: true,
                    visibleIf: { owner_of_account: 'no' }
                }
            ]
        }
    ]
};

const Field = ({ field }: any) => {
    const { register, watch, formState: { errors } } = useFormContext();
    const isVisible = useMemo(() => {
        if (!field.visibleIf) return true;
        const [dep, val] = Object.entries(field.visibleIf)[0];
        return watch(dep) === val;
    }, [watch(field.visibleIf ? Object.keys(field.visibleIf)[0] : '')]);

    if (!isVisible) return null;

    return (
        <div style={{ marginBottom: '1rem' }}>
            <label>
                {field.label}
                {field.required && ' *'}
                {field.type === 'select' ? (
                    <select {...register(field.name, { required: field.required })}>
                        <option value="">Select...</option>
                        {field.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                ) : (
                    <input type={field.type} {...register(field.name, { required: field.required })} />
                )}
            </label>
            {errors[field.name] && <p style={{ color: 'red' }}>{field.label} is required</p>}
        </div>
    );
};
const Step = ({ step }) => {
    return (
        <div>
            {step.fields.map((field) => {
                return <Field key={field.name} field={field} />;
            })}
        </div>
    );
};

const MultiStepForm = () => {
    const methods = useForm({ mode: 'onBlur' });
    const [stepIndex, setStepIndex] = useState(0);
    const [submittedData, setSubmittedData] = useState(null);
    const currentStep = datamodel.steps[stepIndex];

    const onSubmit = data => {
        if (stepIndex < datamodel.steps.length - 1) {
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
        <FormProvider {...methods} children={
            <form onSubmit={e => e.preventDefault()}>
                <Step step={currentStep} />
                <button type="button" onClick={validateStep}>
                    {stepIndex < datamodel.steps.length - 1 ? 'Next' : 'Submit'}
                </button>
            </form>
        } />
    );
};

export default MultiStepForm;
