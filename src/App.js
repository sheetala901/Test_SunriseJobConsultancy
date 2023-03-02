import './App.css';
import Employee from './Employees';
import { Routes, Route } from 'react-router-dom';

function App() {  
  return (
    <Routes>
      <Route path="" element={<Employee />} />
    </Routes>
  );
}

export default App;
