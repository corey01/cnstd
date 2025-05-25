import './App.css'
import PasswordFormPage from './pages/PasswordFormPage';
import { usePassword } from './hooks/usePassword';
import PhysicalPage from './pages/Physical';
import VirtualPage from './pages/Virtual';



function App() {
  const { passwordEntered, handleSubmit, pageToShow } = usePassword();

  return !passwordEntered ? <PasswordFormPage handleSubmit={handleSubmit} /> : pageToShow === "Physical" ? <PhysicalPage /> : <VirtualPage />;
}

export default App
