import React, {createContext, useEffect, useState} from 'react';
import {Alert, Spinner} from 'reactstrap';
import TaskCard from '../components/Cards/TaskCard';

export const TasksContext = createContext(null);


const Tasks = () => {
    const [tasks, setTasks] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            const response = await fetch('api/Task/');
            const json = await response.json();
            setTasks(json);
            setLoading(false);
        } catch (e) {
            setLoading(false);
            setError(e);
        }
    };

    useEffect(() => {
        fetchData().then();
    }, []);

    if (loading) return <Spinner/>;
    else if (error) return <Alert color="danger">{error}</Alert>;
    else return (
            <TasksContext.Provider value={{tasks, setTasks}}>
                <div className="container">
                    <h1>Tasks page</h1>
                    <div className="mt-6 card-container">
                        {tasks.length ?
                            tasks.map((task, idx) => <TaskCard key={idx} task={task}/>) :
                            <Alert color="primary">
                                No projects yet...
                            </Alert>
                        }
                    </div>
                </div>
            </TasksContext.Provider>
        );
};

export default Tasks;
