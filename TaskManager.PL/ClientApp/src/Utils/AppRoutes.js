import React from 'react';
import {Home} from '../Pages/Home';
import Projects from '../Pages/Projects';
import SingleProject from '../Pages/SingleProject';
import Users from '../Pages/Users';
import Tasks from '../Pages/Tasks';

const AppRoutes = [
    {
        path: '/',
        index: true,
        element: <Home/>
    },
    {
        path: '/project/:id',
        element: <SingleProject/>
    },
    {
        path: '/projects',
        element: <Projects/>
    },
    {
        path: '/users',
        element: <Users/>
    },
    {
        path: '/tasks',
        element: <Tasks/>
    },
];

export default AppRoutes;
