import React, {useCallback, useContext} from 'react';
import PropTypes from 'prop-types';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import {TasksContext} from '../../../Pages/Tasks';

const DeleteTaskModal = ({modal, toggle, task}) => {
    const {tasks, setTasks} = useContext(TasksContext);

    const clearFromTasks = () => {
        const newUsers = tasks.filter(item => item.id !== task.id);
        setTasks(newUsers);
        toggle();
    };

    const deleteTask = useCallback(async () => {
        try {
            await fetch(`api/Task/${task.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            clearFromTasks();
        } catch (e) {
            console.error(e);
        }
    }, []);

    return (
        <Modal isOpen={modal} toggle={() => toggle()}>
            <ModalHeader toggle={() => toggle()}>Are you sure?</ModalHeader>
            <ModalBody>
                You are going to delete this task
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={() => toggle()}>
                    Cancel
                </Button>
                <Button color="danger" onClick={async () => await deleteTask()}>
                    Delete
                </Button>
            </ModalFooter>
        </Modal>
    );
};

DeleteTaskModal.propTypes = {
    modal: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired,
    task: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        description: PropTypes.string,
        priority: PropTypes.bool,
        status: PropTypes.string,
    }).isRequired,
};


export default DeleteTaskModal;
