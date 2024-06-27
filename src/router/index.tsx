import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { HomePage, UiPage } from '@/pages';

import { Pages } from '@/constants/pages';
import { Layout } from '@/components';

const router = createBrowserRouter([
  {
    path: Pages.HOME,
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
  {
    path: Pages.UI,
    element: <UiPage />,
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
