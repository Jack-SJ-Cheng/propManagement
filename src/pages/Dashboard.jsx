import axios from "axios";
import { useEffect, useState } from "react"
import { ClockLoader } from "react-spinners";

const url = import.meta.env.VITE_API_URL;
const api_path = import.meta.env.VITE_API_PATH;

export default function Dashboard() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAllData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${url}/v2/api/${api_path}/admin/products/all`);
      console.log(Object.values(res.data.products));
      setData(Object.values(res.data.products));
    } catch (error) {
      console.warn(error.response);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getAllData();
  },[])

  return (
    <div className="dashboard">
      <div className="boatType row row-cols-4 g-3 mb-3">
        <div className="overall col">
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div className="d-flex flex-column justify-content-center">
                  <h6 className="m-0">總資料數</h6>
                  <p className="fs-2 m-0">{loading ? <ClockLoader size={48}/> : data.length.toLocaleString()}</p>
                </div>
                <div className="overallIcon d-flex align-items-center">
                  <img src="/overall.svg" alt="overall icon" height="50"/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="yacht col">
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div className="d-flex flex-column justify-content-center">
                  <h6 className="m-0">遊艇數量</h6>
                  <p className="fs-2 m-0">855</p>
                </div>
                <div className="overallIcon d-flex align-items-center">
                  <img src="/yacht.svg" alt="yacht icon" height="50"/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="fishBoat col">
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div className="d-flex flex-column justify-content-center">
                  <h6 className="m-0">漁船數量</h6>
                  <p className="fs-2 m-0">613</p>
                </div>
                <div className="overallIcon d-flex align-items-center">
                  <img src="/fishBoat.svg" alt="fish boat icon" height="50"/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="workBoat col">
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div className="d-flex flex-column justify-content-center">
                  <h6 className="m-0">工作船數量</h6>
                  <p className="fs-2 m-0">613</p>
                </div>
                <div className="overallIcon d-flex align-items-center">
                  <img src="/workBoat.svg" alt="work boat icon" height="50"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="MEUnit row row-cols-3 g-3">
        <div className="single col">
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div className="d-flex flex-column justify-content-center">
                  <h6 className="m-0">單機船</h6>
                  <p className="fs-2 m-0">{loading ? <ClockLoader size={48}/> : data.filter(item => (item.unit == 1)).length}</p>
                </div>
                <div className="overallIcon d-flex align-items-center">
                  <img src="/single.svg" alt="overall icon" height="50"/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="twin col">
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div className="d-flex flex-column justify-content-center">
                  <h6 className="m-0">雙機船</h6>
                  <p className="fs-2 m-0">{loading ? <ClockLoader size={48}/> : data.filter(item => (item.unit == 2)).length}</p>
                </div>
                <div className="overallIcon d-flex align-items-center">
                  <img src="/twin.svg" alt="overall icon" height="50"/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="aboveThree col">
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div className="d-flex flex-column justify-content-center">
                  <h6 className="m-0">三機以上</h6>
                  <p className="fs-2 m-0">{loading ? <ClockLoader size={48}/> : data.filter(item => (item.unit >= 3)).length}</p>
                </div>
                <div className="overallIcon d-flex align-items-center">
                  <img src="/three.svg" alt="overall icon" height="50"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}