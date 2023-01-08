import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
const DeleteUserTaskModal = ({ modal, toggle, user }) => {
    const clearFromUser = () => {
        user.task = null;
        toggle();
    };

    const deleteUser = useCallback(async () => {
        try {
            await fetch(`api/User/clearTask/${user.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            clearFromUser();
        } catch (e) {
            console.error(e);
        }
    }, []);

    return (
        <Modal isOpen={modal} toggle={() => toggle()}>
            <ModalHeader toggle={() => toggle()}>Are you sure?</ModalHeader>
            <ModalBody>
                You are going to delete this task from user
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={() => toggle()}>
                    Cancel
                </Button>
                <Button color="danger" onClick={async () => await deleteUser()}>
                    Delete
                </Button>
            </ModalFooter>
        </Modal>
    );
};

DeleteUserTaskModal.propTypes = {
    modal: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired,
    user: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        busyness: PropTypes.bool,
        task: PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string,
            description: PropTypes.string,
            priority: PropTypes.bool,
            status: PropTypes.string
        })
    }),
};



export default DeleteUserTaskModal;
