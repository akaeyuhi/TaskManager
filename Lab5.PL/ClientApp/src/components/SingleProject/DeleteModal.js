import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';


const DeleteModal = ({ isOpen, toggleFunc, deleteObject, afterDeleteCb }) => {
    const deleteData = useCallback(async (deleteObject) => {
        try {
            await fetch(`api/Project/delete${deleteObject.deleteType}/${deleteObject.currentProjectId}`, {
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
        afterDeleteCb();
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

DeleteModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    toggleFunc: PropTypes.func.isRequired,
    deleteObject: PropTypes.shape({
        currentProjectId: PropTypes.number,
        deleteType: PropTypes.string,
        deleteId: PropTypes.number
    }).isRequired,
    afterDeleteCb: PropTypes.func.isRequired
};



export default DeleteModal;
