import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//

import Login from './pages/Login';
import NotFound from './pages/Page404';
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
import ServerList from './pages/ServerList';
import AllApps from './pages/AllApps';
import AddNewServer from './pages/AddNewServer';
import AddNewApp from './pages/AddNewApp';
import EditAppInfo from './pages/EditApp';
import EditServerInfo from './pages/EditServer';
import ManageAppServer from './pages/ManageAppServer';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([

    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: 'home', element: <DashboardApp /> },
        { path: 'server', element: <ServerList /> },
        { path: 'allApp', element: <AllApps /> },
        { path: 'allApp/editApp', element: <EditAppInfo /> },
        { path: 'allApp/manageServer', element: <ManageAppServer /> },
        { path: 'server/newServer', element: <AddNewServer /> },
        {
          path: 'server/editServer',
          element: <EditServerInfo />
        },
        {
          path: 'allApp/newApp',
          element: <AddNewApp />
        },
      ],
    },
    {
      path: '/',
      element: <Login />,
    },
    {
      path: 'register',
      element: <Register />,
    },
    {
      path: '/dashboard',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/dashboard', element: <Navigate to="/dashboard/home" /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '404',
      element: <NotFound />
    },

  ]);
}
