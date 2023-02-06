// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/home',
    icon: getIcon('material-symbols:space-dashboard-sharp'),
  },

  {
    title: 'Application',
    path: '/dashboard/allApp',
    icon: getIcon('material-symbols:apps'),
  },
  {
    title: 'Server List',
    path: '/dashboard/server',
    icon: getIcon('bxs:coin-stack'),
  }

];

export default navConfig;
