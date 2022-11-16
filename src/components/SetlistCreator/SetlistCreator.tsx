import { useLiveQuery } from 'dexie-react-hooks';
import { FC } from 'react';
import { db } from '../../db/db';
import SetlistMetaDataForm from '../SetlistMetadataForm/SetlistMetaDataForm';
import SetlistForm from '../SetlistForm/SetlistForm';

import './style.css';

interface ISetlistCreatorProps {
    idSetlist?: string;
}

const SetlistCreator: FC<ISetlistCreatorProps> = ({ idSetlist }) => {
    const setlist = useLiveQuery(() => {
        if (idSetlist) {
            const id = parseInt(idSetlist);
            return db.setlist.where({ id: id }).first();
        }
    }, [idSetlist]);

    return (
        <div className='setlist-creator-container'>
            {setlist?.id && (
                <>
                    <SetlistMetaDataForm setlist={setlist} />
                    <SetlistForm setlist={setlist} />
                </>
            )}
        </div>
    );
};

export default SetlistCreator;
