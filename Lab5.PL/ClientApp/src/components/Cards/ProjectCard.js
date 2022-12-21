import React, {useCallback, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {Button, Card, CardBody, CardText, CardTitle, Form, Input} from 'reactstrap';
import {Link} from 'react-router-dom';
import DeleteProjectModal from '../Modals/Delete/DeleteProjectModal';

const ProjectCard = ({project}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [modal, setModal] = useState(false);
    const toggle = useCallback(
        () => setModal(prevState => !prevState),
        [modal],
    );

    const [projectName, setProjectName] = useState(project.projectName);
    const form = useRef(null);

    const onKeyPressHandler = (event) => {
        if(event.key === 'Enter') form.current.submit();
    };

    const submitHandler = async (event) => {
        event.preventDefault();
        try {
            await fetch(`api/Project/${project.id}`, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({projectName})
            });
            setIsEditing(false);
        } catch(e) {
            console.error(e);
        }
    };

    return (
        <Card
            style={{
                width: '18rem'
            }}
        >
            <CardBody>
                <CardTitle tag="h5">
                    {
                        isEditing ? <Form
                            onKeyDown={() => onKeyPressHandler()}
                            onSubmit={async (event) => await submitHandler(event)}
                            ref={form}>
                            <Input
                                id="name"
                                name="projectName"
                                type="text"
                                defaultValue={projectName}
                                onChange={(event) => setProjectName(event.target.value)}/>
                        </Form> : <>{projectName}</>
                    }
                    <button style={{
                        display: 'inline',
                        background: 'none',
                        border: 'none',
                        color: 'primary'
                    }} onClick={() => setIsEditing(prevState => !prevState)}>Edit</button>

                </CardTitle>
                <CardText>
                Total users: {project.users.length}
                </CardText>
                <CardText>
                Total tasks: {project.tasks.length}
                </CardText>
                <div className="d-flex justify-content-between">
                    <Link to={`../project/${project.id}`} className="primary">
                        <Button color="primary">
                            To project
                        </Button>
                    </Link>
                    <Button color="danger" onClick={() => toggle()}>
                        Delete
                    </Button>
                </div>
                <DeleteProjectModal modal={modal} toggle={toggle} project={project}/>
            </CardBody>
        </Card>
    );
};

ProjectCard.propTypes = {
    project: PropTypes.shape({
        id: PropTypes.number,
        projectName: PropTypes.string,
        users: PropTypes.array,
        tasks: PropTypes.array
    }).isRequired
};

export default ProjectCard;

