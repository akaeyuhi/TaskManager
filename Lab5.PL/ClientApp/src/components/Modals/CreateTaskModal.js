import React, {useCallback, useContext} from 'react';
import PropTypes from 'prop-types';
import {Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import {ProjectContext} from '../../Pages/SingleProject';
import {useParams} from 'react-router-dom';

function CreateTaskModal({toggle, modal}) {
    const {project, setProject} = useContext(ProjectContext);
    const id = useParams().id;

    let formData = {
        taskName: '',
        description: '',
        priority: false,
        status: ''
    };

    const afterReRender = (newTask) => {
        const newTasks = [...project.tasks];
        newTasks.push(newTask);
        setProject((prevProject) =>({
            ...prevProject,
            tasks: newTasks
        }));
        toggle();
    };

    const submitHandler = useCallback(async (event) => {
        event.preventDefault();
        const newTask = {
            name: formData.taskName,
            description: formData.description,
            priority: formData.priority,
            status: formData.status
        };
        try {

            const response = await fetch('api/Task/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newTask)
            });
            const json = await response.json();
            await fetch(`api/Project/addTask/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({taskId: json.id})
            });
            afterReRender(newTask);
        } catch (e) {
            console.error(e);
        }
    }, [formData]);
    const handleChange = (e) => {
        formData = {
            ...formData,
            [e.target.name]: e.target.value.trim(),
        };
        formData.priority = e.target.checked;
    };


    return (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Create task</ModalHeader>
            <ModalBody>
                <Form onSubmit={(event) => submitHandler(event)}>
                    <FormGroup floating>
                        <Input
                            id="name"
                            name="taskName"
                            placeholder="New task name"
                            type="text"
                            onChange={(e) => handleChange(e)}
                        />
                        <Label for="name">Task name</Label>
                    </FormGroup>
                    <FormGroup floating>
                        <Input
                            id="description"
                            name="description"
                            placeholder="New description"
                            type="text"
                            onChange={(e) => handleChange(e)}

                        />
                        <Label for="name">Description</Label>
                    </FormGroup>
                    <Input id="priority"
                        name="priority"
                        type="checkbox"
                        onChange={(e) => handleChange(e)}
                    />
                    <Label check for="priority"> Priority</Label><br/>
                    <Label for="description" className="mt-2">Status</Label>
                    <Input
                        id="status"
                        name="status"
                        placeholder="New status"
                        type="select"
                        onChange={(e) => handleChange(e)}
                    >
                        <option value="created">created</option>
                        <option value="in progress">in progress</option>
                        <option value="completed">completed</option>
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

CreateTaskModal.propTypes = {
    toggle: PropTypes.func,
    modal: PropTypes.bool
};

export default CreateTaskModal;
