import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Setlist } from '../../model/interfaces/Setlist';
import Card from '../general/Card/Card';
import { FaRegCalendarAlt, FaMapPin } from 'react-icons/fa';
import './style.css';

interface ISetlistItemProps {
    setlist: Setlist;
    onClick: () => void;
    active: boolean;
}

const SetlistItem: FC<ISetlistItemProps> = ({ setlist, onClick, active }) => {
    return (
        <Card key={setlist.id} onClick={() => onClick()} active={active}>
            <div className='setlist-item'>{setlist.title}</div>
            <div className='setlist-item-metadata'>
                {setlist.date && (
                    <div>
                        <FaRegCalendarAlt />
                        {setlist.date.toLocaleDateString()}
                    </div>
                )}
                {setlist.location && setlist.location !== '' && (
                    <div>
                        <FaMapPin />
                        {setlist.location}
                    </div>
                )}
            </div>
        </Card>
    );
};

export default SetlistItem;
