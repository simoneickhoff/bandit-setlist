import { FC, InputHTMLAttributes } from 'react';
import './style.css';

const TextInput: FC<InputHTMLAttributes<HTMLInputElement>> = (props) => {
    return <input {...props} className={`text-input ${props.className}`} type={'text'} />;
};

export default TextInput;
