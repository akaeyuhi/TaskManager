import React, {useCallback, useState} from 'react';
import {Alert, CardGroup, Spinner} from 'reactstrap';
import {useParams} from 'react-router-dom';
import UserCard from '../components/SingleProject/UserCard';
import TaskCard from '../components/SingleProject/TaskCard';
import DeleteModal from '../components/SingleProject/DeleteModal';
import {useFetch} from '../Utils/hooks/fetch.hook';

const SingleProject = () => {
    const [project, setProject] = useState(null);
    const [showModal, setShowModal] = useState({
        isShown: false,
        deleteType: '',
        deleteId: null
    });
    const params = useParams();

    const { response, error } = useFetch(`api/Project/${params.id}`);
    if(!response) return <Spinner />;
    else if(error) return console.error(error);
    setProject(response);

    const deleteCallback = useCallback((deleteType, deleteId) => {
        setShowModal((prevState => ({
            isShown: !prevState.isShown,
            deleteType, deleteId
        })));
    }, [showModal]);
    const clearCallback = useCallback(() => {
        if(showModal.deleteId !== null && showModal.deleteType !== '') {
            const type = showModal.deleteType + 's';
            const tempArray = project[type].filter(item => item.id !== showModal.deleteId);
            console.log(tempArray);
            setProject({
                ...project,
                [type]: tempArray
            });
        }
    }, [project, showModal]);


    return (
        <div className="container">
            <h1>{project.projectName}</h1>
            <h2 className="mt-2">Users:</h2>
            <CardGroup>
                {
                    project.users.length ?
                        project.users.map((user, idx) => <UserCard user={user} key={idx} callback={deleteCallback} />) :
                        <Alert color="primary">
                                        There is no users.
                        </Alert>
                }
            </CardGroup>
            <h2 className="mt-2">Tasks:</h2>
            <CardGroup>
                {
                    project.tasks.length ?
                        project.tasks.map((task, idx) => <TaskCard task={task} key={idx} callback={deleteCallback}/>) :
                        <Alert color="primary">
                                        There is no tasks.
                        </Alert>
                }
            </CardGroup>
            <DeleteModal isOpen={showModal.isShown} toggleFunc={deleteCallback} deleteObject={{
                currentProjectId: +params.id,
                deleteType: showModal.deleteType,
                deleteId: showModal.deleteId,
            }
            } afterDeleteCb={clearCallback}/>
        </div>
    );
};

export default SingleProject;
