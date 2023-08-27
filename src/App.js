import logo from './logo.svg'
import './App.css'
import Form from './components/Form'
import BmiScore from './components/BmiScore'
import BmiList from './components/BmiList'
import { useState } from 'react'

function App() {
  const [changeWeight,setChangeWeight]= useState({weight:"",type:""});
  const [bmi, setBmi] = useState('00');
  const [bmiType, setBmiType] = useState('Not Calculated');
  const [bmiRange,setBmiRange]=useState({
    underWeight:{low:""},
    normal:{low:"",high:""},
    overWeight:{low:"",high:""},
    obesityOne:{low:"",high:""},
    obesityTwo:{low:"",high:""},
    obesityThree:{high:""},
  });
  const onFormSub = (w, h) => {
    let b = calBmi(w, h)
    setBmi(b)
    // let bType = weightType(b)
    setBmiType(weightType(b))
    const range={
      underWeight:{low:calWeight(18.5,h)},
      normal:{low:calWeight(18.5,h),high:calWeight(24.9,h)},
      overWeight:{low:calWeight(25,h),high:calWeight(29.9,h)},
      obesityOne:{low:calWeight(30,h),high:calWeight(34.9,h)},
      obesityTwo:{low:calWeight(35,h),high:calWeight(39.9,h)},
      obesityThree:{high:calWeight(40,h)},
    };
    setBmiRange(range);
    setChangeWeight(weightChange(b,w,range));
  };
  const calBmi = (w, h) => (w / (h * h)).toFixed(2);
  const calWeight=(b,h)=>(b*h*h).toFixed(2);
const  weightChange=(b,w,range)=>{
  let changeObj;
  if(b>24.9){
    changeObj={
      weight:(w-range.normal.high).toFixed(2),
      type:"positive",
    };
    return changeObj;
  }else if(b<18.5){
    changeObj={
      weight:(range.normal.low-w).toFixed(2),
      type:"negative",
    };
    return changeObj;
  }else{
    changeObj={weight:0,type:"normal"}
     
      return changeObj;
    
  }
}
  const weightType = (bmi) => {
    if (bmi < 18.4) {
      return 'UnderWeight';
    } else if (18.5 < bmi && bmi < 24.9) {
      return 'Normal';
    } else if (24.9 < bmi && bmi < 29.9) {
      return 'OverWeight';
    } else if (29.9 < bmi && bmi < 34.9) {
      return 'Obesity class I';
    } else if (34.9 < bmi && bmi < 39.9) {
      return 'Obesity class II';
    } else if (bmi > 39.9) {
      return 'Obesity class III';
    }
  }

  //let bmi=18;
  // const changeBmi = () => {
  //   setBmi(19)
  //   console.log(bmi)
  // }
  return (
    <div>
      <div className="container">
        <div className="row justify-content-center mt-5 mx-2"></div>
        {/* <div>BMI Calculator</div>
    <div>My BMI is {bmi}</div>
    <button onClick={changeBmi}>Click</button> */}
        <Form getData={onFormSub} />
      </div>
      <div className="row justify-content-center mt-5 mx-2">
        <div className=" col-12 col-sm-6 mb-5">
          <BmiScore bmiNo={bmi} bmiName={bmiType}changeWeight={changeWeight}/>
        </div>
        <div className="col-12 col-sm-6">
          <BmiList range={bmiRange} bmi={bmi}/>
        </div>
      </div>
    </div>
  )
}

export default App
