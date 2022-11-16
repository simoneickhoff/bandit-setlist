import { useLiveQuery } from 'dexie-react-hooks';
import { FC, useEffect, useState } from 'react';
import { db } from '../../db/db';
import { Setlist } from '../../model/interfaces/Setlist';
import Button from '../general/Button/Button';
import Card from '../general/Card/Card';
import TextInput from '../general/TextInput/TextInput';
import SetForm from '../SetForm/SetForm';
import './style.css';

interface ISetlistFormProps {
    setlist: Setlist;
}

const SetlistForm: FC<ISetlistFormProps> = ({ setlist }) => {
    const sets = useLiveQuery(() => {
        return db.set.where({ id_setlist: setlist.id }).toArray();
    }, [setlist.id]);
    const autoCompleteSongs = useLiveQuery(() => {
        return db.song.toArray();
    });

    useEffect(() => {
        if (sets && sets.length < 1) {
            createSet();
        }
    }, [sets]);

    const createSet = () => {
        const setNumber = sets?.length ?? 0;
        db.set.add({
            title: 'Set ' + (setNumber + 1),
            sort: setNumber,
            notes: '',
            content: [],
            id_setlist: setlist.id!,
        });
    };

    return (
        <div className='setlist-form-container'>
            <Button onClick={createSet}>Neues Set hinzufügen</Button>
            {/* options for the autocomplete */}
            <datalist id={`songs`}>
                {autoCompleteSongs?.map((songOption) => (
                    <option key={songOption.id} value={songOption.id}>
                        {songOption.title}
                    </option>
                ))}
            </datalist>
            {sets?.map((set) => (
                <SetForm
                    key={set.id}
                    set={set}
                    idProject={setlist.id_project}
                />
            ))}
        </div>
    );
};

export default SetlistForm;
