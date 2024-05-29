import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Rutas from './routes';
//import Screen from './screen';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Rutas/>
      </div>
    </BrowserRouter>
  );
}

export default App;
