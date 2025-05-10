import { useEffect, useState } from "react";

const Date = "21June2026"

export const usePassword = () => {
    const [passwordEntered, setPasswordEntered] = useState(false);
  
    useEffect(() => {
      if (window.localStorage.getItem('password') === Date) {
        setPasswordEntered(true);
      } else {
        if(window.location.search === `?password=${Date}`) {
          window.localStorage.setItem('password', Date);
          setPasswordEntered(true);
          return;
        }
  
        setPasswordEntered(false);
      }
    }, []);
  
    const handleSubmit = (password: string) => {
      if(password === Date) {
        window.localStorage.setItem('password', password);
        setPasswordEntered(true);
      }
    };
  

    return {
        passwordEntered,
        handleSubmit
    }
}