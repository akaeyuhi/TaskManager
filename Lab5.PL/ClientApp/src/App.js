import React from 'react';
import {Route, Routes} from 'react-router-dom';
import AppRoutes from './Utils/AppRoutes';
import {Layout} from './components/Layout';
import './custom.css';

export default function App() {
    return (
        <Layout>
            <Routes>
                {AppRoutes.map((route, index) => {
                    const {element, ...rest} = route;
                    return <Route key={index} {...rest} element={element}/>;
                })}
            </Routes>
        </Layout>
    );
}
