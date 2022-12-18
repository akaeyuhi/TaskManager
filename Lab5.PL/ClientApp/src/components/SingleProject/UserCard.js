import React from 'react';
import {Button, Card, CardBody, CardLink, CardText, CardTitle} from 'reactstrap';
import PropTypes from 'prop-types';

const UserCard = ({ user }) => {
    return (
        <Card>
            <CardBody>
                <CardTitle tag="h5">
                    {user.name}
                </CardTitle>
                <CardText>
                    Busyness: {user.busyness}
                </CardText>
                <CardText>
                    <CardLink href={`task/${user.task.id}`}>
                        Current task: {user.task.name}
                    </CardLink>
                </CardText>
                <CardLink href={`user/${user.id}`}>
                    <Button color="primary">
                        To user
                    </Button>
                </CardLink>
            </CardBody>
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
