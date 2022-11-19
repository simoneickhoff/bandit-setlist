import { useLiveQuery } from 'dexie-react-hooks';
import { FC, InputHTMLAttributes, useEffect, useState } from 'react';
import { db } from '../../db/db';
import { Set } from '../../model/interfaces/Set';
import { Song } from '../../model/interfaces/Song';
import AutoComplete from '../general/AutoComplete/AutoComplete';
import Card from '../general/Card/Card';
import TextInput from '../general/TextInput/TextInput';
import SongListItem from '../SongListItem/SongListItem';
import './style.css';

interface ISetFormProps {
    set: Set;
    idProject: number;
}

const SetForm: FC<ISetFormProps> = ({ set, idProject }) => {
    const [songSearch, setSongSearch] = useState('');
    const [isActive, setIsActive] = useState(false);

    const songsInSetlist = useLiveQuery(() => {
        return db.song
            .where({ id_project: idProject })
            .filter((song) => set.content.includes(song.id!))
            .toArray();
    }, [set.content]);

    const autoCompleteSongs = useLiveQuery(() => {
        if (songSearch === '') {
            return [];
        }

        return db.song
            .where({ id_project: idProject })
            .filter((song) => song.title.toLowerCase().includes(songSearch.toLowerCase()))
            .limit(10)
            .toArray();
    }, [songSearch]);

    const addSongToSet = (id: number) => {
        db.set.update(set, { content: [...set.content, id] });
        setSongSearch('');
    };

    return (
        <div className='set-form-container'>
            <>
                <h4>{set.title}</h4>
                {set.content?.map((element, index) => {
                    if (Number.isInteger(element)) {
                        const songInSetlist = songsInSetlist?.find((song) => song.id === element);

                        if (songInSetlist) {
                            return (
                                <div key={index} className='set-song-item'>
                                    {songInSetlist.number && songInSetlist.number + ' - '}
                                    {songInSetlist.title}
                                </div>
                            );
                        }
                    }
                })}

                <AutoComplete
                    options={
                        autoCompleteSongs?.map((song) => {
                            return { key: song.id!, title: song.title };
                        }) ?? []
                    }
                    onSelectItem={(key: number) => addSongToSet(key)}
                    onChange={(value: string) => setSongSearch(value)}
                />
            </>
        </div>
    );
};

export default SetForm;
