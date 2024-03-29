import React, {useCallback, useContext} from 'react';
import PropTypes from 'prop-types';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import {useParams} from 'react-router-dom';
import {ProjectContext} from '../../../Pages/SingleProject';


const DeleteFromProjectModal = ({isOpen, toggleFunc, deleteObject}) => {
    const currentProjectId = useParams().id;
    const {project, setProject} = useContext(ProjectContext);
    const deleteData = useCallback(async (deleteObject) => {
        try {
            await fetch(`api/Project/delete${deleteObject.deleteType}/${currentProjectId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    [deleteObject.deleteType + 'Id']: deleteObject.deleteId
                })
            });
            toggleFunc('', null);
        } catch (e) {
            console.error(e);
        }
    }, []);
    const afterDelete = useCallback(async () => {
        await deleteData(deleteObject);
        if (deleteObject.deleteId !== null && deleteObject.deleteType !== '') {
            const type = deleteObject.deleteType + 's';
            const tempArray = project[type].filter(item => item.id !== deleteObject.deleteId);
            setProject({
                ...project,
                [type]: tempArray
            });
        }
    }, [deleteObject]);

    return (
        <Modal isOpen={isOpen} toggle={() => toggleFunc('', null)}>
            <ModalHeader toggle={() => toggleFunc('', 0)}>Are you sure?</ModalHeader>
            <ModalBody>
                You are going to delete {deleteObject.deleteType}
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={() => toggleFunc('', null)}>
                    Cancel
                </Button>
                <Button color="danger" onClick={async () => await afterDelete()}>
                    Delete
                </Button>
            </ModalFooter>
        </Modal>
    );
};

DeleteFromProjectModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    toggleFunc: PropTypes.func.isRequired,
    deleteObject: PropTypes.shape({
        deleteType: PropTypes.string,
        deleteId: PropTypes.number
    }).isRequired
};


export default DeleteFromProjectModal;
