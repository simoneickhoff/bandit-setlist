import { useState, FC } from 'react';
import Header from '../../components/Header/Header';
import ProjectOverview from '../../components/ProjectOverview/ProjectOverview';

const ProjectPage: FC = () => {
    const [currentProject, setCurrentProject] = useState();

    return (
        <div>
            <Header currentProject={currentProject} />
            <ProjectOverview setCurrentProject={setCurrentProject} />
        </div>
    );
};

export default ProjectPage;
