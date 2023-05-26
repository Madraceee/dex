import Nav from './components/Nav';
import './App.css';

import Home from './components/Home';


const App = ()=> {
  return (
    <div className="App bg-slate-800 h-screen font-primary">
      <Nav />
      <Home />
    </div>
  );
}

export default App;
