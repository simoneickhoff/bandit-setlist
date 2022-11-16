import { FC, PropsWithChildren } from 'react';
import './style.css';

interface CardProps {
    onClick?: () => void;
    className?: string;
    active?: boolean;
}

const Card: FC<CardProps & PropsWithChildren> = ({
    onClick,
    className,
    active = false,
    children,
}) => {
    return (
        <div
            className={`card ${active && 'active'} ${className}`}
            onClick={onClick}
        >
            {children}
        </div>
    );
};

export default Card;
