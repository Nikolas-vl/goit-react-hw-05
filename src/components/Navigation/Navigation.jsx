import { NavLink } from 'react-router-dom';
import s from './Navigation.module.css';
import { clsx } from 'clsx';

const Navigation = () => {
  const buildLinkClass = ({ isActive }) => {
    return clsx(s.link, isActive && s.active);
  };

  return (
    <div>
      <nav className={s.navigation}>
        <NavLink className={buildLinkClass} to={'/'}>
          Home
        </NavLink>
        <NavLink className={buildLinkClass} to={'/movies'}>
          Movies
        </NavLink>
      </nav>
    </div>
  );
};

export default Navigation;
