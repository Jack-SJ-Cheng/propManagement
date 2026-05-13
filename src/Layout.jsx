import { Outlet, useNavigate } from "react-router"
import Header from "./components/Header"
import Sidebar from "./components/Sidebar"
import { useEffect } from "react"
import axios from "axios"

const url = import.meta.env.VITE_API_URL;

function Layout() {
  
  const navigate = useNavigate();
  
  useEffect(() => {
    (async ()=>{
      try {
        const cookie = document.cookie.replace(/(?:(?:^|.*;\s*)HScookie\s*\=\s*([^;]*).*$)|^.*$/,"$1",);
        axios.defaults.headers.common['Authorization'] = cookie;
        const res = await axios.post(`${url}/v2/api/user/check`)
        console.log("驗證成功:", res.data);
      } catch (error) {
        console.error("驗證失敗:", error);
        navigate("/login");
      }
    })()
  },[])


  return (
    <>
      <Header />
      <div className="d-flex">
        <Sidebar />
        <main className="mainContent flex-grow-1 bg-light">
          <Outlet />
        </main>
      </div>
    </>
  )
}

export default Layout
