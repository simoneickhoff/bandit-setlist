import { useLiveQuery } from 'dexie-react-hooks';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../../db/db';
import Card from '../general/Card/Card';
import ProjectForm from '../ProjectForm/ProjectForm';
import './style.css';

interface IProjectOverviewProps {
    setCurrentProject: React.Dispatch<React.SetStateAction<undefined>>;
}

const ProjectOverview: FC<IProjectOverviewProps> = ({ setCurrentProject }) => {
    const allProjects = useLiveQuery(() => {
        return db.project.toArray();
    });

    return (
        <div className='project-overview-container'>
            {allProjects?.length !== 0 && (
                <div>
                    <div className='project-overview-label'>
                        <h3>Wähle eines deiner Projekte:</h3>
                    </div>
                    <div className='project-list-container'>
                        {allProjects?.map((project) => (
                            <Link
                                to={`${project.slug}/setlist`}
                                key={project.id}
                            >
                                <Card>
                                    <div className='project-list-item'>
                                        {project.name}
                                    </div>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            <div className='project-form'>
                <div className='project-overview-label'>
                    <h3>
                        {allProjects?.length === 0
                            ? 'Name deiner Band oder deines Projekts:'
                            : 'Oder lege hier ein neues Projekt an:'}
                    </h3>
                </div>
                <ProjectForm allProjects={allProjects} />
            </div>
        </div>
    );
};

export default ProjectOverview;
