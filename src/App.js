import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import './App.scss';

const code = new URLSearchParams(window.location.search).get('code');

const App = () => {
  return code ? <Dashboard code={code} /> : <Login />;
};

export default App;
