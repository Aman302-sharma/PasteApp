import { createBrowserRouter,RouterProvider} from 'react-router-dom'
import './App.css'
import Home from './components/Home.jsx'
import Navbar from './components/Navbar.jsx'
import Paste from './components/Paste.jsx'
import ViewPaste from './components/ViewPaste.jsx'
import { Toaster } from 'react-hot-toast';

const router = createBrowserRouter([
  {

    path: "/",
    element: <div>
      <Navbar />
      <Home />
    </div>
  },
  {

    path: "/pastes",
    element: <div>
      <Navbar />
      <Paste />
    </div>
  },
  {

    path: "pastes/:id",
    element: <div>
      <Navbar />
      <ViewPaste />
    </div>
  },
]
);

function App() {

  return (
    <div>
        <RouterProvider router={router}  /> 
        <Toaster />
    </div>
  )
}

export default App
