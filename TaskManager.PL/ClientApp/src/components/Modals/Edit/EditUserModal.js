import React, {useCallback, useContext} from 'react';
import PropTypes from 'prop-types';
import {Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import {ProjectContext} from '../../../Pages/SingleProject';

function EditUserModal({currentUser, toggle, modal}) {
    const {project, setProject} = useContext(ProjectContext);
    let formData = {
        username: currentUser.name,
        busyness: currentUser.busyness
    };

    const afterReRender = (dto) => {
        const newUsers = project.users.map(item => item.id === currentUser.id ? {
            ...currentUser,
            ...dto
        } : item);
        setProject((prevProject) => ({
            ...prevProject,
            users: newUsers
        }));
        toggle();
    };

    const submitHandler = useCallback(async (event) => {
        event.preventDefault();
        const dto = {
            name: formData.username,
            busyness: formData.busyness,
        };
        try {
            await fetch(`api/User/${currentUser.id}`, {
                method: 'PUT',
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
            <ModalHeader toggle={toggle}>Edit user</ModalHeader>
            <ModalBody>
                <Form onSubmit={(event) => submitHandler(event)}>
                    <FormGroup floating>
                        <Input
                            id="name"
                            name="username"
                            placeholder="User's name"
                            type="text"
                            onChange={(e) => handleChange(e)}
                            defaultValue={currentUser.name}
                        />
                        <Label for="name">Name</Label>
                    </FormGroup>
                    <Input id="busyness"
                           name="busyness"
                           type="checkbox"
                           onChange={(e) => handleChange(e)}
                           defaultChecked={currentUser.busyness}/>
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

EditUserModal.propTypes = {
    currentUser: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        busyness: PropTypes.bool,
        task: PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string,
            description: PropTypes.string,
            priority: PropTypes.bool,
            status: PropTypes.string,
            userId: PropTypes.number
        })
    }),
    toggle: PropTypes.func,
    modal: PropTypes.bool
};

export default EditUserModal;
