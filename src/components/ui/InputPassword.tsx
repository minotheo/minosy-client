import React from 'react';

import {
    PasswordInput
} from '@mantine/core';

interface IInputPassword {
    label: string;
    value: string;
    placeholder: string;
    onChange: any;
}

const InputPassword = ({label, value, placeholder, onChange}: IInputPassword) => {
    return (
        <PasswordInput
            value={value}
            label={label}
            placeholder={placeholder}
            onChange={(e) => onChange(e.currentTarget.value)}
        />
    );
};

export default InputPassword;