import { IndexableType } from 'dexie';
import { useLiveQuery } from 'dexie-react-hooks';
import { FC } from 'react';
import { redirect, useNavigate, useParams } from 'react-router-dom';
import { db } from '../../db/db';
import { Project } from '../../model/interfaces/Project';
import Button from '../general/Button/Button';
import Card from '../general/Card/Card';
import SetlistItem from '../SetlistItem/SetlistItem';
import './style.css';

interface ISetlistOverviewProps {
    currentProject: Project;
}

const SetlistOverview: FC<ISetlistOverviewProps> = ({ currentProject }) => {
    let { idSetlist } = useParams();
    const setlists = useLiveQuery(() => {
        return db.setlist.where({ id_project: currentProject!.id }).toArray();
    });
    const navigate = useNavigate();

    const newSetlist = async () => {
        // Add new setlist to db
        if (currentProject?.id) {
            try {
                const id = await db.setlist.add({
                    title: 'Neue Setlist',
                    id_project: currentProject.id,
                });

                if (id) {
                    navigateToSetlist(id);
                }
            } catch (e) {
                console.log('Creating Setlist did not work ' + e);
            }
        }
    };

    const navigateToSetlist = (id: number | IndexableType) => {
        navigate(`/${currentProject.slug}/setlist/${id}`);
    };

    return (
        <>
            <Button
                className='create-setlist-button'
                type='submit'
                onClick={newSetlist}
            >
                Neue Setlist
            </Button>
            <div className='setlist-list'>
                {setlists?.map((setlist) => (
                    <SetlistItem
                        key={setlist.id}
                        setlist={setlist}
                        onClick={() => navigateToSetlist(setlist.id!)}
                        active={setlist.id?.toString() === idSetlist}
                    />
                ))}
            </div>
        </>
    );
};

export default SetlistOverview;
