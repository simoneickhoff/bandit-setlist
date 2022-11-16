import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header/Header';
import SetlistCreator from '../../components/SetlistCreator/SetlistCreator';
import SetlistOverview from '../../components/SetlistOverview/SetlistOverview';
import Sidebar from '../../components/Sidebar/Sidebar';
import { db } from '../../db/db';
import { Project } from '../../model/interfaces/Project';
import './style.css';

interface ISetlistPageProps {}

const SetListPage: FC<ISetlistPageProps> = (props) => {
    let { projectSlug, idSetlist } = useParams();
    const [currentProject, setCurrentProject] = useState<Project>();

    useEffect(() => {
        getProject();
    }, []);

    const getProject = async () => {
        const project = await db.project.where({ slug: projectSlug }).first();

        if (!project) {
            // todo: Handle wrong slug
            console.log('no band slug given');
        } else {
            setCurrentProject(project);
        }
    };

    return (
        <>
            <Header currentProject={currentProject} />
            {currentProject && (
                <div className='setlist-page'>
                    <div className='sidebar'>
                        <Sidebar currentProject={currentProject} />
                    </div>
                    <div className='setlist-creator'>
                        <SetlistCreator idSetlist={idSetlist} />
                    </div>
                </div>
            )}
        </>
    );
};

export default SetListPage;
