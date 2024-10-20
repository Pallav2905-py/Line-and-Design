import React, { useState } from 'react';
import axios from 'axios';

const ProjectForm = ({ onProjectAdded }) => {
  const [formData, setFormData] = useState({
    projectName: '',
    status: 'Upcoming',
    startDate: '',
    endDate: '',
    location: '',
    category: '',
  });
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Grab the image file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataObj = new FormData();
    formDataObj.append('projectName', formData.projectName);
    formDataObj.append('status', formData.status);
    formDataObj.append('startDate', formData.startDate);
    formDataObj.append('endDate', formData.endDate);
    formDataObj.append('location', formData.location);
    formDataObj.append('category', formData.category);
    if (image) {
      formDataObj.append('image', image); // Append image to the FormData object
    }

    try {
      await axios.post('https://line-and-design.onrender.com/projects', formDataObj, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      onProjectAdded();
      setFormData({
        projectName: '',
        status: 'Upcoming',
        startDate: '',
        endDate: '',
        location: '',
        category: '',
      });
      setImage(null);
    } catch (error) {
      console.error('Error adding project:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="projectName" placeholder="Project Name" value={formData.projectName} onChange={handleChange} />
      <select name="status" value={formData.status} onChange={handleChange}>
        <option value="Upcoming">Upcoming</option>
        <option value="Running">Running</option>
        <option value="Complete">Complete</option>
      </select>
      <input name="startDate" type="date" value={formData.startDate} onChange={handleChange} />
      <input name="endDate" type="date" value={formData.endDate} onChange={handleChange} />
      <input name="location" placeholder="Location" value={formData.location} onChange={handleChange} />
      <input name="category" placeholder="Category" value={formData.category} onChange={handleChange} />
      <input type="file" accept="image/*" onChange={handleImageChange} /> {/* Image Input */}
      <button type="submit">Add Project</button>
    </form>
  );
};

export default ProjectForm;
