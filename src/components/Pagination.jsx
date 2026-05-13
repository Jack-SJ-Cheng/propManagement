export default function Pagination({hasNext, hasPre, currentPage, totalPages, getData}) {

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination">
        <li className="page-item">
          <a className={`page-link ${hasPre ? "" : "disabled"}`} href="#" aria-label="Previous" onClick={(e) => {
            e.preventDefault();
            getData(currentPage - 1);
          }}>
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        {[...Array(totalPages)].map((_, index) => {
          return (
            <li className={`page-item ${index+1 === currentPage ? "active" : ""}`} key={index}>
              <a className="page-link" href="#" onClick={(e)=>{
                e.preventDefault();
                getData(index + 1);
              }}>{index+1}</a>
            </li>
          )
        })}
        <li className="page-item">
          <a className={`page-link ${hasNext ? "" : "disabled"}`} href="#" aria-label="Next" onClick={(e) => {
            e.preventDefault();
            getData(currentPage + 1);
          }}>
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  )
}