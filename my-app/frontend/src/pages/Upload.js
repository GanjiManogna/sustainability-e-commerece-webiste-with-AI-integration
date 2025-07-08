import React, { useState } from 'react';
import './Upload.css';

const Upload = () => {
  const [project, setProject] = useState({
    title: '',
    category: '',
    description: '',
    image: null,
    githubUrl: '',
    liveUrl: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject({
      ...project,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Convert image to base64
      const reader = new FileReader();
      reader.onloadend = () => {
        setProject((prev) => ({
          ...prev,
          image: reader.result, // base64 string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, category, description, image } = project;

    if (!title || !category || !description || !image) {
      alert('Please fill in all required fields and upload an image.');
      return;
    }

    // Get existing projects from localStorage
    const existingProjects = JSON.parse(localStorage.getItem("projects")) || [];

    // Add unique ID to the project
    const newProject = {
      ...project,
      id: Date.now(), // Simple way to generate unique ID
    };

    // Save new project
    const updatedProjects = [...existingProjects, newProject];
    localStorage.setItem("projects", JSON.stringify(updatedProjects));

    alert('Project submitted successfully!');

    // Reset form
    setProject({
      title: '',
      category: '',
      description: '',
      image: null,
      githubUrl: '',
      liveUrl: ''
    });
  };

  return (
    <div className="upload-page">
      <h1>Upload Your Project</h1>
      <form onSubmit={handleSubmit} className="upload-form">
        <div className="form-group">
          <label>Project Title</label>
          <input
            type="text"
            name="title"
            value={project.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Category</label>
          <select
            name="category"
            value={project.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            <option value="Web Development">Web Development</option>
            <option value="Mobile Development">Mobile Development</option>
            <option value="Data Science">Data Science</option>
            <option value="Machine Learning">Machine Learning</option>
            <option value="UI/UX Design">UI/UX Design</option>
            <option value="Game Development">Game Development</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={project.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label>Project Image</label>
          <input
            type="file"
            name="image"
            onChange={handleFileChange}
            accept="image/*"
            required
          />
        </div>
        <div className="form-group">
          <label>GitHub URL (Optional)</label>
          <input
            type="url"
            name="githubUrl"
            value={project.githubUrl}
            onChange={handleChange}
            placeholder="https://github.com/username/repository"
          />
        </div>
        <div className="form-group">
          <label>Live Project URL (Optional)</label>
          <input
            type="url"
            name="liveUrl"
            value={project.liveUrl}
            onChange={handleChange}
            placeholder="https://your-project-url.com"
          />
        </div>
        <button type="submit">Submit Project</button>
      </form>
    </div>
  );
};

export default Upload;
