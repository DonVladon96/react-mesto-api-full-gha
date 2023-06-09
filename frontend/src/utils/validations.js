import { useState } from 'react';

function useFormValidation() {
    const [values, setValues] = useState({})
    const [errors, setErrors] = useState({});

    function onChange(evt) {
        const value = evt.target.value;
        const name = evt.target.name;
        const error = evt.target.validationMessage;

        setValues((values) => ({ ...values, [name]: value}));
        setErrors((errors) => ({ ...errors, [name]: error}));
    }

    function restartForm(values = {}, errors = {}) {
        setValues(values);
        setErrors(errors);
    }
    return { values, errors, onChange, restartForm }
}

export default useFormValidation;