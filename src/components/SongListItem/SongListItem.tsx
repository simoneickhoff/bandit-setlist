import { FC, useState } from 'react';
import { Song } from '../../model/interfaces/Song';
import { BsThreeDotsVertical } from 'react-icons/bs';
import './style.css';
import SongForm from '../SongForm/SongForm';
import Card from '../general/Card/Card';

interface ISongListItemProps {
    song: Song;
}

const SongListItem: FC<ISongListItemProps> = ({ song }) => {
    const [editMode, setEditMode] = useState(false);

    return (
        <div className='song-list-item' key={song.id}>
            {!editMode ? (
                <>
                    <div className='song-list-item-leading'>
                        <div>
                            {song.number ? song.number + ' - ' : ''}
                            {song.title}
                        </div>
                        <div className='song-list-item-artist'>
                            {song.artist}
                        </div>
                    </div>
                    <div className='song-list-item-trailing'>
                        <BsThreeDotsVertical
                            onClick={() =>
                                setEditMode((prevValue) => !prevValue)
                            }
                        />
                    </div>
                </>
            ) : (
                <SongForm
                    idCurrentProject={song.id_project}
                    song={song}
                    setSongFormVisible={() => setEditMode(false)}
                />
            )}
        </div>
    );
};

export default SongListItem;
