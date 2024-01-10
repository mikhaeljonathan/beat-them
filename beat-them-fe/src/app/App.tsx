import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from '../pages/home/Home';
import SessionPage from '../pages/session/SessionPage';
import NotFoundPage from '../pages/notfound/NotFoundPage';

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/:sessionId', element: <SessionPage /> },
  { path: '/notfound', element: <NotFoundPage />}
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
