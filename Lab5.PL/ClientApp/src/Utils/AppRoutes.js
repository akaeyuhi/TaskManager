import React from 'react';
import {Home} from '../Pages/Home';
import Projects from '../Pages/Projects';
import SingleProject from '../Pages/SingleProject';

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
    // {
    //     path: '/users',
    //     element: <Users/>
    // },
    // {
    //     path: '/user/:id',
    //     element: <SingleUser/>
    // },
    // {
    //     path: '/tasks',
    //     element: <Tasks/>
    // },
    // {
    //     path: '/task/:id',
    //     element: <SingleTask/>
    // }
];

export default AppRoutes;
