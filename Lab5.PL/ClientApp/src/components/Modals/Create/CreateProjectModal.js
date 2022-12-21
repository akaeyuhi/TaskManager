import React, {useCallback, useContext} from 'react';
import PropTypes from 'prop-types';
import {Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import {ProjectsContext} from '../../../Pages/Projects';

function CreateProjectModal({toggle, modal}) {
    const {projects, setProjects} = useContext(ProjectsContext);
    let formData = {
        projectName: ''
    };
    const afterReRender = (newProject) => {
        const newProjects = [...projects];
        newProjects.push(newProject);
        console.log(newProjects);
        setProjects(newProjects);
        toggle();
    };

    const submitHandler = useCallback(async (event) => {
        event.preventDefault();
        const dto = {
            projectName: formData.projectName,
        };
        try {
            const newProject = await fetch('api/Project/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dto)
            });
            afterReRender(await newProject.json());
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

    return (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Create project</ModalHeader>
            <ModalBody>
                <Form onSubmit={(event) => submitHandler(event)}>
                    <FormGroup floating>
                        <Input
                            id="name"
                            name="projectName"
                            placeholder="New project name"
                            type="text"
                            onChange={(e) => handleChange(e)}
                        />
                        <Label for="name">Project name</Label>
                    </FormGroup>
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

CreateProjectModal.propTypes = {
    toggle: PropTypes.func,
    modal: PropTypes.bool
};

export default CreateProjectModal;
