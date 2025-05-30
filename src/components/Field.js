import {useFormContext} from "react-hook-form";
import React, {useMemo} from "react";

export const Field = ({ field }) => {
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