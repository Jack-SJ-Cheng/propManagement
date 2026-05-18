import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form"


const url = import.meta.env.VITE_API_URL;
const api_path = import.meta.env.VITE_API_PATH;

export default function Datasearch() {

  const {register, handleSubmit, reset, trigger, watch, formState: {errors}} = useForm({
    mode: "onChange",
  });

  // eslint-disable-next-line react-hooks/incompatible-library
  const lwlMin = watch("lwlMin");
  const powerMin = watch("powerMin");
  const speedMin = watch("speedMin");
  const diameterMin = watch("diameterMin");
  const lwlMax = watch("lwlMax");
  const powerMax = watch("powerMax");
  const speedMax = watch("speedMax");
  const diameterMax = watch("diameterMax");

  const [originData, setOriginData] = useState([]);
  const [filterData, setFilterData] = useState([]);

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

  const getSearch = (data) => {
    console.log(data);
    const newData = originData.filter(item => {
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
    setFilterData(newData);
  }

  const getAllData = async () => {
    try {
      const res = await axios.get(`${url}/v2/api/${api_path}/admin/products/all`);
      setOriginData(Object.values(res.data.products));
    } catch (error) {
      console.warn(error.response);
    }
  }

  useEffect(() => {
    getAllData();
  }, [])

  return (
    <>
      <div className="datasearch">
        <h2 className="h2 mb-4 chiron-round-500">資料查詢</h2>
        <p className="text-secondary">依條件查詢歷史資料</p>
        <form onSubmit={handleSubmit(getSearch)} className="mb-4">
          <div className="card condition">
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
                  onClick={() => reset()}
                ><i className="bi bi-arrow-clockwise"></i> 清除</button>
                <button type="submit" className="px-5 btn btn-primary"><i className="bi bi-search"></i> 查詢</button>
              </div>

            </div>
          </div>
        </form>
        <div className="card">
          <div className="card-body">
            <table className="table table-hover text-center align-middle">
              <thead>
                <tr>
                  <th>日期</th>
                  <th>客戶</th>
                  <th>水線長</th>
                  <th>主機馬力</th>
                  <th>船速</th>
                  <th>螺槳尺寸</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                {filterData.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.date}</td>
                      <td>{item.customerName}</td>
                      <td>{item.LWL}</td>
                      <td>{item.ratedPower} {item.MEUnit}</td>
                      <td>{item.designSpeed}</td>
                      <td>{`${item.propellerDiameter}${item.diameterUnit === "inch" ? '"': ""} x ${item.propellerPitch}${item.pitchUnit === "inch" ? '"': ""} x ${item.bladeNum}B x ${item.DAR}`}</td>
                      <td>
                        <button type="button" className="btn btn-outline-primary border-0"><i className="bi bi-eye"></i></button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}