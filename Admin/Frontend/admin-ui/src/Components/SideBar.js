import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div style={styles.sidebar}>
      <h3>Admin Dashboard</h3>
      <ul style={styles.menu}>
        <li><Link to="/manage-projects">Manage Projects</Link></li>
        <li><Link to="/manage-employees">Manage Employee & Labour</Link></li>
        <li><Link to="/advertisement">Advertisement</Link></li>
        <li><Link to="/customer-support">Customer Support</Link></li>
      </ul>
    </div>
  );
};

const styles = {
  sidebar: {
    width: '200px',
    height: '100vh',
    backgroundColor: '#333',
    color: '#fff',
    padding: '20px',
  },
  menu: {
    listStyle: 'none',
    padding: '0',
  },
  menuItem: {
    margin: '10px 0',
  },
};

export default Sidebar;
