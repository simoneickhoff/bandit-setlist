import { FC, FormEvent, useState } from 'react';
import { db } from '../../db/db';
import { Project } from '../../model/interfaces/Project';
import { Song } from '../../model/interfaces/Song';
import Button from '../general/Button/Button';
import TextInput from '../general/TextInput/TextInput';
import { FaTrashAlt } from 'react-icons/fa';
import { GrClose } from 'react-icons/gr';
import './style.css';

interface ISongFormProps {
    idCurrentProject: number;
    setSongFormVisible: React.Dispatch<React.SetStateAction<boolean>>;
    song?: Song;
}

const SongForm: FC<ISongFormProps> = ({
    idCurrentProject,
    setSongFormVisible,
    song,
}) => {
    const setFormInvisble = () => {
        setSongFormVisible(false);
    };
    const [number, setNumber] = useState<number | undefined>(song?.number);
    const [title, setTitle] = useState<string>(song?.title ?? '');
    const [artist, setArtist] = useState<string>(song?.artist ?? '');

    const onSubmit = async (event: FormEvent) => {
        event.preventDefault();

        if (title && title !== '') {
            const payload: Song = {
                title: title,
                artist: artist,
                number: number,
                id_project: idCurrentProject,
            };

            if (song?.id) {
                await db.song.update(song.id, payload);
                setFormInvisble();
            } else {
                await db.song.add(payload);

                setTitle('');
                setArtist('');
                setNumber(undefined);
            }
        }
    };

    const deleteSong = () => {
        if (song?.id) {
            db.song.delete(song?.id);
        }
    };

    return (
        <div className='song-form-container'>
            <GrClose className='close-song-form' onClick={setFormInvisble} />
            <h3>{!song && 'Neuer Song'}</h3>
            <form onSubmit={onSubmit}>
                <div className='song-form'>
                    <div className='song-form-row'>
                        <input
                            value={number ?? ''}
                            onChange={(e) =>
                                setNumber(parseInt(e.currentTarget.value))
                            }
                            className='number-input'
                            placeholder={'Nr.'}
                            type='number'
                        />
                        <TextInput
                            value={title}
                            onChange={(e) => setTitle(e.currentTarget.value)}
                            placeholder={'Titel'}
                            required
                        />
                    </div>
                    <TextInput
                        value={artist}
                        onChange={(e) => setArtist(e.currentTarget.value)}
                        placeholder={'Künstler:in'}
                    />
                </div>
                <div className='song-form-buttons'>
                    <Button type='submit'>Speichern</Button>
                    {song && (
                        <Button
                            type='button'
                            className='delete-button'
                            onClick={deleteSong}
                        >
                            <FaTrashAlt />
                        </Button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default SongForm;
