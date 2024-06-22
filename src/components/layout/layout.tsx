import { Outlet } from 'react-router-dom';
import cn from 'classnames';

import './layout.scss';

function Layout() {
  return (
    <div className={cn('app')}>
      <main className="main">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
