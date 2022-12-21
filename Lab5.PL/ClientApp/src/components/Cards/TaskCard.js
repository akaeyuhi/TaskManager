import React, {useCallback, useState} from 'react';
import PropTypes from 'prop-types';
import {Button, Card, CardBody, CardSubtitle, CardText, CardTitle} from 'reactstrap';
import {Link} from 'react-router-dom';
import DeleteTaskModal from '../Modals/Delete/DeleteTaskModal';

function TaskCard({ task }) {
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
                <CardText>
                    {task.projectId ? <Link to={`project/${task.projectId}`}>To project</Link> : <></>}
                </CardText>
                <Button color="danger" onClick={() => toggle()}>
                    Delete
                </Button>
            </CardBody>
            <DeleteTaskModal modal={modal} task={task} toggle={toggle}/>
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
        projectId: PropTypes.number
    }).isRequired,
};

export default TaskCard;
