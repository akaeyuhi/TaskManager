import React, {createContext, useCallback, useEffect, useState} from 'react';
import {Alert, Button, Spinner} from 'reactstrap';
import UserCard from '../components/Cards/UserCard';
import CreateUserModal from '../components/Modals/CreateUserModal';

export const UsersContext = createContext(null);

const Users = () => {
    const [users, setUsers] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modal, setModal] = useState(false);

    const toggleModal = useCallback(() => setModal(prevState => !prevState), [modal]);
    const fetchData = async () => {
        try {
            const response = await fetch('api/User/');
            const json = await response.json();
            setUsers(json);
            setLoading(false);
        } catch (e) {
            setLoading(false);
            setError(e);
        }
    };

    useEffect(() => {
        fetchData().then();
    }, []);

    if(loading) return <Spinner />;
    else if(error) return <Alert color="danger">{error}</Alert>;
    else return (
        <UsersContext.Provider value={{users, setUsers}}>
            <div className="container">
                <div className="d-flex justify-content-between mb-2">
                    <h2 className="mt-2">Users page</h2>
                    <Button color="warning" className="h-75" onClick={toggleModal}>
                        Create user
                    </Button>
                </div>
                <div className="flex mt-6">
                    {users.length ?
                        users.map((user, idx) => <UserCard key={idx} user={user} />) :
                        <Alert color="primary">
                            No users yet...
                        </Alert>
                    }
                </div>
                <CreateUserModal modal={modal} toggle={toggleModal}/>
            </div>
        </UsersContext.Provider>

    );
};

export default Users;
