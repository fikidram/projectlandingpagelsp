import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LSPWebsite from '/components/LSPWebsite';
import SchemeDetail from '/components/SchemeDetail';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LSPWebsite />} />
          <Route path="/skema/:id" element={<SchemeDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;