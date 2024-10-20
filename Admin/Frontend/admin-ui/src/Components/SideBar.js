import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';  // Ensure Bootstrap is imported

const Sidebar = () => {
  return (
    <div className="d-flex flex-column vh-100 bg-success text-white p-3">
      <h3 className="mb-4">Admin Dashboard</h3>
      <ul className="nav flex-column">
        <li className="nav-item mb-2">
          <Link to="/manage-projects" className="nav-link text-white">Manage Projects</Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="/manage-employees" className="nav-link text-white">Manage Employee & Labour</Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="/advertisement" className="nav-link text-white">Advertisement</Link>
        </li>
        <li className="nav-item">
          <Link to="/customer-support" className="nav-link text-white">Customer Support</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
