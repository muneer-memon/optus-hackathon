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

    const {
        type,
        label,
        required,
        name,
    } = field;

    const labelText = `${label} ${required ? '*' : ''}`.trim();

    const isToggleType = type === 'radio' || type === 'checkbox';

    return (
        <div className="pure-control-group">
            <label>
                {!isToggleType && (
                    <>
                        {labelText}
                        {type === 'select' ? (
                            <select {...register(name, { required })}>
                                <option value="">Select...</option>
                                {field?.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                            </select>
                        ) : (
                            <input type={type} {...register(name, { required })} />
                        )}
                    </>
                )}

                {isToggleType && (
                    <>
                        <input type={type} {...register(name, { required })} />
                        {labelText}
                    </>
                )}
            </label>
            {errors[name] && <p style={{ color: 'red' }}>{label} is required</p>}
        </div>
    );
};