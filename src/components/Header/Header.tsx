import { FC, useState } from 'react';
import { Project } from '../../model/interfaces/Project';
import './style.css';
import { FaMoon, FaSun } from 'react-icons/fa';
import { BiExit } from 'react-icons/bi';
import { Link } from 'react-router-dom';

interface IHeaderProps {
    currentProject?: Project;
}

const Header: FC<IHeaderProps> = ({ currentProject }) => {
    const [theme, setTheme] = useState<'light' | 'dark'>('dark');

    const navigateHome = () => {};

    return (
        <div className='header-container '>
            <div className='header-submenu'>
                {theme === 'dark' ? (
                    <FaMoon onClick={() => setTheme('light')} />
                ) : (
                    <FaSun onClick={() => setTheme('dark')} />
                )}
            </div>
            <div className='logo'>
                <div>BANDiT</div>
                <div className='logo-setlist'>Setlist</div>
            </div>
            <Link to={`/`} className='header-project-name'>
                {currentProject && (
                    <>
                        <span>{currentProject.name}</span> <BiExit />
                    </>
                )}
            </Link>
        </div>
    );
};

export default Header;
