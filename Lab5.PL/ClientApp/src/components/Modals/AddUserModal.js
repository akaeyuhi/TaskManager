import React, {useCallback, useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Alert, Button, Form, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Spinner} from 'reactstrap';
import {ProjectContext} from '../../Pages/SingleProject';
import {useParams} from 'react-router-dom';

function EditUserModal({toggle, modal}) {
    const {project, setProject} = useContext(ProjectContext);
    const [candidates, setCandidates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const id = useParams().id;

    const fetchCandidates = async () => {
        try {
            const response = await fetch('api/User/');
            const json = await response.json();
            setCandidates(json.filter(user => user.projectId === null));
            setLoading(false);
        } catch (e) {
            setError(e);
        }
    };

    let formData = {
        newUserName: ''
    };

    useEffect(() => {
        fetchCandidates().then();
    }, []);


    const afterReRender = (newUser) => {
        const newUsers = [...project.users];
        newUsers.push(newUser);
        setProject((prevProject) =>({
            ...prevProject,
            users: [...newUsers]
        }));
        toggle();
    };

    const submitHandler = useCallback(async (event) => {
        event.preventDefault();
        const user = candidates.find(user => user.name === formData.newUserName);
        if(formData.newUserName === '' && user === undefined) return toggle();
        const dto = {
            userId: user.id
        };
        try {
            await fetch(`api/Project/addUser/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dto)
            });
            afterReRender(user);
        } catch (e) {
            console.error(e);
        }
    }, [formData]);
    const handleChange = (e) => {
        formData = {
            ...formData,
            [e.target.name]: e.target.value.trim(),
        };
    };

    if(loading) return <Modal><Spinner /></Modal>;
    else if(error) return <Modal><Alert color="danger">{error}</Alert></Modal>;
    else return (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Edit user</ModalHeader>
            <ModalBody>
                <Form onSubmit={(event) => submitHandler(event)}>
                    <Label for="newUserName">Select user to add</Label>
                    <Input
                        id="newUserName"
                        name="newUserName"
                        placeholder="newUser"
                        type="select"
                        onChange={(e) => handleChange(e)}

                    >
                        <option value="Value">User</option>
                        {candidates.map((user, idx) => <option value={user.name} key={idx}>{user.name}</option>)}
                    </Input>
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
    toggle: PropTypes.func,
    modal: PropTypes.bool
};

export default EditUserModal;
