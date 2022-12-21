import React, {useCallback, useState} from 'react';
import {Button, Card, CardBody, CardText, CardTitle} from 'reactstrap';
import PropTypes from 'prop-types';
import DeleteUserModal from '../Modals/DeleteUserModal';
import DeleteUserTaskModal from '../Modals/DeleteUserTaskModal';

const UserCard = ({ user }) => {
    const [userModal, setUserModal] = useState(false);
    const toggleUser = useCallback(() => setUserModal(prev => !prev), [userModal]);
    const [taskModal, setTaskModal] = useState(false);
    const toggleTask = useCallback(() => setTaskModal(prev => !prev), [taskModal]);
    return (
        <Card>
            <CardBody>
                <CardTitle tag="h5">
                    {user.name}
                </CardTitle>
                <CardText>
                    Busyness: {user.busyness ? 'Yes' : 'No'}
                </CardText>
                <CardText>
                    {user.task !== null ?
                        `Current task: ${user.task.name}`
                        : 'User has no task'}

                </CardText>
                <div className="d-flex justify-content-between">
                    <Button color="danger" onClick={() => toggleUser()}>
                        Delete
                    </Button>
                    {user.task ? <Button color="danger" onClick={() => toggleTask()}>
                        Clear task
                    </Button> : <></>}

                </div>
            </CardBody>
            <DeleteUserModal modal={userModal} toggle={toggleUser} user={user}/>
            <DeleteUserTaskModal modal={taskModal} toggle={toggleTask} user={user}/>
        </Card>
    );
};
UserCard.propTypes = {
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
    })
};

export default UserCard;
