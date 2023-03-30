import './App.css';
import CreateResorce from './components/createResorce';
import { BrowserRouter as Router, Route , Routes} from "react-router-dom"
import ResorceList from './components/ResorceList';

function App() {
  return (
    <div className="App">

      <Router>
        <Routes>

        <Route exact path="/" element={<CreateResorce />} /> 
          <Route exact path="/resorce" element={<ResorceList />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
