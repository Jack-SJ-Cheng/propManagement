import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router";
import { BeatLoader } from "react-spinners";


const url = import.meta.env.VITE_API_URL;
const api_path = import.meta.env.VITE_API_PATH;



export default function Login() {

  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const res = await axios.post(`${url}/v2/admin/signin`, data);
      console.log("登入成功:", res);
      document.cookie = `HScookie=${res.data.token}; expires=${new Date(res.data.expired)}; path=/`
      // axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      navigate("/");
    } catch (error) {
        console.error("登入失敗:", error);
    } finally { setLoading(false) }
  }

  
  return (
    <div className="container">
      <h2 className="h2 text-center mt-4">螺旋槳設計資料管理系統</h2>
      <div className="row justify-content-center">
        <div className="col-8 col-md-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col-12">
                <label htmlFor="username" className="form-label">使用者名稱</label>
                <input type="text" className="form-control" id="username" placeholder="abc@hungshenprop.com" {...register("username")} />
              </div>
              <div className="col-12">
                <label htmlFor="password" className="form-label">密碼</label>
                <input type="password" className="form-control" id="password" {...register("password")} />
              </div>
            </div>
            <button type="submit" className="btn btn-primary mt-4 col-12">
              {loading ? 
              <BeatLoader
                color="#ffffff"
                size={12}
                /> : <i>登入系統</i>}</button>
          </form>
        </div>
      </div>
    </div>
  )
}