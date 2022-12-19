import React, {useEffect, useState} from 'react';
import {Alert, Spinner} from 'reactstrap';
import ProjectCard from '../components/Projects/ProjectCard';

const Projects = () => {
    const [projects, setProjects] = useState(null);
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
        <>
            {projects === null ? <Spinner /> :
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
            }
        </>


    );
};

export default Projects;
