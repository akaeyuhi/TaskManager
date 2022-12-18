import React from 'react';
import PropTypes from 'prop-types';
import {Button, Card, CardBody, CardLink, CardSubtitle, CardText, CardTitle} from 'reactstrap';

function TaskCard({task}) {
    console.log(task);
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
                <CardLink href={`task/${task.id}`} className="primary">
                    <Button color="primary">
                        To task
                    </Button>
                </CardLink>
            </CardBody>
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
    })
};

export default TaskCard;
