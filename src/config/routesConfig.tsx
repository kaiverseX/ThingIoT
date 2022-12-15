import {lazy} from 'react';
import {RouteObject} from 'react-router-dom';
import {Path} from './path';

const PrivateOutlet = lazy(() => import('~/outlet/PrivateOutlet'));
const Homepage = lazy(() => import('~/pages/Homepage'));
const NotFound = lazy(() => import('~/pages/NotFound'));
const Login = lazy(() => import('~/pages/Login'));

const routesConfig: RouteObject[] = [
  {
    path: Path.LOGIN,
    element: <Login />,
  },
  {
    path: Path.HOMEPAGE,
    element: <PrivateOutlet />,
    children: [
      {
        element: <Homepage />,
        index: true,
      },
      {
        path: Path.UNDEFINED,
        element: <NotFound />,
      },
    ],
  },
];

export default routesConfig;
