import React, {createContext, useCallback, useEffect, useState} from 'react';
import {Alert, Button, Spinner} from 'reactstrap';
import ProjectCard from '../components/Cards/ProjectCard';
import CreateProjectModal from '../components/Modals/Create/CreateProjectModal';

export const ProjectsContext = createContext(null);


const Projects = () => {
    const [projects, setProjects] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modal, setModal] = useState(false);
    const toggle = useCallback(() => setModal(prevState => !prevState), [modal]);

    const fetchData = async () => {
        try {
            const response = await fetch('api/Project/');
            const json = await response.json();
            setProjects(json);
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
        <ProjectsContext.Provider value={{projects, setProjects}}>
            <div className="container">
                <div className="d-flex justify-content-between">
                    <h1>Projects page</h1>
                    <Button color="warning" className="h-75" onClick={toggle}>
                        Create new project
                    </Button>
                </div>
                <div className="card-container mt-6">
                    {projects.length ?
                        projects.map((project, idx) => <ProjectCard key={idx} project={project} />) :
                        <Alert color="primary">
                                No projects yet...
                        </Alert>
                    }
                </div>
            </div>
            <CreateProjectModal modal={modal} toggle={toggle}/>
        </ProjectsContext.Provider>
    );
};

export default Projects;
