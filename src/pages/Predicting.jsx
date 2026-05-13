import { useState, useEffect } from "react"


export default function Predicting() {

  const [ lwl, setLwl ] = useState(0);
  const [ displacement, setDisplacement ] = useState(0);
  const [ horsepower, setHorsepower ] = useState(0);
  const [ machineNum, setMachineNum ] = useState(2);
  const [ unitValue, setUnitValue ] = useState(1);
  const [ predictedSpeed, setPredictedSpeed ] = useState(0);

  const calculateSpeed = () => {
    const speed = ( lwl ** 0.425 * ( horsepower * unitValue * machineNum ) ** 0.629 ) / ( 1.107 * ( displacement ** 0.708 ) );
    setPredictedSpeed(speed);
  }

  useEffect(() => {
    calculateSpeed();
  }, [ lwl, displacement, horsepower, machineNum, unitValue ])

  return (
    <div className="predicting p-5">
      <div className="row">
        <div className="col-4 lwl mb-3">
          <label htmlFor="lwl" className="form-label">LWL (Length Waterline, m)</label>
          <input id="lwl" type="number" className="form-control" value={lwl} onChange={(e) => setLwl(parseFloat(e.target.value))} />
        </div>
        <div className="col-4 displacement mb-3">
          <label htmlFor="displacement" className="form-label">Displacement (tons)</label>
          <input id="displacement" type="number" className="form-control" value={displacement} onChange={(e) => setDisplacement(parseFloat(e.target.value))} />
        </div>
      </div>
      <div className="horsepower mb-3 row">
        <div className="col-4">
          <label htmlFor="horsepower" className="form-label">Horsepower</label>
          <input id="horsepower" type="number" className="form-control" value={horsepower} onChange={(e) => setHorsepower(parseFloat(e.target.value))} />
        </div>
        <div className="unit col-4">
          <div className="d-flex flex-column">
            <div className="col-4 form-check form-check-inline">
              <input name="power" id="kW" type="radio" className="form-check-input" value={1} 
              onClick={() => {
                setUnitValue(1.34102);
              }}/>
              <label htmlFor="kW" className="form-check-label">kW</label>
            </div>
            <div className="col-4 form-check form-check-inline">
              <input name="power" id="HP" type="radio" className="form-check-input" value={0.7457} 
              onClick={() => {
                setUnitValue(1);
              }}/>
              <label htmlFor="HP" className="form-check-label">HP</label>
            </div>
            <div className="col-4 form-check form-check-inline">
              <input name="power" id="PS" type="radio" className="form-check-input" value={0.7355} 
              onClick={() => {
                setUnitValue(1.0139);
              }}/>
              <label htmlFor="PS" className="form-check-label">PS</label>
            </div>
          </div>
        </div>
      </div>
      <div className="machineNum mb-3 row">
        <div className="col-4">
          <label htmlFor="machineNum" className="form-label">Machine Number</label>
          <input id="machineNum" type="number" className="form-control" value={machineNum} 
          onChange={(e) => setMachineNum(parseInt(e.target.value))} />
        </div>
      </div>
      <p className="fs-6">預估船速：{predictedSpeed.toFixed(2)} knots</p>
    </div>
  )
}