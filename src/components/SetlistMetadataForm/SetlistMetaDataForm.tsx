import { FC } from 'react';
import { Setlist } from '../../model/interfaces/Setlist';
import { FaRegCalendarAlt, FaMapPin } from 'react-icons/fa';
import { formatDate } from '../../util/dateRepository';
import { db } from '../../db/db';
import './style.css';

interface ISetlistMetaDataFormProps {
    setlist: Setlist;
}

const SetlistMetaDataForm: FC<ISetlistMetaDataFormProps> = ({ setlist }) => {
    const updateSetlist = async (updatedSetlist: Setlist) => {
        if (setlist?.id) {
            const res = await db.setlist.update(setlist.id, updatedSetlist);
        }
    };
    return (
        <div className='setlist-metadata-container'>
            <input
                className='setlist-title setlist-input'
                defaultValue={setlist.title}
                key={setlist.title}
                onBlur={(e) =>
                    updateSetlist({
                        ...setlist,
                        ...{ title: e.currentTarget.value },
                    })
                }
            />
            <div className='setlist-data-container'>
                <div>
                    <FaRegCalendarAlt />
                    <input
                        type='date'
                        className='setlist-date setlist-input'
                        placeholder='Gib ein Datum an'
                        defaultValue={setlist.date && formatDate(setlist.date)}
                        key={setlist.date?.toISOString()}
                        onBlur={(e) =>
                            updateSetlist({
                                ...setlist,
                                ...{
                                    date: new Date(e.currentTarget.value),
                                },
                            })
                        }
                    />
                </div>
                <div>
                    <FaMapPin />
                    <input
                        className='setlist-location setlist-input'
                        placeholder='Gib einen Ort an'
                        defaultValue={setlist.location}
                        key={setlist.location}
                        onBlur={(e) =>
                            updateSetlist({
                                ...setlist,
                                ...{ location: e.currentTarget.value },
                            })
                        }
                    />
                </div>
            </div>
        </div>
    );
};

export default SetlistMetaDataForm;
