import './App.css'
import SaveTheDate from './components/SaveTheData/SaveTheDate'
import PasswordForm from './components/PasswordForm';
import { usePassword } from './hooks/usePassword';



function App() {
  const { passwordEntered, handleSubmit } = usePassword();

  return passwordEntered ? <SaveTheDate /> : <PasswordForm handleSubmit={handleSubmit} />
}

export default App
