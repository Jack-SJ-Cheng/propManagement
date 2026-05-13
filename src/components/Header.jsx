export default function Header() {
  return (
    <div className="header">
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Propeller Database</a>
          <button type="button" className="btn">
            <i className="bi bi-person-circle fs-5"></i> <span className="h5 font-anta">Administrator</span>
          </button>
        </div>
      </nav>
    </div>
  )
}