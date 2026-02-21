import './App.css'
import PasswordFormPage from './pages/PasswordFormPage';
import { usePassword } from './hooks/usePassword';
import PhysicalPage from './pages/Physical';
import VirtualPage from './pages/Virtual';
import { Helmet } from 'react-helmet';



function App() {
  const { passwordEntered, handleSubmit, pageToShow } = usePassword();

  return (
    <>
      <Helmet>
        <title>{passwordEntered ? "Norma and Corey's Wedding" : 'Welcome'}</title>
      </Helmet>
      {!passwordEntered ? (
        <PasswordFormPage handleSubmit={handleSubmit} />
      ) : pageToShow === 'Physical' ? (
        <PhysicalPage />
      ) : (
        <VirtualPage />
      )}
    </>
  );
}

export default App
