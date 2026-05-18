import DataModal from "./DataModal";


export default function ViewModal({viewModalRef, viewModalInstance, propsData, dataModalInstance}) {
  return (
    <div className="modal modal-xl" tabIndex="-1" ref={viewModalRef}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{propsData.title}
              <span className={`badge ms-3 fs-6 ${propsData.is_enabled ? "text-bg-success" : "text-bg-secondary"}`}>{propsData.is_enabled ? "已結案" : "未結案"}</span>
            </h5>
            <button type="button" className="btn-close" aria-label="Close"
              onClick={() => {
                viewModalInstance.current.hide();
              }}
            ></button>
          </div>
          <div className="modal-body">
            <div className="alert alert-secondary py-2 text-secondary"><i className="bi bi-info-circle"></i> 此為唯讀模式，資料僅供檢視，無法進行編輯。</div>
            <div className="baseInfo card mb-3">
              <div className="card-header d-flex justify-content-between py-2">
                <h4 className="h6 m-0">基本資料</h4>
              </div>
              <div className="card-body px-4 py-2 chiron-round-500">
                <div className="row g-2">
                  <div className="col-md-3">
                    <h5 className="h6">客戶</h5>
                    <p className="fs-5">{propsData.customerName}</p>
                  </div>
                  <div className="col-md-3">
                    <h5 className="h6">船名</h5>
                    <p className="fs-5">{propsData.title}</p>
                  </div>
                  <div className="col-md-3">
                    <h5 className="h6">聯絡人</h5>
                    <p className="fs-5">{propsData.contactInfo || "--"}</p>
                  </div>
                  <div className="col-md-3">
                    <h5 className="h6">登錄日期</h5>
                    <p className="fs-5">{propsData.date}</p>
                  </div>
                  <div className="col-md-4">
                    <h5 className="h6">電子郵件</h5>
                    <p className="fs-5">{propsData.email || "--"}</p>
                  </div>
                  <div className="col-md-4">
                    <h5 className="h6">電話</h5>
                    <p className="fs-5">{propsData.phone || "--"}</p>
                  </div>
                  <div className="col-md-4">
                    <h5 className="h6">傳真</h5>
                    <p className="fs-5">{propsData.fax || "--"}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="boatInfo card mb-3">
              <div className="card-header d-flex justify-content-between py-2">
                <h4 className="h6 m-0">船體資料</h4>
              </div>
              <div className="card-body px-4 py-2 chiron-round-500">
                <div className="row g-2">
                  <div className="col-md-4">
                    <h5 className="h6">船型</h5>
                    <p className="fs-5">{propsData.boatType}</p>
                  </div>
                  <div className="col-md-4">
                    <h5 className="h6">船底設計</h5>
                    <p className="fs-5">{propsData.category}</p>
                  </div>
                  <div className="col-md-4">
                    <h5 className="h6">船殼材料</h5>
                    <p className="fs-5">{propsData.hullMaterial}</p>
                  </div>
                  <div className="col-md-4">
                    <h5 className="h6">LOA</h5>
                    <p className="fs-5">{propsData.LOA || "--"}</p>
                  </div>
                  <div className="col-md-4">
                    <h5 className="h6">LWL</h5>
                    <p className="fs-5">{propsData.LWL || "--"}</p>
                  </div>
                  <div className="col-md-4">
                    <h5 className="h6">BWL</h5>
                    <p className="fs-5">{propsData.BWL || "--"}</p>
                  </div>
                  <div className="col-md-4">
                    <h5 className="h6">輕載</h5>
                    <p className="fs-5">{propsData.lightLoaded || "--"}</p>
                  </div>
                  <div className="col-md-4">
                    <h5 className="h6">半載</h5>
                    <p className="fs-5">{propsData.halfLoaded || "--"}</p>
                  </div>
                  <div className="col-md-4">
                    <h5 className="h6">滿載</h5>
                    <p className="fs-5">{propsData.fullLoaded || "--"}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="MEInfo card mb-3">
              <div className="card-header d-flex justify-content-between py-2">
                <h4 className="h6 m-0">主機資料</h4>
              </div>
              <div className="card-body px-4 py-2 chiron-round-500">
                <div className="row g-2">
                  <div className="col-md-4">
                    <h5 className="h6">主機廠牌</h5>
                    <p className="fs-5">{propsData.MEBrand || "--"}</p>
                  </div>
                  <div className="col-md-4">
                    <h5 className="h6">主機型號</h5>
                    <p className="fs-5">{propsData.MEModel || "--"}</p>
                  </div>
                  <div className="col-md-4">
                    <h5 className="h6">主機數量</h5>
                    <p className="fs-5">{propsData.unit}</p>
                  </div>
                  <div className="col-md-4">
                    <h5 className="h6">額定馬力</h5>
                    <p className="fs-5">{propsData.ratedPower}</p>
                  </div>
                  <div className="col-md-4">
                    <h5 className="h6">馬力單位</h5>
                    <p className="fs-5">{propsData.MEUnit}</p>
                  </div>
                  <div className="col-md-4">
                    <h5 className="h6">額定轉速</h5>
                    <p className="fs-5">{propsData.ratedRPM}</p>
                  </div>
                  <div className="col-md-4">
                    <h5 className="h6">齒輪機廠牌</h5>
                    <p className="fs-5">{propsData.gearboxBrand || "--"}</p>
                  </div>
                  <div className="col-md-4">
                    <h5 className="h6">齒輪機型號</h5>
                    <p className="fs-5">{propsData.gearboxModel || "--"}</p>
                  </div>
                  <div className="col-md-4">
                    <h5 className="h6">齒輪比</h5>
                    <p className="fs-5">{propsData.gearRatio}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="spaceInfo card mb-3">
              <div className="card-header d-flex justify-content-between py-2">
                <h4 className="h6 m-0">螺槳空間資料</h4>
              </div>
              <div className="card-body px-4 py-2 chiron-round-500">
                <div className="row g-2">
                  <div className="col-md-4">
                    <h5 className="h6">最大螺槳直徑空間</h5>
                    <p className="fs-5">{propsData.maxDiameter || "--"}</p>
                  </div>
                  <div className="col-md-4">
                    <h5 className="h6">沒水深度</h5>
                    <p className="fs-5">{propsData.shaftDepth || "--"}</p>
                  </div>
                  <div className="col-md-4">
                    <h5 className="h6">葉尖間隙</h5>
                    <p className="fs-5">{propsData.tipClearance || "--"}</p>
                  </div>
                  <div className="col-md-4">
                    <h5 className="h6">客戶預期葉片數</h5>
                    <p className="fs-5">{propsData.bladeNumExpect}</p>
                  </div>
                  <div className="col-md-4">
                    <h5 className="h6">斜軸角度</h5>
                    <p className="fs-5">{propsData.shaftAngle || "--"}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="designInfo card">
              <div className="card-header d-flex justify-content-between py-2">
                <h4 className="h6 m-0">設計資料</h4>
              </div>
              <div className="card-body px-4 py-2 chiron-round-500">
                <div className="row g-2">
                  <div className="col-md-4">
                    <h5 className="h6">螺槳尺寸</h5>
                    <p className="fs-5">{propsData.propellerDiameter + propsData.diameterUnit
                                          + " x " 
                                          + propsData.propellerPitch + propsData.pitchUnit
                                          + " x "
                                          + propsData.bladeNum + "B x " + propsData.DAR
                                          || "--"}</p>
                  </div>
                  <div className="col-md-4">
                    <h5 className="h6">設計船速</h5>
                    <p className="fs-5">{propsData.designSpeed || "--"}</p>
                  </div>
                  <div className="col-md-4">
                    <h5 className="h6">設計載重</h5>
                    <p className="fs-5">{propsData.designLoaded}</p>
                  </div>
                  <div className="col-md-4">
                    <h5 className="h6">左旋數量</h5>
                    <p className="fs-5">{propsData.LH}</p>
                  </div>
                  <div className="col-md-4">
                    <h5 className="h6">右旋數量</h5>
                    <p className="fs-5">{propsData.RH}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-success" 
              onClick={() => {
                viewModalInstance.current.hide();
                dataModalInstance.current.show();
              }}
            >編輯</button>
            <button type="button" className="btn btn-secondary"
              onClick={() => {
                viewModalInstance.current.hide();
              }}
            >關閉</button>
          </div>
        </div>
      </div>
      <DataModal dataModalInstance={dataModalInstance} propsData={propsData} />
    </div>
  )
}