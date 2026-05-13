import Layout from "../Layout"
import Adding from "../pages/Adding";
import Dashboard from "../pages/Dashboard";
import DataManagement from "../pages/DataManagement";
import Datasearch from "../pages/Datasearch";
import Historydata from "../pages/Historydata";
import Login from "../pages/Login";
import Predicting from "../pages/Predicting";




const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "/datasearch", element: <Datasearch /> },
      { path: "/adding", element: <Adding /> },
      { path: "/historydata", element: <Historydata /> },
      { path: "/predicting", element: <Predicting /> },
      { path: "/datamanagement", element: <DataManagement /> },
    ]
  },
  {
    path: "/login",
    element: <Login />
  }
]
export default routes;