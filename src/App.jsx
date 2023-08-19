import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './styles/App.css';
import './styles/utilities.css'
import './styles/utilities2.css'
import Authentication from './components/pages/Authentication';
import Landing from './components/pages/Landing';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route index element={<Authentication />} />
      <Route path='/landing' element={<Landing />} />
      </Routes>
      </BrowserRouter>
  );
}

export default App;
