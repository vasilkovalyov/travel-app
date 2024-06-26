import { Outlet } from 'react-router-dom';
import cn from 'classnames';

import './layout.scss';
import TopSearch from '@/blocks/top-search/top-search';

function Layout() {
  return (
    <div className={cn('app')}>
      <header className="header">
        <TopSearch />
      </header>
      <main className="main">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
