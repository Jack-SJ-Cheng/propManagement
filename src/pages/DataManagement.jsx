import axios from "axios"
import { useEffect, useRef, useState } from "react"
import Pagination from "../components/Pagination";
import DataModal from "../components/DataModal";
import ViewModal from "../components/ViewModal";
import { Modal } from "bootstrap";
import { useForm } from "react-hook-form";

const url = import.meta.env.VITE_API_URL;
const api_path = import.meta.env.VITE_API_PATH;

export default function DataManagement() {

  const {register, handleSubmit, reset, watch, trigger, formState: {errors}} = useForm();

  // eslint-disable-next-line react-hooks/incompatible-library
  const lwlMin = watch("lwlMin");
  const powerMin = watch("powerMin");
  const speedMin = watch("speedMin");
  const diameterMin = watch("diameterMin");
  const lwlMax = watch("lwlMax");
  const powerMax = watch("powerMax");
  const speedMax = watch("speedMax");
  const diameterMax = watch("diameterMax");

  const viewModalRef = useRef(null);
  const viewModalInstance = useRef(null);

  const dataModalRef = useRef(null);
  const dataModalInstance = useRef(null);
  const [propsData, setPropsData] = useState({});

  const [showData, setShowData] = useState([]);

  const [allData, setAllData] = useState([]);

  const [pageData, setPageData] = useState([]);
  const [hasNext, setHasNext] = useState(false);
  const [hasPre, setHasPre] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [isSearch, setIsSearch] = useState(false);

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
      await axios.delete(`${url}/v2/api/${api_path}/admin/product/${id}`);
      getData();
    } catch (error) {
      console.warn(error.response);
    }
  }

  const getAllData = async () => {
    try {
      const res = await axios.get(`${url}/v2/api/${api_path}/admin/products/all`);
      setAllData(Object.values(res.data.products));
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
      setPageData(res.data.products);
    } catch (error) {
      console.warn(error.response.data);
    }
  }
  const getSearch = (data) => {
    setIsSearch(true);
    console.log(data);
    const newData = allData.filter(item => {
      return (
        (!data.lwlMin || Number(item.LWL) >= Number(data.lwlMin)) &&
        (!data.lwlMax || Number(item.LWL) <= Number(data.lwlMax)) &&
        (!data.powerMin || Number(item.powerInHP) >= Number(data.powerMin)) &&
        (!data.powerMax || Number(item.powerInHP) <= Number(data.powerMax)) &&
        (!data.speedMin || Number(item.designSpeed) >= Number(data.speedMin)) &&
        (!data.speedMax || Number(item.designSpeed) <= Number(data.speedMax)) &&
        (!data.diameterMin || Number(item.diameterInMM) >= Number(data.diameterMin)) &&
        (!data.diameterMax || Number(item.diameterInMM) <= Number(data.diameterMax))
      )
    });
    setShowData(newData);
  }

  useEffect(() => {
    viewModalInstance.current = new Modal(viewModalRef.current);
    dataModalInstance.current = new Modal(dataModalRef.current);
    getData();
    getAllData();
  }, [])

  useEffect(() => {
    if(lwlMax !== "") trigger("lwlMax")
  }, [lwlMax, lwlMin, trigger])
  useEffect(() => {
    if(powerMax !== "") trigger("powerMax")
  }, [powerMax, powerMin, trigger])
  useEffect(() => {
    if(speedMax !== "") trigger("speedMax")
  }, [speedMax, speedMin, trigger])
  useEffect(() => {
    if(diameterMax !== "") trigger("diameterMax")
  }, [diameterMax, diameterMin, trigger])

  useEffect(() => {
    setShowData(pageData);
  }, [pageData])

  return (
    <>
      <h2 className="h2 mb-4 chiron-round-500">資料管理</h2>
      <form onSubmit={handleSubmit(getSearch)} className="mb-3">
        <div className="condition card">
          <div className="card-body">
            <div className="condition row row-cols-1 row-cols-sm-2 row-cols-md-4 mb-4">

              <div className="conditionLwl">
                <label className="form-label fw-bold">水線長範圍, m</label>
                  <div className="d-flex align-items-center">
                    <input type="number" step="any" className="form-control" placeholder="最小值" min={0} {...register("lwlMin")} />
                    <span className="mx-1">~</span>
                    <input type="number" step="any" className="form-control" placeholder="最大值" {...register("lwlMax", {
                      validate: (value) => !value || Number(value) >= Number(lwlMin) || "最大值不能小於最小值"
                    })} />
                  </div>
                  { errors.lwlMax && ( <p className="text-danger small mt-1 mb-0">{errors.lwlMax.message}</p> ) }
              </div>
              
              <div className="conditionPower">
                <label className="form-label fw-bold">馬力範圍, HP</label>
                  <div className="d-flex align-items-center">
                    <input type="number" step="any" className="form-control" placeholder="最小值" {...register("powerMin")} />
                    <span className="mx-1">~</span>
                    <input type="number" step="any" className="form-control" placeholder="最大值" {...register("powerMax", {
                      validate: (value) => !value || Number(value) >= Number(powerMin) || "最大值不能小於最小值"
                    })} />
                  </div>
                  { errors.powerMax && ( <p className="text-danger small mt-1 mb-0">{errors.powerMax.message}</p> ) }
              </div>

              <div className="conditionSpeed">
                <label className="form-label fw-bold">船速範圍, knot</label>
                  <div className="d-flex align-items-center">
                    <input type="number" step="any" className="form-control" placeholder="最小值" {...register("speedMin")} />
                    <span className="mx-1">~</span>
                    <input type="number" step="any" className="form-control" placeholder="最大值" {...register("speedMax", {
                      validate: (value) => !value || Number(value) >= Number(speedMin) || "最大值不能小於最小值"
                    })} />
                  </div>
                  { errors.speedMax && ( <p className="text-danger small mt-1 mb-0">{errors.speedMax.message}</p> ) }
              </div>

              <div className="conditionDiameter">
                <label className="form-label fw-bold">螺槳直徑範圍, mm</label>
                  <div className="d-flex align-items-center">
                    <input type="number" step="any" className="form-control" placeholder="最小值" {...register("diameterMin")} />
                    <span className="mx-1">~</span>
                    <input type="number" step="any" className="form-control" placeholder="最大值" {...register("diameterMax", {
                      validate: (value) => !value || Number(value) >= Number(diameterMin) || "最大值不能小於最小值"
                    })} />
                  </div>
                  { errors.diameterMax && ( <p className="text-danger small mt-1 mb-0">{errors.diameterMax.message}</p> ) }
              </div>

            </div>

            <div className="d-flex justify-content-between">
              <button type="button" className="px-5 btn btn-outline-secondary"
                onClick={() => {
                  setIsSearch(false);
                  reset();
                  setShowData(pageData);
                }}
              ><i className="bi bi-arrow-clockwise"></i> 清除</button>
              <button type="submit" className="px-5 btn btn-primary"><i className="bi bi-search"></i> 查詢</button>
            </div>
          </div>
        </div>
      </form>
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
        <table className="table table-hover text-center py-1 align-middle">
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
            {showData.map((item, key) => {
              return (
                <tr key={key}>
                  {showItem.date && <td>{item.date}</td>}
                  {showItem.customerName && <td>{item.customerName}</td>}
                  {showItem.title && <td>{item.title}</td>}
                  {showItem.ratedPower && <td>{item.ratedPower + item.MEUnit}</td>}
                  {showItem.ratedRPM && <td>{item.ratedRPM}</td>}
                  {showItem.gearRatio && <td>{item.gearRatio + ":1"}</td>}
                  {showItem.propellerDiameter && <td>{(item.propellerDiameter ? item.propellerDiameter + " " + item.diameterUnit : "")}</td>}
                  {showItem.pitchRatio && <td>{item.propellerPitch ? (item.propellerPitch / item.propellerDiameter).toFixed(2) : ""}</td>}
                  {showItem.bladeNum && <td>{item.bladeNum}</td>}
                  {showItem.DAR && <td>{item.DAR}</td>}
                  {showItem.designSpeed && <td>{item.designSpeed}</td>}
                  {showItem.unit && <td>{item.unit}</td>}
                  <td>
                    <div className="btn-group">
                      <button className="btn btn-sm btn-outline-success"
                        onClick={() => {
                          setPropsData(item);
                          viewModalInstance.current.show();
                        }}
                      ><i className="bi bi-eye"></i></button>
                      <button type="button" className="btn btn-sm btn-outline-primary"
                        onClick={() => {
                          setPropsData(item);
                          dataModalInstance.current.show();
                        }}
                      ><i className="bi bi-pencil-square"></i></button>
                      <button type="button" className="btn btn-sm btn-outline-danger" onClick={()=>{
                        deleteItem(item.id);
                      }}><i className="bi bi-trash"></i></button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <div className={`d-flex justify-content-center ${isSearch ? "d-none" : "" }`}>
          <Pagination hasNext={hasNext} hasPre={hasPre} currentPage={currentPage} totalPages={totalPages} getData={getData}/>
        </div>
      </div>
      <DataModal dataModalRef={dataModalRef} dataModalInstance={dataModalInstance} propsData={propsData} getData={getData} currentPage={currentPage}/>
      <ViewModal viewModalRef={viewModalRef} viewModalInstance={viewModalInstance} propsData={propsData} dataModalRef={dataModalRef} dataModalInstance={dataModalInstance} />
    </>
  )
}