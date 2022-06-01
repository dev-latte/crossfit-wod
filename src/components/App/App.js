import CreateWodCard from '../../feature/CreateWodCard';
import MyWod from '../../pages/MyWod';
import './App.css';

function App() {
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
      {/* <MyWod></MyWod> */}
      <CreateWodCard></CreateWodCard>
    </div>
  );
}

export default App;
