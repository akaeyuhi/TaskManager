import React, {useState} from 'react';
import {Alert, Spinner} from 'reactstrap';
import ProjectCard from '../components/Projects/ProjectCard';
import {useFetch} from '../Utils/hooks/fetch.hook';

const Projects = () => {
    const [projects, setProjects] = useState(null);
    const { response, error } = useFetch('api/Project/');
    if(!response) return <Spinner />;
    else if(error) return console.error(error);
    setProjects(response);

    return (
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
