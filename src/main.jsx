import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "bootstrap/dist/css/bootstrap.min.css";
import './index.css'
import App from './routes/App'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './routes/Home';
import BurgerBuilder from './components/BurgerBuilding/BurgerBuilder';
const router=createBrowserRouter([
  {
    path: '/',
    element:<App />,
    children:[
      {
        index:true,
        element:<Home />
      },
      {
        path:'/building-burger',
        element:<BurgerBuilder />
      },
    ],
  },
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
