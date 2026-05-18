import { useState } from "react"


export default function Predicting() {

  const [ lwl, setLwl ] = useState(0);
  const [ displacement, setDisplacement ] = useState(0);
  const [ horsepower, setHorsepower ] = useState(0);
  const [ machineNum, setMachineNum ] = useState(2);
  const [ unitValue, setUnitValue ] = useState(0.7457);
  const [ predictedSpeed, setPredictedSpeed ] = useState(0);

  const calculateSpeed = () => {
    const speed = ( lwl ** 0.425 * ( horsepower * unitValue * machineNum ) ** 0.629 ) / ( 1.107 * ( displacement ** 0.708 ) );
    setPredictedSpeed(speed);
  }

  return (
    <div className="predicting">
      <h2 className="h2 mb-4 chiron-round-500">船速預估</h2>
      <div className="row">
        <div className="col-4 lwl mb-3">
          <label htmlFor="lwl" className="form-label">LWL (Length Waterline, m)</label>
          <input id="lwl" type="number" className="form-control" value={lwl} onChange={(e) => {
              setLwl(parseFloat(e.target.value));
              calculateSpeed();
            }} />
        </div>
        <div className="col-4 displacement mb-3">
          <label htmlFor="displacement" className="form-label">Displacement (tons)</label>
          <input id="displacement" type="number" className="form-control" value={displacement} onChange={(e) => {
              setDisplacement(parseFloat(e.target.value));
              calculateSpeed();
            }} />
        </div>
      </div>
      <div className="horsepower mb-3 row">
        <div className="col-4">
          <label htmlFor="horsepower" className="form-label">Horsepower</label>
          <input id="horsepower" type="number" className="form-control" value={horsepower} onChange={(e) => {
              setHorsepower(parseFloat(e.target.value));
              calculateSpeed();
            }} />
        </div>
        <div className="unit col-4 d-flex align-items-end">
          <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
            <input type="radio" className="btn-check" name="power" id="HP" value={0.7457} checked={unitValue === 0.7457} onChange={() => {
                setUnitValue(0.7457);
                calculateSpeed();
              }}/>
            <label className="btn btn-outline-primary" htmlFor="HP">HP</label>
            <input type="radio" className="btn-check" name="power" id="PS" value={0.7355} checked={unitValue === 0.7355} onChange={() => {
                setUnitValue(0.7355);
                calculateSpeed();
              }}/>
            <label className="btn btn-outline-primary" htmlFor="PS">PS</label>
            <input type="radio" className="btn-check" name="power" id="kW" value={1} checked={unitValue === 1} onChange={() => {
                setUnitValue(1);
                calculateSpeed();
              }}/>
            <label className="btn btn-outline-primary" htmlFor="kW">kW</label>
          </div>
        </div>
      </div>
      <div className="machineNum mb-3 row">
        <div className="col-4">
          <label htmlFor="machineNum" className="form-label">Machine Number</label>
          <input id="machineNum" type="number" className="form-control" value={machineNum} 
          onChange={(e) => {
              setMachineNum(parseInt(e.target.value));
              calculateSpeed();
            }} />
        </div>
      </div>
      <p className="fs-6">預估船速：{predictedSpeed.toFixed(2)} knots</p>
    </div>
  )
}