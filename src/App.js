import './App.css';
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import RootLayout from './RootLayout'
import AddUser from './components/adduser/AddUser';
import Users from './components/users/Users'
import RemovedUsers from './components/removedusers/RemovedUsers'




function App() {

  //create Browser router object
  const router=createBrowserRouter([
    {
      path:"/",
      element:<RootLayout />,
      children:[
        {
          path:"/",
          element:<AddUser />
        },
        {
          path:"/users",
          element:<Users />
        },
        {
          path:"/removed-users",
          element:<RemovedUsers />
        }
      ]
    }
  ])
  return (
    <div>
       <RouterProvider router={router} />
    </div>
  );
}

export default App;
