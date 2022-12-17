import React from 'react';
import {Container} from 'reactstrap';
import NavMenu from './NavMenu';
import PropTypes from 'prop-types';

export function Layout({ children }) {
    return (
        <div>
            <NavMenu/>
            <Container>
                {children}
            </Container>
        </div>
    );
}

Layout.propTypes = {
    children: PropTypes.element.isRequired
};

