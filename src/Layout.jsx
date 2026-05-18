import { Outlet, useNavigate } from "react-router"
import Header from "./components/Header"
import Sidebar from "./components/Sidebar"
import { useEffect, useState } from "react"
import axios from "axios"
import { MoonLoader } from "react-spinners"

const url = import.meta.env.VITE_API_URL;

function Layout() {
  
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    (async () => {
      try {
        const cookie = document.cookie.replace(/(?:(?:^|.*;\s*)HScookie\s*=\s*([^;]*).*$)|^.*$/,"$1",);
        axios.defaults.headers.common['Authorization'] = cookie;
        const res = await axios.post(`${url}/v2/api/user/check`);
        setIsChecked(true);
        console.log("驗證成功:", res.data);
      } catch (error) {
        console.error("驗證失敗:", error);
        navigate("/login");
      }
    })()
  }, [navigate])

  return (
      <>
        <Header />
        <div className="d-flex">
          <Sidebar />
          <main className="mainContent flex-grow-1 bg-light">
            {isChecked ? <Outlet /> : <div className="d-flex justify-content-center align-items-center h-100"><MoonLoader size={80} color="#672828" /></div> }
          </main>
        </div>
      </>
  )
}

export default Layout;
