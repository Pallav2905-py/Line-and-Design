import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('https://line-and-design.onrender.com/projects');
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projeacts:', error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`https://line-and-design.onrender.com/projects/${id}`, { status });
      fetchProjects();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const deleteProject = async (id) => {
    try {
      await axios.delete(`https://line-and-design.onrender.com/projects/${id}`);
      fetchProjects();
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  return (
    <div>
      <h3>Project List</h3>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <p>{project.projectName} ({project.status})</p>
            <button onClick={() => updateStatus(project.id, 'Running')}>Mark as Running</button>
            <button onClick={() => updateStatus(project.id, 'Complete')}>Mark as Complete</button>
            <button onClick={() => deleteProject(project.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;
