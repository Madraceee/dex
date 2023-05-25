import { useContext } from 'react';
import {GlobalContext} from "./contexts/GLobalContext";
import Nav from './components/Nav';
import './App.css';
import Dialog from './components/Dialog';
import WalletModal from './components/WalletModal';
import Loader from './components/Loader';
import Home from './components/Home';
import SelectModal from './components/SelectModal';

const App = ()=> {
  return (
    <div className="App bg-slate-800 h-screen">
      <Nav />
      <Home />
    </div>
  );
}

export default App;
