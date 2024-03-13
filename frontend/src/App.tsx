import React from 'react';
import './App.css';
import Header from './Header';
import BowlerList from './Bowlers/BowlerList';

function App() {
  return (
    <div className="App">
      <Header title="Full Stack React & ASP.NET" />
      <BowlerList />
    </div>
  );
}

export default App;
