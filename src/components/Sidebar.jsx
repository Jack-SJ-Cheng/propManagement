import { NavLink } from "react-router"


export default function Sidebar() {
  return (
    <nav className="nav flex-column sidebar p-3 chiron-round-500">
      <NavLink className="nav-link fs-6" to="/"><i className="bi bi-columns-gap"></i> 總覽</NavLink>
      <NavLink className="nav-link fs-6" to="/datamanagement"><i className="bi bi-list-columns"></i> 資料管理</NavLink>
      <NavLink className="nav-link fs-6" to="/adding"><i className="bi bi-file-plus"></i> 新增資料</NavLink>
      <NavLink className="nav-link fs-6" to="/predicting"><i className="bi bi-speedometer"></i> 船速預估</NavLink>
    </nav>
  )
}