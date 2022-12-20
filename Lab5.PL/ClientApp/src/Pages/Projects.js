import React, {useEffect, useState} from 'react';
import {Alert, Spinner} from 'reactstrap';
import ProjectCard from '../components/Projects/ProjectCard';
const Projects = () => {
    const [projects, setProjects] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
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
        <div className="container">
            <h1>Projects page</h1>
            <div className="flex mt-6">
                {projects.length ?
                    projects.map((project, idx) => <ProjectCard key={idx} project={project} />) :
                    <Alert color="primary">
                                No projects yet...
                    </Alert>
                }
            </div>
        </div>
    );
};

export default Projects;
