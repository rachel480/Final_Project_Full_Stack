import '../App.css'
import {BrowserRouter as Router} from 'react-router-dom'
import AppRoutes from '../routes/appRoutes'
import GlobalToast from '../components/globalToast';

function App() {
  return (
    <Router>
      <AppRoutes/>
      <GlobalToast/>
    </Router>
  );
}

export default App;
