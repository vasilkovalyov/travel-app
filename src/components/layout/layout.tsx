import { Outlet } from 'react-router-dom';
import cn from 'classnames';
import TopSearch from '@/blocks/top-search/top-search';

import './layout.scss';

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
