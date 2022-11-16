import { FC, useState } from 'react';
import { Project } from '../../model/interfaces/Project';
import SetlistOverview from '../SetlistOverview/SetlistOverview';
import SongOverview from '../SongOverview/SongOverview';
import './style.css';

interface ISidebarProps {
    currentProject: Project;
}

enum Tabs {
    'setlists',
    'songs',
}

const Sidebar: FC<ISidebarProps> = ({ currentProject }) => {
    const [activeTab, setActiveTab] = useState<Tabs>(Tabs.setlists);

    return (
        <div className='sidebar-container'>
            <div className='tabs'>
                <div
                    onClick={() => setActiveTab(Tabs.setlists)}
                    className={`tab ${
                        activeTab === Tabs.setlists ? 'active' : ''
                    }`}
                >
                    Setlists
                </div>
                <div
                    className={`tab ${
                        activeTab === Tabs.songs ? 'active' : ''
                    }`}
                    onClick={() => setActiveTab(Tabs.songs)}
                >
                    Songs
                </div>
            </div>
            <div className='sidebar-body'>
                {activeTab === Tabs.setlists ? (
                    <SetlistOverview currentProject={currentProject} />
                ) : (
                    <SongOverview currentProject={currentProject} />
                )}
            </div>
        </div>
    );
};

export default Sidebar;
