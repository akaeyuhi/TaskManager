import React, {useCallback, useState} from 'react';
import {Button, Card, CardBody, CardText, CardTitle} from 'reactstrap';
import PropTypes from 'prop-types';
import EditUserModal from '../Modals/Edit/EditUserModal';

const ProjectUserCard = ({user, callback}) => {
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
                    {user.task !== null ?
                        `Current task: ${user.task.name}`
                        : 'User has no task'}

                </CardText>
                <div className="d-flex justify-content-between">
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
ProjectUserCard.propTypes = {
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

export default ProjectUserCard;
