import cn from 'classnames';
import { Link } from 'react-router-dom';

import { useMainNavigationStore } from '@/store';

import { Icon, IconEnum } from '../ui';

import { MenuItemProps, SubMenuProps } from './main-menu.type';

import menu from '@/assets/data/menu.json';

import './main-menu.scss';

export default function MainMenu() {
  const { activeSubmenus, updateMenuTitle, updateSubmenus } =
    useMainNavigationStore();

  function MenuItem({
    id,
    title,
    prevTitle,
    href,
    children,
    level,
  }: MenuItemProps) {
    const renderTitle = () => (
      <div data-content="true" className="main-menu__title-text">
        {title}
      </div>
    );

    const isExpandedDataAttrValue = activeSubmenus[level]
      ? activeSubmenus[level].key === id
      : false;

    const SubMenu = ({ title, children }: SubMenuProps) => {
      return (
        <div
          className={cn('main-menu__submenu-container', {
            active: isExpandedDataAttrValue,
          })}
        >
          <ul
            className="main-menu__list"
            aria-label={title}
            aria-expanded={isExpandedDataAttrValue ? 'true' : 'false'}
          >
            {children.map((item) => (
              <MenuItem
                key={item.id}
                {...item}
                level={level + 1}
                prevTitle={level + 1 >= 2 ? title : null}
              />
            ))}
          </ul>
        </div>
      );
    };

    const onHandleMenuClick = () => {
      updateSubmenus(level, id, prevTitle);
      updateMenuTitle(title);
    };

    return (
      <li key={id} className="main-menu__item">
        {children && children.length ? (
          <>
            <div
              role="menuitem"
              tabIndex={0}
              data-option="true"
              data-default-gutters="true"
              aria-haspopup="true"
              aria-expanded={isExpandedDataAttrValue ? 'true' : 'false'}
              className="main-menu__title"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  onHandleMenuClick();
                }
              }}
              onClick={() => {
                onHandleMenuClick();
              }}
            >
              {renderTitle()}
              <Icon
                icon={IconEnum.CHEVRON_RIGHT}
                size={20}
                className="main-menu__icon"
              />
            </div>
            <SubMenu title={title} children={children} />
          </>
        ) : (
          <>
            {href ? (
              <Link
                to={href}
                tabIndex={0}
                role="menuitem"
                data-option="true"
                data-default-gutters="true"
                className="main-menu__title"
              >
                {renderTitle()}
              </Link>
            ) : (
              <div
                role="menuitem"
                data-option="true"
                data-default-gutters="true"
                className="main-menu__title"
              >
                {renderTitle()}
              </div>
            )}
          </>
        )}
      </li>
    );
  }

  return (
    <nav className="main-menu">
      <ul
        role="menu"
        aria-label="Main menu"
        className="main-menu__list"
        style={{
          transform: `translate3d(${Object.keys(activeSubmenus).length * -100}%, 0px, 0px)`,
        }}
      >
        {menu.items.map((item) => {
          return <MenuItem key={item.id} {...item} level={1} />;
        })}
      </ul>
    </nav>
  );
}
