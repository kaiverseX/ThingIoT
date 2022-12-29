import {lazy} from 'react';
import {RouteObject} from 'react-router-dom';
import {Path} from './path';

const PrivateOutlet = lazy(() => import('~/outlet/PrivateOutlet'));
const Homepage = lazy(() => import('~/pages/Homepage'));
const Device = lazy(() => import('~/pages/Device'));
const Setting = lazy(() => import('~/pages/Setting'));
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
        index: true,
        element: <Homepage />,
      },
      {
        path: Path.Device,
        element: <Device />,
      },
      {
        path: Path.SETTING,
        element: <Setting />,
      },
      {
        path: Path.UNDEFINED,
        element: <NotFound />,
      },
    ],
  },
];

export default routesConfig;
