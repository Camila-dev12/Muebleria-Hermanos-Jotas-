import './App.css';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar cartCount={0} />
      <main className="App__content">
        <h1>Mueblería Hermanos Jota</h1>
        <p>Frontend React en construcción.</p>
      </main>
    </div>
  );
}

export default App;
