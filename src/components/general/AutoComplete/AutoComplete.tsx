import { FC, FormEvent, InputHTMLAttributes, useEffect, useState } from 'react';
import TextInput from '../TextInput/TextInput';
import './style.css';

interface AutoCompleteOption {
    key: number;
    title: string;
}

interface IAutoCompleteProps {
    onChange: (value: string) => void;
    options: AutoCompleteOption[];
    onSelectItem: (key: number) => void;
}

const AutoComplete: FC<IAutoCompleteProps> = ({ onChange, onSelectItem, options }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeOptionKey, setActiveOptionKey] = useState<number>();

    useEffect(() => {
        setActiveOptionKey(options[0]?.key);
    }, [options]);

    useEffect(() => {
        onChange(searchTerm);
    }, [searchTerm]);

    const onSubmit = (event: FormEvent) => {
        event.preventDefault();
        const option = options.find((opt) => opt.key === activeOptionKey);

        if (option) {
            onSelectItem(option.key);
        }

        setSearchTerm('');
    };

    return (
        <form onSubmit={onSubmit}>
            <TextInput
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.currentTarget.value)}
                placeholder='Song hinzufügen'
            />

            {/* options for the autocomplete */}
            {options.length > 0 && searchTerm !== '' && (
                <ul className='autocomplete-options shadow'>
                    {options.map((option) => (
                        <li
                            className={activeOptionKey === option.key ? 'active' : ''}
                            key={option.key}
                            onClick={() => onSelectItem(option.key)}
                            onMouseEnter={() => setActiveOptionKey(option.key)}
                        >
                            {option.title}
                        </li>
                    ))}
                </ul>
            )}
        </form>
    );
};

export default AutoComplete;
