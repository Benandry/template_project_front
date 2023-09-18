import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, Login, Register, EditUserPage } from "./pages";
import "./main.css";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/home" Component={Home} />
        <Route path="/login" Component={Login} />
        <Route path="/register/" Component={Register} />
        <Route path="/edit/:id" Component={EditUserPage} />
      </Routes>
    </Router>
  );
};

export default App;
