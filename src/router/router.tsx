import { createBrowserRouter, Route } from 'react-router-dom';
import ErrorPage from '../pages/ErrorPage/ErrorPage';
import ProjectPage from '../pages/ProjectPage/ProjectPage';
import SetListPage from '../pages/SetlistPage/SetlistPage';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <ProjectPage />,
        errorElement: <ErrorPage />,
    },
    {
        path: '/:projectSlug/setlist',
        element: <SetListPage />,
    },
    {
        path: '/:projectSlug/setlist/:idSetlist',
        element: <SetListPage />,
    },
]);
