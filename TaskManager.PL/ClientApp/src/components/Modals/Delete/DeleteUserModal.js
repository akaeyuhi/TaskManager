import React, {useCallback, useContext} from 'react';
import PropTypes from 'prop-types';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import {UsersContext} from '../../../Pages/Users';

const DeleteUserModal = ({ modal, toggle, user }) => {
    const {users, setUsers} = useContext(UsersContext);

    const clearFromUsers = () => {
        const newUsers = users.filter(item => item.id !== user.id);
        setUsers(newUsers);
        toggle();
    };

    const deleteUser = useCallback(async () => {
        try {
            await fetch(`api/User/${user.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            clearFromUsers(user);
        } catch (e) {
            console.error(e);
        }
    }, []);

    return (
        <Modal isOpen={modal} toggle={() => toggle()}>
            <ModalHeader toggle={() => toggle()}>Are you sure?</ModalHeader>
            <ModalBody>
                You are going to delete this user
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

DeleteUserModal.propTypes = {
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



export default DeleteUserModal;
