import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

import { useMainNavigationStore } from '@/store';

import { Button, IconEnum } from '@/components/ui';
import { MainMenu, ModalAside, ModalHeader, ModalContent } from '@/components';

import { Pages } from '@/constants/pages';
import { breakpoints } from '@/constants/breakpoints';

import './header.scss';

export default function Header() {
  const { menuTitle, activeSubmenus, backMenu } = useMainNavigationStore();

  const [openMenu, setOpenMenu] = useState<boolean>(false);

  const isTabletMd = useMediaQuery({
    query: `(min-width: ${breakpoints.tablet}px)`,
  });

  return (
    <header className="header">
      <div className="header__container container">
        <Link to={Pages.HOME} className="header__logo">
          {isTabletMd ? (
            <img src="/images/logo.svg" alt="travel republic" />
          ) : (
            <img src="/images/logo-mobile.svg" alt="travel republic" />
          )}
        </Link>
        <div className="header__tools">
          <Button
            view="transparent"
            className="header__menu-toggler"
            icon={IconEnum.BURGER}
            iconSize={24}
            onClick={() => setOpenMenu(true)}
          />
        </div>
      </div>
      <ModalAside
        id="side-modal-menu"
        open={openMenu}
        position="right"
        onClose={() => {
          setOpenMenu(false);
        }}
      >
        <ModalHeader title={menuTitle}>
          {Object.keys(activeSubmenus).length ? (
            <Button
              icon={IconEnum.ARROW_LEFT}
              iconSize={24}
              view="transparent"
              onClick={backMenu}
            ></Button>
          ) : null}
        </ModalHeader>
        <ModalContent>
          <MainMenu />
        </ModalContent>
      </ModalAside>
    </header>
  );
}
