import { useState } from 'react'

function form({ getData }) {
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [alert, setAlert] = useState(false)
  const onSubmit = (e) => {
    e.preventDefault()
    if (isNaN(weight) || isNaN(height)) {
      setAlert(true)
    } else {
      getData(weight, height)
      setAlert(false)
    }
  }
  // let alertMessage
  // if(alert){
  // alertMessage=<div className="alert alert-danger" role="alert">Please Enter A valid Input</div>
  // }
  // else{
  // alertMessage="";
  // }
  return (
    <div className="col-sm-4 shadow rounded px-5">
      <h1 className="text-center pt-3 text-secondary h2">BMI Calculator</h1>
      <form onSubmit={onSubmit}>
        <div className="row">
          <div className="col col-sm-6">
            <label className="form-label">Weight(Kg):</label>
            <input
              type="text"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="form-control"
              required
            />
          </div>
        </div>

        <div className="row">
          <div className="col col-sm-6">
            <label className="form-label">Height(m):</label>
            <input
              type="text"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="form-control"
              required
            />
          </div>
        </div>
        <input type="submit" className="btn btn-primary my-3" value="Get BMI" />
      </form>
      {/* alert? <div className="alert alert-danger" role="alert">Plz enter a valid data</div>:null */}
      {alert && (
        <div className="alert alert-danger" role="alert">
          Plz enter a valid data
        </div>
      )}
    </div>
  )
}

export default form
