import React, {useCallback, useContext} from 'react';
import PropTypes from 'prop-types';
import {Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import {ProjectContext} from '../../Pages/SingleProject';

function EditTaskModal({task, toggle, modal}) {
    const {project, setProject} = useContext(ProjectContext);

    let formData = {
        taskName: task.name,
        description: task.description,
        priority: task.priority,
        status: task.status
    };

    const afterReRender = (dto) => {
        const newTasks = project.tasks.map(item => item.id === task.id ? {
            ...task,
            ...dto
        }: item);
        setProject((prevProject) =>({
            ...prevProject,
            tasks: newTasks
        }));
        toggle();
    };

    const submitHandler = useCallback(async (event) => {
        event.preventDefault();
        const dto = {
            name: formData.taskName,
            description: formData.description,
            priority: formData.priority,
            status: formData.status
        };
        try {
            await fetch(`api/Task/${task.id}`, {
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
        formData.priority = e.target.checked;
    };


    return (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Edit user</ModalHeader>
            <ModalBody>
                <Form onSubmit={(event) => submitHandler(event)}>
                    <FormGroup floating>
                        <Input
                            id="name"
                            name="taskName"
                            placeholder="New task name"
                            type="text"
                            onChange={(e) => handleChange(e)}
                            defaultValue={task.name}
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
                            defaultValue={task.description}
                        />
                        <Label for="name">Description</Label>
                    </FormGroup>
                    <Input id="priority"
                        name="priority"
                        type="checkbox"
                        onChange={(e) => handleChange(e)}
                        defaultChecked={task.priority} />
                    <Label check for="priority"> Priority</Label><br/>
                    <Label for="description" className="mt-2">Status</Label>
                    <Input
                        id="status"
                        name="status"
                        placeholder="New status"
                        type="select"
                        onChange={(e) => handleChange(e)}
                        defaultValue={task.status}
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

EditTaskModal.propTypes = {

    task: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        description: PropTypes.string,
        priority: PropTypes.bool,
        status: PropTypes.string,
        userId: PropTypes.number
    }),
    toggle: PropTypes.func,
    modal: PropTypes.bool
};

export default EditTaskModal;
