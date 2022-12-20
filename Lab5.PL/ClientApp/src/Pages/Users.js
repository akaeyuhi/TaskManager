import React, {useEffect, useState} from 'react';
import {Alert, Spinner} from 'reactstrap';
import UserCard from '../components/Users/UserCard';
const Projects = () => {
    const [users, setUsers] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const fetchData = async () => {
        try {
            const response = await fetch('api/User/');
            const json = await response.json();
            setUsers(json);
            setLoading(false);
        } catch (e) {
            setLoading(false);
            setError(e);
        }
    };

    useEffect(() => {
        fetchData().then();
    }, []);

    if(loading) return <Spinner />;
    else if(error) return <Alert color="danger">{error}</Alert>;
    else return (
        <div className="container">
            <h1>Users page</h1>
            <div className="flex mt-6">
                {users.length ?
                    users.map((project, idx) => <UserCard key={idx} project={project} />) :
                    <Alert color="primary">
                            No users yet...
                    </Alert>
                }
            </div>
        </div>
    );
};

export default Projects;
