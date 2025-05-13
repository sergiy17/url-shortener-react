import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreatePage from './components/CreatePage';
import ShowPage from './components/ShowPage';
import LinksPage from './components/LinksPage';
import './index.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<CreatePage />} />
                <Route path='/links' element={<LinksPage />} />
                <Route path='/links/:slug' element={<ShowPage />} />
            </Routes>
        </Router>
    );
}

export default App;