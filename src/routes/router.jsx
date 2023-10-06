import { createBrowserRouter } from 'react-router-dom';
import Login from '../pages/login/Login';
import Chat from '../pages/chat/chat';
import Register from '../pages/register/Register';
import Logout from '../pages/logout/Logout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/chat',
    element: <Chat />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/logout',
    element: <Logout />,
  },
]);

export default router;
