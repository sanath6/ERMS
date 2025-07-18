import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ManagerPanel from './components/ManagerPanel';
import AssignEngineers from './components/Assign';
import CreateProjects from './components/Projects';
import Assignments from './components/Assignments';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/manager-panel" element={<ManagerPanel />} />
        <Route path="/assign-engineers" element={<AssignEngineers />} />
        <Route path="/projects" element={<CreateProjects />} />
        <Route path="/assignments" element={<Assignments />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
