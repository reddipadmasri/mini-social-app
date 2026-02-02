import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import Social from './Social';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />       {/* default page */}
        <Route path="/signup" element={<Signup />} /> {/* signup page */}
        <Route path="/social" element={<Social />} /> {/* social page */}
      </Routes>
    </Router>
  );
}

export default App;
