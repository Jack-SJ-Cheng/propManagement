import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router";
import { BeatLoader } from "react-spinners";

const url = import.meta.env.VITE_API_URL;
const api_path = import.meta.env.VITE_API_PATH;

export default function Adding() {

  const navigate = useNavigate();

  const today = new Date().toISOString().split("T")[0];

  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      // ---後端資料必填---
      origin_price: 0,
      price: 0,
      // ---後端資料必填---
      shipType: "yacht",
      date: new Date().toISOString().split("T")[0],
      title: "",
      boatType: "semi-planing",
      bottomType: "tunnel",
      hullMaterial: "fiberglass",
      unit: "2",
      MEUnit: "HP",
      diameterUnit: "mm",
      propellerPitchUnit: "mm",
      bladeNumExpect: "1",
      LH: "1",
      RH: "1",
      is_enabled: 0,
      diameterInMM: 0,
      diameterInINCH: 0,
    }
  })

  const onSubmit = async (data) => {
    try {
      if(data.propellerDiameterRecord) {
        if(data.propellerDiameterUnit === "mm") {
          diameterInMM = data.propellerDiameter;
          diameterInINCH = (data.propellerDiameter / 25.4);
        } else if(data.propellerDiameterUnit === "inch") {
          diameterInMM = (data.propellerDiameter * 25.4);
          diameterInINCH = data.propellerDiameter;
        }
      }
      setLoading(true);
      const res = await axios.post(`${url}/v2/api/${api_path}/admin/product`, {data: data})
      console.log(res.data)
      navigate("/datamanagement");
    } catch (error) {
      console.warn(error.response.data);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="adding p-3 d-flex flex-column gap-3">
        <div className="shipType btn-group">
          <input type="radio" className="btn-check" id="yacht" name="shipType" value="yacht" {...register("shipType")} />
          <label className="btn btn-outline-primary" htmlFor="yacht">遊艇</label>
          <input type="radio" className="btn-check" id="fishBoat" name="shipType" value="fishBoat" {...register("shipType")} />
          <label className="btn btn-outline-primary" htmlFor="fishBoat">漁船</label>
          <input type="radio" className="btn-check" id="workBoat" name="shipType" value="workBoat" {...register("shipType")} />
          <label className="btn btn-outline-primary" htmlFor="workBoat">工作船</label>
        </div>
        {/* 客戶資料 */}
        <div className="card customerInfo-card">
          <div className="card-body">
            <div className="card-title text-primary d-flex justify-content-center">
              <h5 className="h5"><i className="bi bi-1-circle"></i> 基本資料</h5>
            </div>
            <div className="row g-3">
              <div className="col-md-4">
                <label htmlFor="customerName" className="form-label ">客戶名稱</label>
                <input type="text" className="form-control" id="customerName" {...register("customerName", 
                  { required: "此欄位為必填" })} />
                {errors.customerName && <span className="text-danger">{errors.customerName.message}</span>}
              </div>
              <div className="col-md-4">
                <label htmlFor="contactInfo" className="form-label ">聯絡人</label>
                <input type="text" className="form-control" id="contactInfo" {...register("contactInfo")} />
                {errors.contactInfo && <span className="text-danger">{errors.contactInfo.message}</span>}
              </div>
              <div className="col-md-4">
                <label htmlFor="date" className="form-label ">日期</label>
                <input type="date" max={today} className="form-control" id="date" {...register("date")} />
              </div>
              <div className="col-md-4">
                <label htmlFor="email" className="form-label ">電子郵件</label>
                <input type="email" className="form-control" id="email" {...register("email", {
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "請輸入有效的電子郵件地址"
                  }
                })} />
              </div>
              <div className="col-md-4">
                <label htmlFor="phone" className="form-label ">電話</label>
                <input type="tel" className="form-control" id="phone" {...register("phone")} />
              </div>
              <div className="col-md-4">
                <label htmlFor="fax" className="form-label ">傳真</label>
                <input type="tel" className="form-control" id="fax" {...register("fax")} />
              </div>
            </div>
          </div>
        </div>
        {/* 船體資料 */}
        <div className="card boatInfo-card">
          <div className="card-body">
            <div className="card-title text-primary d-flex justify-content-center">
              <h5 className="h5"><i className="bi bi-2-circle"></i> 船體資料</h5>
            </div>
            <div className="row g-3">
              <div className="col-lg-3 col-md-6">
                <label htmlFor="title" className="form-label ">船名</label>
                <input type="text" className="form-control" id="title" {...register("title", {required: "船名為必填項目"})} />
                {errors.title && <span className="text-danger">{errors.title.message}</span>}
              </div>
              <div className="col-lg-3 col-md-6">
                <label htmlFor="boatType" className="form-label ">船型</label>
                <select name="boatType" id="boatType" className="form-select" {...register("boatType")}>
                  <option value="planing">滑航型</option>
                  <option value="semi-planing">半滑航型</option>
                  <option value="displacement">排水型</option>
                  <option value="semi-displacement">半排水型</option>
                </select>
              </div>
              <div className="col-lg-3 col-md-6">
                <label htmlFor="category" className="form-label ">船底設計</label>
                <select name="category" id="category" className="form-select" {...register("category", {required: "船底設計為必填"})}>
                  <option value="open">開放式</option>
                  <option value="tunnel">隧道式</option>
                </select>
                {errors.category && <span className="text-danger">{errors.category.message}</span>}
              </div>
              <div className="col-lg-3 col-md-6">
                <label htmlFor="hullMaterial" className="form-label ">船殼材料</label>
                <select name="hullMaterial" id="hullMaterial" className="form-select" {...register("hullMaterial")}>
                  <option value="steel">鋼</option>
                  <option value="fiberglass">玻璃纖維</option>
                  <option value="aluminum">鋁</option>
                  <option value="wood">木</option>
                </select>
              </div>
              <div className="col-md-4">
                <label htmlFor="LOA" className="form-label ">全長LOA, m</label>
                <input type="number" step="any" className="form-control" id="LOA" {...register("LOA")} />
              </div>
              <div className="col-md-4">
                <label htmlFor="LWL" className="form-label ">水線長LWL, m</label>
                <input type="number" step="any" className="form-control" id="LWL" {...register("LWL")} />
              </div>
              <div className="col-md-4">
                <label htmlFor="BWL" className="form-label ">水線寬BWL, m</label>
                <input type="number" step="any" className="form-control" id="BWL" {...register("BWL")} />
              </div>
              <div className="col-md-4">
                <label htmlFor="fullLoaded" className="form-label ">滿載排水量, tons</label>
                <input type="number" step="any" className="form-control" id="fullLoaded" {...register("fullLoaded")} />
              </div>
              <div className="col-md-4">
                <label htmlFor="halfLoaded" className="form-label ">半載排水量, tons</label>
                <input type="number" step="any" className="form-control" id="halfLoaded" {...register("halfLoaded")} />
              </div>
              <div className="col-md-4">
                <label htmlFor="lightLoaded" className="form-label ">輕載排水量, tons</label>
                <input type="number" step="any" className="form-control" id="lightLoaded" {...register("lightLoaded")} />
              </div>
              <div className="col-8 col-sm-6 col-md-4">
                <label htmlFor="speedExpect" className="form-label ">預期船速, kn</label>
                <input type="number" step="any" className="form-control" id="speedExpect" {...register("speedExpect")} />
              </div>
            </div>
          </div>
        </div>
        {/* 主機資料 */}
        <div className="card ME-card">
          <div className="card-body">
            <div className="card-title text-primary d-flex justify-content-center">
              <h5 className="h5"><i className="bi bi-3-circle"></i> 主機/傳動資料</h5>
            </div>
            <div className="row g-3">
              <div className="col-md-5">
                <label htmlFor="MEBrand" className="form-label ">主機廠牌</label>
                <input type="text" className="form-control" id="MEBrand" {...register("MEBrand")} />
              </div>
              <div className="col-sm-8 col-md-5">
                <label htmlFor="MEModel" className="form-label ">主機型號</label>
                <input type="text" className="form-control" id="MEModel" {...register("MEModel")} />
              </div>
              <div className="col-sm-4 col-md-2">
                <label htmlFor="unit" className="form-label ">主機數</label>
                <select name="unit" id="unit" className="form-select" {...register("unit")}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
              </div>
              <div className="col-6 col-md-4 col-lg-5">
                <label htmlFor="ratedPower" className="form-label ">額定馬力</label>
                <input type="number" className="form-control" id="ratedPower" {...register("ratedPower", {
                  required: "此欄位為必填",
                })} />
              </div>
              <div className="col-6 col-md-3 col-lg-2">
                <label htmlFor="MEUnit" className="form-label ">馬力單位</label>
                <select name="MEUnit" id="MEUnit" className="form-select" {...register("MEUnit")}>
                  <option value="HP">HP</option>
                  <option value="kW">kW</option>
                  <option value="PS">PS</option>
                </select>
              </div>
              <div className="col-md-5 col-lg-5">
                <label htmlFor="ratedRPM" className="form-label ">額定轉速, RPM</label>
                <input type="number" className="form-control" id="ratedRPM" {...register("ratedRPM", {
                  required: "此欄位為必填",
                })} />
              </div>
              
              <div className="col-md-4">
                <label htmlFor="gearboxBrand" className="form-label ">齒輪機廠牌</label>
                <input type="text" className="form-control" id="gearboxBrand" {...register("gearboxBrand")} />
              </div>
              <div className="col-md-4">
                <label htmlFor="gearboxModel" className="form-label ">齒輪機型號</label>
                <input type="text" className="form-control" id="gearboxModel" {...register("gearboxModel")} />
              </div>
              <div className="col-md-4">
                <label htmlFor="gearRatio" className="form-label ">齒輪機齒輪比</label>
                <input type="number" step="any" className="form-control" id="gearRatio" {...register("gearRatio", {
                  required: "此欄位為必填",
                })} />
              </div>
            </div>
          </div>
        </div>
        {/* 螺旋槳空間資料 */}
        <div className="card propeller-card">
          <div className="card-body">
            <div className="card-title text-primary d-flex justify-content-center">
              <h5 className="h5"><i className="bi bi-4-circle"></i> 螺旋槳空間資料</h5>
            </div>
            <div className="row g-3">
              <div className="col-md-4">
                <label htmlFor="maxDiameter" className="form-label ">最大螺槳直徑, mm</label>
                <input type="number" step="any" className="form-control" id="maxDiameter" {...register("maxDiameter")} />
              </div>
              <div className="col-md-4">
                <label htmlFor="shaftDepth" className="form-label ">螺槳沒水深度Im, m</label>
                <input type="number" step="any" className="form-control" id="shaftDepth" {...register("shaftDepth")} />
              </div>
              <div className="col-md-4">
                <label htmlFor="tipClearance" className="form-label ">葉尖間隙, mm</label>
                <input type="number" step="any" className="form-control" id="tipClearance" {...register("tipClearance")} />
              </div>
              <div className="col-md-4">
                <label htmlFor="bladeNumExpect" className="form-label ">客戶預期葉片數</label>
                <select name="bladeNumExpect" id="bladeNumExpect" className="form-select" {...register("bladeNumExpect")}>
                  <option value="1">無預期</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                </select>
              </div>
              <div className="col-md-4">
                <label htmlFor="shaftAngle" className="form-label ">斜軸角度, 度</label>
                <input type="number" step="any" className="form-control" id="shaftAngle" {...register("shaftAngle")} />
              </div>
            </div>
          </div>
        </div>
        {/* 設計資料 */}
        <div className="card design-card">
          <div className="card-body">
            <div className="card-title text-primary d-flex justify-content-center">
              <h5 className="h5"><i className="bi bi-5-circle"></i> 設計資料</h5>
            </div>
            <div className="row g-3">
              <div className="col-7 col-lg-2">
                <label htmlFor="propellerDiameter" className="form-label ">螺槳直徑</label>
                <input type="number" step="any" className="form-control" id="propellerDiameter" {...register("propellerDiameter")} />
              </div>
              <div className="col-5 col-lg-2">
                <label htmlFor="diameterUnit" className="form-label ">單位</label>
                <select name="diameterUnit" id="diameterUnit" className="form-select" {...register("diameterUnit")}>
                  <option value="mm">mm</option>
                  <option value="inch">inch</option>
                </select>
              </div>
              <div className="col-7 col-lg-2">
                <label htmlFor="propellerPitch" className="form-label ">螺槳螺距</label>
                <input type="number" step="any" className="form-control" id="propellerPitch" {...register("propellerPitch")} />
              </div>
              <div className="col-5 col-lg-2">
                <label htmlFor="pitchUnit" className="form-label ">單位</label>
                <select name="pitchUnit" id="pitchUnit" className="form-select" {...register("pitchUnit")}>
                  <option value="mm">mm</option>
                  <option value="inch">inch</option>
                </select>
              </div>
              <div className="col-5 col-lg-2">
                <label htmlFor="bladeNum" className="form-label ">葉片數</label>
                <select name="bladeNum" id="bladeNum" className="form-select" {...register("bladeNum")}>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                </select>
              </div>
              <div className="col-7 col-lg-2">
                <label htmlFor="DAR" className="form-label ">面積比</label>
                <input type="number" step="any" className="form-control" id="DAR" {...register("DAR")} />
              </div>
              <div className="col-6 col-lg-4">
                <label htmlFor="designSpeed" className="form-label ">設計船速, kn</label>
                <input type="number" step="any" className="form-control" id="designSpeed" {...register("designSpeed")} />
              </div>
              <div className="col-6 col-lg-4">
                <label htmlFor="designLoaded" className="form-label ">設計載重, tons</label>
                <input type="number" step="any" className="form-control" id="designLoaded" {...register("designLoaded")} />
              </div>
              <div className="col-6 col-lg-2">
                <label htmlFor="LH" className="form-label ">左旋</label>
                <select name="LH" id="LH" className="form-select" {...register("LH")}>
                  <option value="0">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                </select>
              </div>
              <div className="col-6 col-lg-2">
                <label htmlFor="RH" className="form-label ">右旋</label>
                <select name="RH" id="RH" className="form-select" {...register("RH")}>
                  <option value="0">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        {/* 備注 */}
        <div className="card note-card">
          <div className="card-body">
            <div className="card-title text-primary d-flex justify-content-center">
              <h5 className="h5"><i className="bi bi-6-circle"></i> 備注</h5>
            </div>
            <textarea className="form-control" id="note" rows="3" {...register("note")}></textarea>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-end">
        <button type="button" className="btn btn-secondary me-3 px-5" disabled={loading}
        onClick={() => reset()}>重置</button>
        <button type="submit" className="btn btn-primary px-5" disabled={loading}>{loading ? <BeatLoader size={6} color="#fff"/> : "提交"}</button>
      </div>
    </form>
  )
}