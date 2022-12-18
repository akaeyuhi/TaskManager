import React, {useEffect, useState} from 'react';
import Project from '../components/Projects/ProjectCard';
import {Alert} from 'reactstrap';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const fetchData = async () => {
        try {
            const result = await fetch('api/Project');
            setProjects(await result.json());
            console.log(projects);
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        fetchData().then();
    }, []);

    return (
        <div className="container">
            <h1>Projects page</h1>
            <div className="flex mt-6">
                {projects.length ?
                    projects.map((project, idx) => <Project key={idx} project={project} />) :
                    <Alert color="primary">
                        No projects yet...
                    </Alert>
                }
            </div>
        </div>
    );
};

export default Projects;
