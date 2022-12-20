import React, {createContext, useCallback, useEffect, useState} from 'react';
import {Alert, Button, CardGroup, Spinner} from 'reactstrap';
import {useParams} from 'react-router-dom';
import UserCard from '../components/Cards/UserCard';
import TaskCard from '../components/Cards/TaskCard';
import DeleteFromProjectModal from '../components/Modals/DeleteFromProjectModal';
import AddUserModal from '../components/Modals/AddUserModal';
import CreateTaskModal from '../components/Modals/CreateTaskModal';
export const ProjectContext = createContext(null);

const SingleProject = () => {
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState({
        isShown: false,
        deleteType: '',
        deleteId: null
    });
    const params = useParams();
    const [showAddUserModal, setShowAddUserModal] = useState(false);
    const toggleAddUsers = useCallback(() => setShowAddUserModal(prevState => !prevState), [showAddUserModal]);
    const [showAddTaskModal, setShowAddTaskModal] = useState(false);
    const toggleAddTask = useCallback(() => setShowAddTaskModal(prevState => !prevState), [showAddUserModal]);


    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await fetch(`api/Project/${params.id}`);
            const json = await response.json();
            setProject(json);
            setLoading(false);
        } catch (e) {
            setLoading(false);
            setError(e);
        }
    };
    const deleteCallback = useCallback((deleteType, deleteId) => {
        setShowDeleteModal((prevState => ({
            isShown: !prevState.isShown,
            deleteType, deleteId
        })));
    }, [showDeleteModal]);

    const assignTasksHandler = async () => {
        try {
            await fetch(`api/Project/assignTasks/${params.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            await fetchData();
        } catch (e) {
            setError(e);
        }
    };


    useEffect(() => {
        fetchData().then();
    }, []);

    if(loading) return <Spinner />;
    else if(error) return <Alert color="danger">{error}</Alert>;
    else return (
        <ProjectContext.Provider value={{project, setProject}}>
            <div className="container">
                <h1>{project.projectName}</h1>
                <div className="d-flex justify-content-between mb-2">
                    <h2 className="mt-2">Users:</h2>
                    <Button color="warning" className="h-75" onClick={toggleAddUsers}>
                        Add user
                    </Button>
                    <Button color="warning" className="h-75" onClick={async () => await assignTasksHandler()}>
                        Assign tasks
                    </Button>
                </div>
                <CardGroup>
                    {
                        project.users.length ?
                            project.users.map((user, idx) => <UserCard user={user} key={idx} callback={deleteCallback} />) :
                            <Alert color="primary">
                                There is no users.
                            </Alert>
                    }
                </CardGroup>
                <div className="d-flex justify-content-between mt-2  mb-2">
                    <h2 className="mt-2">Tasks:</h2>
                    <Button color="warning" className="h-75" onClick={toggleAddTask}>
                        Add task
                    </Button>
                </div>
                <CardGroup>
                    {
                        project.tasks.length ?
                            project.tasks.map((task, idx) => <TaskCard task={task} key={idx} callback={deleteCallback}/>) :
                            <Alert color="primary">
                                There is no tasks.
                            </Alert>
                    }
                </CardGroup>
                <DeleteFromProjectModal isOpen={showDeleteModal.isShown} toggleFunc={deleteCallback} deleteObject={{
                    deleteType: showDeleteModal.deleteType,
                    deleteId: showDeleteModal.deleteId,
                }
                }/>
                <AddUserModal modal={showAddUserModal} toggle={toggleAddUsers}/>
                <CreateTaskModal modal={showAddTaskModal} toggle={toggleAddTask}/>
            </div>
        </ProjectContext.Provider>
    );
};

export default SingleProject;
