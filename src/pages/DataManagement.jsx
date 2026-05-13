import axios from "axios"
import { useEffect, useState } from "react"
import Pagination from "../components/Pagination";

const url = import.meta.env.VITE_API_URL;
const api_path = import.meta.env.VITE_API_PATH;

export default function DataManagement() {

  const [hasNext, setHasNext] = useState(false);
  const [hasPre, setHasPre] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [data, setData] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [tempShowItem, setTempShowItem] = useState({});
  const [showItem, setShowItem] = useState({
    date: true,
    customerName: true,
    title: true,
    ratedPower: true,
    ratedRPM: true,
    gearRatio: true,
    propellerDiameter: true,
    pitchRatio: true,
    bladeNum: true,
    DAR: true,
    designSpeed: true,
    unit: true,
  })

  const deleteItem = async (id) => {
    try {
      axios.delete(`${url}/v2/api/${api_path}/admin/product/${id}`)
      getData();
    } catch (error) {
      console.warn(error.response);
    }
  }

  const getData = async (page = 1) => {
    try {
      const res = await axios.get(`${url}/v2/api/${api_path}/admin/products?page=${page}`);
      console.log(res.data);
      setCurrentPage(res.data.pagination.current_page);
      setHasNext(res.data.pagination.has_next);
      setHasPre(res.data.pagination.has_pre);
      setTotalPages(res.data.pagination.total_pages);
      setData(res.data.products);
    } catch (error) {
      console.warn(error.response.data);
    }
  }

  useEffect(() => {
    getData();
  }, [])

  return (
    <>
      <div className="d-flex justify-content-end mb-3">
        <div className="dropdown">
          <button type="button" className="btn btn-outline-primary dropdown-toggle "
          onClick={()=>{
            if(!showMenu) setTempShowItem(showItem)
            else setShowItem(tempShowItem)
            setShowMenu(!showMenu);
          }}>
            <i className="bi bi-layout-three-columns"></i> 欄位顯示設定
          </button>
          {/* <button type="button" className="btn btn-outline-primary dropdown-toggle" id="itemToShow" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
            <i className="bi bi-layout-three-columns"></i> 欄位顯示設定
          </button> */}
          {showMenu && 
          <div className="dropdown-menu dropdown-menu-end show p-2">
            <div className="d-flex flex-wrap gap-2">
              <input type="checkbox" className="btn-check" id="dropDate" checked={tempShowItem.date} onChange={()=>{
                const newItem = !tempShowItem.date;
                setTempShowItem({...tempShowItem, date: newItem});
              }}/>
              <label className="btn btn-outline-primary fs-6" htmlFor="dropDate">日期</label>
              <input type="checkbox" className="btn-check" id="dropCustomerName"  checked={tempShowItem.customerName} onChange={() => {
                const newItem = !tempShowItem.customerName;
                setTempShowItem({...tempShowItem, customerName: newItem});
              }}/>
              <label className="btn btn-outline-primary" htmlFor="dropCustomerName">客戶</label>
              <input type="checkbox" className="btn-check" id="dropTitle"  checked={tempShowItem.title} onChange={() => {
                const newItem = !tempShowItem.title;
                setTempShowItem({...tempShowItem, title: newItem});
              }}/>
              <label className="btn btn-outline-primary" htmlFor="dropTitle">船名</label>
              <input type="checkbox" className="btn-check" id="dropPower"  checked={tempShowItem.ratedPower} onChange={() => {
                const newItem = !tempShowItem.ratedPower;
                setTempShowItem({...tempShowItem, ratedPower: newItem});
              }}/>
              <label className="btn btn-outline-primary" htmlFor="dropPower">主機馬力</label>
              <input type="checkbox" className="btn-check" id="dropRPM"  checked={tempShowItem.ratedRPM} onChange={() => {
                const newItem = !tempShowItem.ratedRPM;
                setTempShowItem({...tempShowItem, ratedRPM: newItem});
              }}/>
              <label className="btn btn-outline-primary" htmlFor="dropRPM">轉速</label>
              <input type="checkbox" className="btn-check" id="dropGear"  checked={tempShowItem.gearRatio} onChange={() => {
                const newItem = !tempShowItem.gearRatio;
                setTempShowItem({...tempShowItem, gearRatio: newItem});
              }}/>
              <label className="btn btn-outline-primary" htmlFor="dropGear">齒輪比</label>
              <input type="checkbox" className="btn-check" id="dropDiameter"  checked={tempShowItem.propellerDiameter} onChange={() => {
                const newItem = !tempShowItem.propellerDiameter;
                setTempShowItem({...tempShowItem, propellerDiameter: newItem});
              }}/>
              <label className="btn btn-outline-primary" htmlFor="dropDiameter">螺槳直徑</label>
              <input type="checkbox" className="btn-check" id="dropPD"  checked={tempShowItem.pitchRatio} onChange={() => {
                const newItem = !tempShowItem.pitchRatio;
                setTempShowItem({...tempShowItem, pitchRatio: newItem});
              }}/>
              <label className="btn btn-outline-primary" htmlFor="dropPD">螺距比</label>
              <input type="checkbox" className="btn-check" id="dropBlade"  checked={tempShowItem.bladeNum} onChange={() => {
                const newItem = !tempShowItem.bladeNum;
                setTempShowItem({...tempShowItem, bladeNum: newItem});
              }}/>
              <label className="btn btn-outline-primary" htmlFor="dropBlade">葉數</label>
              <input type="checkbox" className="btn-check" id="dropDAR"  checked={tempShowItem.DAR} onChange={() => {
                const newItem = !tempShowItem.DAR;
                setTempShowItem({...tempShowItem, DAR: newItem});
              }}/>
              <label className="btn btn-outline-primary" htmlFor="dropDAR">面積比</label>
              <input type="checkbox" className="btn-check" id="dropSpeed"  checked={tempShowItem.designSpeed} onChange={() => {
                const newItem = !tempShowItem.designSpeed;
                setTempShowItem({...tempShowItem, designSpeed: newItem});
              }}/>
              <label className="btn btn-outline-primary" htmlFor="dropSpeed">設計船速</label>
              <input type="checkbox" className="btn-check" id="dropUnit"  checked={tempShowItem.unit} onChange={() => {
                const newItem = !tempShowItem.unit;
                setTempShowItem({...tempShowItem, unit: newItem});
              }}/>
              <label className="btn btn-outline-primary" htmlFor="dropUnit">主機數量</label>
            </div>
          </div>
          }
        </div>
      </div>
      <div className="rounded-4  overflow-hidden">
        <table className="table table-striped table-hover text-center py-1">
          <thead>
            <tr className="table-primary">
              {showItem.date && <th>日期</th>}
              {showItem.customerName && <th>客戶</th>}
              {showItem.title && <th>船名</th>}
              {showItem.ratedPower && <th>主機馬力</th>}
              {showItem.ratedRPM && <th>轉速</th>}
              {showItem.gearRatio && <th>齒輪比</th>}
              {showItem.propellerDiameter && <th>螺槳直徑</th>}
              {showItem.pitchRatio && <th>P/D</th>}
              {showItem.bladeNum && <th>葉數</th>}
              {showItem.DAR && <th>DAR</th>}
              {showItem.designSpeed && <th>設計船速</th>}
              {showItem.unit && <th>主機數</th>}
              <th>操作</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {data.map((data, key) => {
              return (
                <tr key={key}>
                  {showItem.date && <td>{data.date}</td>}
                  {showItem.customerName && <td>{data.customerName}</td>}
                  {showItem.title && <td>{data.title}</td>}
                  {showItem.ratedPower && <td>{data.ratedPower + data.MEUnit}</td>}
                  {showItem.ratedRPM && <td>{data.ratedRPM}</td>}
                  {showItem.gearRatio && <td>{data.gearRatio + ":1"}</td>}
                  {showItem.propellerDiameter && <td>{(data.propellerDiameter ? data.propellerDiameter + " " + data.diameterUnit : "")}</td>}
                  {showItem.pitchRatio && <td>{data.propellerPitch ? (data.propellerPitch / data.propellerDiameter).toFixed(2) : ""}</td>}
                  {showItem.bladeNum && <td>{data.bladeNum}</td>}
                  {showItem.DAR && <td>{data.DAR}</td>}
                  {showItem.designSpeed && <td>{data.designSpeed}</td>}
                  {showItem.unit && <td>{data.unit}</td>}
                  <td>
                    <div className="btn-group">
                      <button type="button" className="btn btn-sm btn-outline-primary">編輯</button>
                      <button type="button" className="btn btn-sm btn-outline-danger" onClick={()=>{
                        deleteItem(data.id);
                      }}>刪除</button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <div className="d-flex justify-content-center">
          <Pagination hasNext={hasNext} hasPre={hasPre} currentPage={currentPage} totalPages={totalPages} getData={getData}/>
        </div>
      </div>
    </>
  )
}