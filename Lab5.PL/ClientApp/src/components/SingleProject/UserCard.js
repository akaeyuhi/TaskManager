import React, {useCallback, useState} from 'react';
import {Button, Card, CardBody, CardLink, CardText, CardTitle} from 'reactstrap';
import PropTypes from 'prop-types';
import EditUserModal from './EditUserModal';

const UserCard = ({ user, callback }) => {
    const [modal, setModal] = useState(false);
    const toggle = useCallback(() => setModal(prev => !prev), [modal]);
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
                    {user.task !== null ? <CardLink href={`task/${user.task.id}`}>
                        Current task: {user.task.name}
                    </CardLink> : 'User has no task'}

                </CardText>
                <div className="d-flex justify-content-between">
                    <CardLink href={`user/${user.id}`}>
                        <Button color="primary">
                                To user
                        </Button>
                    </CardLink>
                    <Button color="info" onClick={() => toggle()}>
                        Edit user
                    </Button>
                    <Button color="danger" onClick={() => callback('user', user.id)}>
                        Delete
                    </Button>
                </div>

            </CardBody>
            <EditUserModal toggle={toggle} modal={modal} currentUser={user}/>
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
    }),
    callback: PropTypes.func.isRequired
};

export default UserCard;
