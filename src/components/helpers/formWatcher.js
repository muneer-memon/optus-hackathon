import {useEffect, useState} from "react";

export const useWindowVariable = (name, initialValue) => {
    const [value, setValue] = useState(initialValue);

    useEffect(() => {
        const interval = setInterval(() => {
            if (window[name] !== value) {
                setValue(window[name]);
            }
        }, 100);

        return () => clearInterval(interval);
    }, [name, value]);

    return value;
}