import CreateWodCard from '../../feature/CreateWodCard';
import './App.css';

const App = () => {
  return (
    <div className="App">
      {/* <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <CreateWodCard></CreateWodCard>
    </div>
  );
}

export default App;
