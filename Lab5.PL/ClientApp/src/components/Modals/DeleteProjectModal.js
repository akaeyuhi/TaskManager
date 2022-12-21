import React, {useCallback, useContext} from 'react';
import PropTypes from 'prop-types';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import {ProjectsContext} from '../../Pages/Projects';

const DeleteProjectModal = ({ modal, toggle, project }) => {
    const {projects, setProjects} = useContext(ProjectsContext);

    const clearFromProject = () => {
        const newProjects = projects.filter(item => item.id !== project.id);
        setProjects(newProjects);
        toggle();
    };

    const deleteProject = useCallback(async () => {
        try {
            await fetch(`api/Project/${project.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            clearFromProject();
        } catch (e) {
            console.error(e);
        }
    }, []);

    return (
        <Modal isOpen={modal} toggle={() => toggle()}>
            <ModalHeader toggle={() => toggle()}>Are you sure?</ModalHeader>
            <ModalBody>
                You are going to delete this project
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={() => toggle()}>
                    Cancel
                </Button>
                <Button color="danger" onClick={async () => await deleteProject()}>
                    Delete
                </Button>
            </ModalFooter>
        </Modal>
    );
};

DeleteProjectModal.propTypes = {
    modal: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired,
    project: PropTypes.shape({
        id: PropTypes.number,
        projectName: PropTypes.string,
        users: PropTypes.array,
        tasks: PropTypes.array
    }),
};



export default DeleteProjectModal;
