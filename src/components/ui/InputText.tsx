import React from 'react';

import { TextInput } from "@mantine/core";

interface IInputText {
    type: string;
    label: string;
    value: string;
    placeholder: string;

    onChange: any;
}

const InputText = ({type, label, value, placeholder, onChange}: IInputText) => {
    return (
        <TextInput
            value={value}
            type={type}
            label={label}
            placeholder={placeholder}
            onChange={(e) => onChange(e.currentTarget.value)}
        />
    );
};

export default InputText;