import { FC, FormEvent, useState } from 'react';
import { db } from '../../db/db';
import { Project } from '../../model/interfaces/Project';
import { slugify } from '../../util/stringRepository';
import Button from '../general/Button/Button';
import TextInput from '../general/TextInput/TextInput';
import './style.css';

interface IProjectFormProps {
    allProjects: Project[] | undefined;
}

const ProjectForm: FC<IProjectFormProps> = ({ allProjects }) => {
    const [bandName, setBandName] = useState('');

    const saveBandAndProceed = async (event: FormEvent) => {
        event.preventDefault();

        try {
            let slug = slugify(bandName);
            const projectWithSameSlug = await db.project
                .where('slug')
                .startsWith(slug)
                .count();

            slug += projectWithSameSlug > 0 ? '-' + projectWithSameSlug : '';

            // Add project to db
            const id = await db.project.add({
                name: bandName,
                slug: slug,
            });
        } catch (error) {
            console.log(`Failed to add ${bandName}: ${error}`);
        }
    };

    return (
        <form className='project-form-container' onSubmit={saveBandAndProceed}>
            <TextInput
                className='project-input'
                value={bandName}
                onChange={(e) => setBandName(e.target.value)}
            />
            <div className='project-form-submit'>
                <Button
                    // onClick={saveBandAndProceed}
                    disabled={bandName === ''}
                    type='submit'
                >
                    Los geht's
                </Button>
            </div>
        </form>
    );
};

export default ProjectForm;
