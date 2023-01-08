import React, {useCallback, useContext} from 'react';
import PropTypes from 'prop-types';
import {Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import {UsersContext} from '../../../Pages/Users';

function CreateUserModal({toggle, modal}) {
    const {users, setUsers} = useContext(UsersContext);
    let formData = {
        username: '',
        busyness: false
    };

    const afterReRender = (newUser) => {
        const newUsers = [...users];
        newUsers.push(newUser);
        console.log(newUsers);
        setUsers(newUsers);
        toggle();
    };

    const submitHandler = useCallback(async (event) => {
        event.preventDefault();
        const dto = {
            name: formData.username,
            busyness: formData.busyness,
            task: null
        };
        try {
            await fetch('api/User/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dto)
            });
            afterReRender(dto);
        } catch (e) {
            console.error(e);
        }
    }, [formData]);

    const handleChange = (e) => {
        formData = {
            ...formData,
            [e.target.name]: e.target.value.trim(),
        };
        formData.busyness = e.target.checked;
    };


    return (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Create user</ModalHeader>
            <ModalBody>
                <Form onSubmit={(event) => submitHandler(event)}>
                    <FormGroup floating>
                        <Input
                            id="name"
                            name="username"
                            placeholder="User's name"
                            type="text"
                            onChange={(e) => handleChange(e)}
                        />
                        <Label for="name">Name</Label>
                    </FormGroup>
                    <Input id="busyness"
                           name="busyness"
                           type="checkbox"
                           onChange={(e) => handleChange(e)}/>
                    <Label check for="busyness"> Busyness</Label><br/>
                    <Button color="primary" className="mt-4" type="submit">
                        Submit
                    </Button>
                    {' '}
                </Form>
            </ModalBody>
            <ModalFooter>
                {' '}
                <Button color="secondary" onClick={toggle}>
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>
    );
}

CreateUserModal.propTypes = {
    toggle: PropTypes.func,
    modal: PropTypes.bool
};

export default CreateUserModal;
