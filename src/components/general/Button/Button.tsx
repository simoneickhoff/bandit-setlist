import { ButtonHTMLAttributes, FC, HTMLProps } from 'react';
import './style.css';

const Button: FC<ButtonHTMLAttributes<HTMLButtonElement>> = (props) => {
    return (
        <button className='button' {...props}>
            {props.children}
        </button>
    );
};

export default Button;
