import axios from "axios";
import { useEffect, useState } from "react"
import { ClockLoader } from "react-spinners";
import yacht from '../assets/icon/yacht.svg'
import fishBoat from '../assets/icon/fishBoat.svg'
import workBoat from '../assets/icon/workBoat.svg'
import overall from '../assets/icon/overall.svg'
import single from '../assets/icon/single.svg'
import twin from '../assets/icon/twin.svg'
import three from '../assets/icon/three.svg'
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const url = import.meta.env.VITE_API_URL;
const api_path = import.meta.env.VITE_API_PATH;

export default function Dashboard() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [yachtCount, setYachtCount] = useState(0);
  const [fishBoatCount, setFishBoatCount] = useState(0);
  const [workBoatCount, setWorkBoatCount] = useState(0);

  const chartData = {
    labels: ["遊艇", "漁船", "工作船"],
    datasets: [
      {
        data: [yachtCount, fishBoatCount, workBoatCount],
        backgroundColor: ["#e19090", "#672828", "#686868"],
      },
    ],
  };
  const chartOption = {
    plugins: {
      datalabels: {
        color: "#fff",
        font: {
          family: "'Anta', 'LXGW WenKai Mono TC'",
          weight: "bold",
          size: 13,
        },
        formatter: (value, context) => {
          const data = context.chart.data.datasets[0].data;
          const label = context.chart.data.labels[ context.dataIndex ];
          const total = data.reduce((acc, cur) => acc + cur, 0);
          const percentage = ((value / total) * 100).toFixed(1);
          return [label, `${percentage}%`];
        },
      },
      legend: {
        position: "bottom",
      },
    },
  }

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
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getAllData();
  },[])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setYachtCount(data.filter(item => item.shipType === "遊艇").length);
    setFishBoatCount(data.filter(item => item.shipType === "漁船").length);
    setWorkBoatCount(data.filter(item => item.shipType === "工作船").length);
  }, [data])

  return (
    <div className="dashboard">
      <h2 className="h2 mb-4 chiron-round-500">資料總覽</h2>
      <div className="boatType row row-cols-sm-2 row-cols-md-4 g-4 mb-4">
        <div className="overall col">
          <div className="card h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div className="d-flex flex-column justify-content-center">
                  <h6 className="m-0 chiron-round-500">總資料數</h6>
                  <p className="fs-2 m-0">{loading ? <ClockLoader size={48}/> : data.length.toLocaleString() }</p>
                </div>
                <div className="overallIcon d-flex align-items-center">
                  <img src={overall} alt="overall icon" height="50"/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="yacht col">
          <div className="card h-100">
            <div className="card-body h-100">
              <div className="d-flex justify-content-between h-100">
                <div className="d-flex flex-column justify-content-center h-100">
                  <h6 className="m-0">遊艇</h6>
                  <p className="fs-2 m-0">{loading ? <ClockLoader size={48}/> : yachtCount}</p>
                </div>
                <div className="overallIcon d-flex align-items-center">
                  <img src={yacht} alt="yacht icon" height="50"/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="fishBoat col">
          <div className="card h-100">
            <div className="card-body h-100">
              <div className="d-flex justify-content-between h-100">
                <div className="d-flex flex-column justify-content-center h-100">
                  <h6 className="m-0">漁船</h6>
                  <p className="fs-2 m-0">{loading ? <ClockLoader size={48}/> : fishBoatCount}</p>
                </div>
                <div className="overallIcon d-flex align-items-center">
                  <img src={fishBoat} alt="fish boat icon" height="50"/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="workBoat col">
          <div className="card h-100">
            <div className="card-body h-100">
              <div className="d-flex justify-content-between h-100">
                <div className="d-flex flex-column justify-content-center h-100">
                  <h6 className="m-0">工作船</h6>
                  <p className="fs-2 m-0">{loading ? <ClockLoader size={48}/> : workBoatCount}</p>
                </div>
                <div className="overallIcon d-flex align-items-center">
                  <img src={workBoat} alt="work boat icon" height="50"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="MEUnit row row-cols-1 row-cols-md-3 g-4 mb-4">
        <div className="single col">
          <div className="card h-100">
            <div className="card-body h-100">
              <div className="d-flex justify-content-between h-100">
                <div className="d-flex flex-column justify-content-center h-100">
                  <h6 className="m-0">單機船</h6>
                  <p className="fs-2 m-0">{loading ? <ClockLoader size={48}/> : data.filter(item => (item.unit == 1)).length}</p>
                </div>
                <div className="overallIcon d-flex align-items-center">
                  <img src={single} alt="overall icon" height="50"/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="twin col">
          <div className="card h-100">
            <div className="card-body h-100">
              <div className="d-flex justify-content-between h-100">
                <div className="d-flex flex-column justify-content-center h-100">
                  <h6 className="m-0">雙機船</h6>
                  <p className="fs-2 m-0">{loading ? <ClockLoader size={48}/> : data.filter(item => (item.unit == 2)).length}</p>
                </div>
                <div className="overallIcon d-flex align-items-center">
                  <img src={twin} alt="overall icon" height="50"/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="aboveThree col">
          <div className="card h-100">
            <div className="card-body h-100">
              <div className="d-flex justify-content-between h-100">
                <div className="d-flex flex-column justify-content-center h-100">
                  <h6 className="m-0">三機以上</h6>
                  <p className="fs-2 m-0">{loading ? <ClockLoader size={48}/> : data.filter(item => (item.unit >= 3)).length}</p>
                </div>
                <div className="overallIcon d-flex align-items-center">
                  <img src={three} alt="overall icon" height="50"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="chartArea row">
        <div className="col-12 col-md-5">
          <Pie data={chartData} options={chartOption}/>
        </div>
      </div>
    </div>
  )
}