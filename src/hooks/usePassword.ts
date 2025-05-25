import { useEffect, useState } from "react";

const PASSWORDS = {
  PHYSICAL: "21June2026",
  VIRTUAL: "Junio 21 2026"
} as const;

type ValidPassword = typeof PASSWORDS[keyof typeof PASSWORDS];

const isValidPassword = (password: string | null): password is ValidPassword => {
  return typeof password === 'string' && Object.values(PASSWORDS).includes(password as ValidPassword);
};

export const usePassword = () => {
  const [passwordEntered, setPasswordEntered] = useState('');

  useEffect(() => {
    const storedPassword = window.localStorage.getItem('password');
    const urlPassword = new URLSearchParams(window.location.search).get('password');

    if (isValidPassword(storedPassword)) {
      setPasswordEntered(storedPassword);
      return;
    }

    if (isValidPassword(urlPassword)) {
      window.localStorage.setItem('password', urlPassword);
      setPasswordEntered(urlPassword);
      return;
    }

    setPasswordEntered('');
  }, []);

  const handleSubmit = (password: string) => {
    console.log('isValidPassword', isValidPassword(password));
    if (isValidPassword(password)) {
      window.localStorage.setItem('password', password);
      setPasswordEntered(password);
    }
  };

  return {
    passwordEntered,
    handleSubmit,
    pageToShow: passwordEntered === PASSWORDS.PHYSICAL ? 'Physical' : 'Virtual',
  }
}