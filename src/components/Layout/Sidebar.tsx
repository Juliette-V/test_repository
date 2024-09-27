import classNames from 'classnames';
import { MENU } from '../../constants/menu';

export const Sidebar = () => {
  return (
    <nav className="sidebar">
      <div className="nav__home">
        <img src="Logo.svg" alt="logo" />
      </div>
      <ul className="nav-list">
        {MENU.map(({ text, Icon }) => (
          <li className={classNames({ active: text === 'Calendar' })}>
            <Icon />
            {text}
          </li>
        ))}
      </ul>
    </nav>
  );
};
