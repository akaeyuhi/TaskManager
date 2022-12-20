import React, {useCallback, useState} from 'react';
import PropTypes from 'prop-types';
import {Button, Card, CardBody, CardSubtitle, CardText, CardTitle} from 'reactstrap';
import EditTaskModal from './Modals/EditTaskModal';

function TaskCard({ task, callback }) {
    const [modal, setModal] = useState(false);
    const toggle = useCallback(() => setModal(prev => !prev), [modal]);
    return (
        <Card
            style={{
                width: '18rem'
            }}
        >
            <CardBody>
                <CardTitle tag="h5">
                    {task.name}
                </CardTitle>
                <CardSubtitle
                    className="mb-2 text-muted"
                    tag="h6"
                >
                    {task.status}
                </CardSubtitle>
                <CardText color="info">
                    Priority: {task.priority ? 'Yes' : 'No'}
                </CardText>
                <CardText>
                    {task.description}
                </CardText>
                <div className="d-flex justify-content-between">
                    <Button color="info" onClick={() => toggle()}>
                        Edit task
                    </Button>
                    <Button color="danger" onClick={() => callback('task', task.id)}>
                        Delete
                    </Button>
                </div>
            </CardBody>
            <EditTaskModal task={task} modal={modal} toggle={toggle} />
        </Card>
    );
}

TaskCard.propTypes = {
    task: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        description: PropTypes.string,
        priority: PropTypes.bool,
        status: PropTypes.string,
    }).isRequired,
    callback: PropTypes.func.isRequired
};

export default TaskCard;
