import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './Components/SideBar';
import ManageProjects from './Components/ManageProjects';
import ManageEmployees from './Components/ManageEmployees';
import Advertisement from './Components/Advertisement';
import CustomerSupport from './Components/CustomerSupport';

const App = () => {
  return (
    <Router>
      <div style={styles.container}>
        <Sidebar /> {/* Sidebar for navigation */}
        <div style={styles.content}>
          <Routes>
            <Route path="/manage-projects" element={<ManageProjects />} />
            <Route path="/manage-employees" element={<ManageEmployees />} />
            <Route path="/advertisement" element={<Advertisement />} />
            <Route path="/customer-support" element={<CustomerSupport />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

const styles = {
  container: {
    display: 'flex',
  },
  content: {
    marginLeft: '200px',
    padding: '20px',
    width: '100%',
  },
};

export default App;
