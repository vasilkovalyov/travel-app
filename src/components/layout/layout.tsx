import { Outlet } from 'react-router-dom';
import cn from 'classnames';
import { Header } from '@/blocks';

import './layout.scss';

function Layout() {
  return (
    <div className={cn('app')}>
      <Header />
      <main className="main">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
