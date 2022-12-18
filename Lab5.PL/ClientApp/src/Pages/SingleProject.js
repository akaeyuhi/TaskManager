import React, {useEffect, useState} from 'react';
import {Alert, CardGroup, Spinner} from 'reactstrap';
import {useParams} from 'react-router-dom';
import UserCard from '../components/SingleProject/UserCard';
import TaskCard from '../components/SingleProject/TaskCard';

TaskCard.propTypes = {};
const SingleProject = () => {
    const [project, setProject] = useState(null);
    const params = useParams();
    const fetchData = async () => {
        try {
            const result = await fetch(`api/Project/${params.id}`);
            setProject(await result.json());
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        fetchData().then();
    }, []);

    return (
        <>
            {
                project === null ? <Spinner /> :
                    <div className="container">
                        <h1>{project.projectName}</h1>
                        <h2 className="mt-2">Users:</h2>
                        <CardGroup>
                            {
                                project.users.length ?
                                    project.users.map((user, idx) => <UserCard user={user} key={idx} />) :
                                    <Alert color="primary">
                                        There is no users.
                                    </Alert>
                            }
                        </CardGroup>
                        <h2 className="mt-2">Tasks:</h2>
                        <CardGroup>
                            {
                                project.tasks.length ?
                                    project.tasks.map((task, idx) => <TaskCard task={task} key={idx} />) :
                                    <Alert color="primary">
                                        There is no tasks.
                                    </Alert>
                            }
                        </CardGroup>
                    </div>
            }
        </>


    );
};

export default SingleProject;
