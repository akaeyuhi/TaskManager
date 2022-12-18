import React from 'react';
import PropTypes from 'prop-types';
import {Button, Card, CardBody, CardLink, CardText, CardTitle} from 'reactstrap';

const ProjectCard = ({project})=> {
    return (
        <Card
            style={{
                width: '18rem'
            }}
        >
            <CardBody>
                <CardTitle tag="h5">
                    {project.projectName}
                </CardTitle>
                <CardText>
                Total users: {project.users.length}
                </CardText>
                <CardText>
                Total tasks: {project.tasks.length}
                </CardText>
                <CardLink href={`project/${project.id}`} className="primary">
                    <Button color="primary">
                        To project
                    </Button>
                </CardLink>
            </CardBody>
        </Card>
    );
};

ProjectCard.propTypes = {
    project: {
        id: PropTypes.number,
        projectName: PropTypes.string,
        users: PropTypes.array,
        tasks: PropTypes.array
    }
};

export default ProjectCard;
