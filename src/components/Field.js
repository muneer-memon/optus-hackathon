import { useFormContext } from "react-hook-form";
import React, { useMemo } from "react";

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
                        {field.options.map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                        ))}
                    </select>
                ) : field.type === 'checkbox' ? (
                    <input type="checkbox" {...register(field.name)} />
                ) : field.type === 'image' ? (
                    <div style={{ marginTop: '0.5rem' }}>
                        <input
                            type="hidden"
                            value={field.src}
                            {...register(field.name)}
                        />
                        <img
                            src={field.src || 'https://via.placeholder.com/200'}
                            onError={(e) => e.currentTarget.src = 'https://via.placeholder.com/200'}
                            alt={field.label}
                            width="200"
                            height="200"
                            style={{ display: 'block', borderRadius: '8px' }}
                        />
                    </div>
                ) : (
                    <input type={field.type} {...register(field.name, { required: field.required })} />
                )}
            </label>
            {errors[field.name] && (
                <p style={{ color: 'red' }}>{field.label} is required</p>
            )}
        </div>
    );
};
