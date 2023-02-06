// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/chart/BaseOptionChart';
import { ToastContainer } from 'react-toastify';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <ThemeProvider>
      {/* <ScrollToTop /> */}
      {/* <BaseOptionChartStyle /> */}
      <Router />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light" />
    </ThemeProvider>
  );
}
