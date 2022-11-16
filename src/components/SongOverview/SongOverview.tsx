import { useLiveQuery } from 'dexie-react-hooks';
import { FC, useState } from 'react';
import { db } from '../../db/db';
import { Project } from '../../model/interfaces/Project';
import Button from '../general/Button/Button';
import Card from '../general/Card/Card';
import SongForm from '../SongForm/SongForm';
import SongListItem from '../SongListItem/SongListItem';
import './style.css';

interface ISongOverviewProps {
    currentProject: Project;
}

const SongOverview: FC<ISongOverviewProps> = ({ currentProject }) => {
    const [songFormVisible, setSongFormVisible] = useState(false);
    const songs = useLiveQuery(() => {
        return db.song.where({ id_project: currentProject!.id }).toArray();
    });

    return (
        <div className='song-overview-container'>
            {songFormVisible && currentProject.id ? (
                <SongForm
                    idCurrentProject={currentProject.id}
                    setSongFormVisible={setSongFormVisible}
                />
            ) : (
                <Button
                    className='create-setlist-button'
                    type='submit'
                    onClick={() => setSongFormVisible(true)}
                >
                    Neuer Song
                </Button>
            )}

            <div>
                {songs?.map((song) => (
                    <SongListItem key={song.id} song={song} />
                ))}
            </div>
        </div>
    );
};

export default SongOverview;
