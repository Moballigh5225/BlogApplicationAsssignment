import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BlogDetails from "./components/BlogDetails";
import BlogList from "./components/BlogList";

function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<BlogList />} />
          <Route path="/blog/:blogId" element={<BlogDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
