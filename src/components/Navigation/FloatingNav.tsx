import { useEffect, useState } from 'react';
import style from './FloatingNav.module.scss';

type NavItem = {
  id: string;
  label: string;
};

const navItems: NavItem[] = [
  { id: 'home', label: 'Home' },
  { id: 'our-wedding', label: 'Our Wedding' },
  { id: 'dress-code', label: 'Dress Code' },
  { id: 'order-of-day', label: 'Order of the Day' },
  { id: 'accommodation', label: 'Accommodation' },
  { id: 'travel', label: 'Travel' },
  { id: 'menu', label: 'Menu' },
  { id: 'gifts', label: 'Gifts' },
  { id: 'faq', label: 'FAQ & Notes' },
  { id: 'rsvp-section', label: 'RSVP' },
];

const FloatingNav = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const handleNavigate = (id: string) => {
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setOpen(false);
      return;
    }

    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setOpen(false);
  };

  return (
    <>
      <button
        type="button"
        className={`${style.toggle} ${open ? style.open : ''}`}
        aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        <span className={style.toggleLine} />
        <span className={style.toggleLine} />
        <span className={style.toggleLine} />
      </button>

      {open && (
        <div className={style.overlay} onClick={() => setOpen(false)}>
          <nav
            className={style.panel}
            aria-label="Page sections"
            onClick={(event) => event.stopPropagation()}
          >
            {navItems.map((item) => (
              <button
                type="button"
                key={item.id}
                className={style.linkButton}
                onClick={() => handleNavigate(item.id)}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </>
  );
};

export default FloatingNav;
