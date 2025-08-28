import React,{useState} from 'react'
import InputType from './InputType';
import {Link} from "react-router-dom";
import { handleLogin, handleRegister } from '../../../services/authServuce';
// import Register from './../../../pages/auth/Register';

const Form = ({formType,submitBtn,formTitle}) => {
  const [email, setEmail]=useState("");
  const [password, setPassword]=useState("");
  const [role, setRole]=useState("");
  const [name, setName]=useState("");
  const [organisationName, setOrganisationName]=useState("");
  const [hospitalName, setHospitalName]=useState("");
  const [website, setWebsite]=useState("");
  const [address, setAddress]=useState("");
  const [phone, setPhone]=useState("");
  return (
    <div>
      <form 
        onSubmit={(e)=>{
          if(formType==='login') 
            return handleLogin(e,email,password,role);
          else if(formType==='register') 
            return handleRegister(e,name,role,email,password,organisationName,hospitalName,website,address,phone);
        }}
      >
        <h1 className='text-center'>{formTitle}</h1>
        <hr></hr>

        <div className='d-flex mb-3'>
          <div className='form-check'>
            <input 
              type='radio'
              className='form-check-input'
              name='role'
              id='donarRadio'
              value={"donar"}
              onChange={(e)=>setRole(e.target.value)}
              defaultChecked
            />
            <label htmlFor='donarRadio' className='form-check-lebel'>
              Donar
            </label>
          </div>

          <div className='form-check ms-2'>
            <input 
              type='radio'
              className='form-check-input'
              name='role'
              id='adminRadio'
              value={'admin'}
              onChange={(e)=>setRole(e.target.value)}
            />
            <label htmlFor='adminRadio' className='form-check-lebel'>
              Admin
            </label>
          </div>

          <div className='form-check ms-2'>
            <input 
              type='radio'
              className='form-check-input'
              name='role'
              id='hospitalRadio'
              value={"hospital"}
              onChange={(e)=>setRole(e.target.value)}
            />
            <label htmlFor='hospitalRadio' className='form-check-lebel'>
              Hospital
            </label>
          </div>

          <div className='form-check ms-2'>
            <input 
              type='radio'
              className='form-check-input'
              name='role'
              id='organisationRadio'
              value={"organisation"}
              onChange={(e)=>setRole(e.target.value)}
              defaultChecked
            />
            <label htmlFor='organisationRadio' className='form-check-lebel'>
              Organisation
            </label>
          </div>
        </div>

        {/* switch statement */}
        {(()=>{
          //eslint-disable-next-line
          switch(true){
            case formType ==='login':{
              return(
                <>
                  <InputType 
                    labelText="Enter Email" 
                    labelFor="email" 
                    inputType="email" 
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <InputType 
                    labelText={"Enter Password"} 
                    lebalFor={"forPassword"} 
                    inputType={"password"} 
                    name={"password"}
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                  />
                </>
              );
            }
            case formType === "register":{
              return(
                <>
                  <InputType 
                    labelText={"Role"} 
                    lebalFor={"role"} 
                    inputType={""} 
                    name={"role"}
                    value={role}
                    onChange={(e)=>setRole(e.target.value)}
                  />
                  
                  {(role === 'admin' || role === 'donar') &&(
                    <InputType 
                    labelText={"Name"} 
                    lebalFor={"forName"} 
                    inputType={"text"} 
                    name={"name"}
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                  />
                  )}
                  
                  {role === 'organisation' &&(
                    <InputType 
                    labelText={"Organisation Name"} 
                    lebalFor={"organisationName"} 
                    inputType={"text"} 
                    name={"organisationName"}
                    value={organisationName}
                    onChange={(e)=>setOrganisationName(e.target.value)}
                  />
                  )}
                  
                  {role === "hospital" &&(
                    <InputType 
                    labelText={"HospitalName"} 
                    lebalFor={"forhospitalName"} 
                    inputType={"text"} 
                    name={"hospitalName"}
                    value={hospitalName}
                    onChange={(e)=>setHospitalName(e.target.value)}
                  />
                  )}
                  
                  <InputType 
                    labelText={"Enter Email"} 
                    lebalFor={"for Email"} 
                    inputType={"email"} 
                    name={"email"}
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                  />

                  <InputType 
                    labelText={"Enter Password"} 
                    lebalFor={"forPassword"} 
                    inputType={"password"} 
                    name={"password"}
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                  />
                  <InputType 
                    labelText={"Website"} 
                    lebalFor={"website"} 
                    inputType={"text"} 
                    name={"website"}
                    value={website}
                    onChange={(e)=>setWebsite(e.target.value)}
                  />
                  <InputType 
                    labelText={"Address"} 
                    lebalFor={"address"} 
                    inputType={"text"} 
                    name={"address"}
                    value={address}
                    onChange={(e)=>setAddress(e.target.value)}
                  />
                  <InputType 
                    labelText={"Phone"} 
                    lebalFor={"phone"} 
                    inputType={"Number"} 
                    name={"phone"}
                    value={phone}
                    onChange={(e)=>setPhone(e.target.value)}
                  />
                </>
              )
            }
          }
        })()}
        

        <div className='d-flex flex-row justify-content-between'>
          {formType === 'login' ?(
            <p>Not register yet ? Register
              <Link to="/register"> Here !</Link>
            </p>
          ):(
            <p>Already User Please
              <Link to="/login"> Login !</Link>
            </p>
          )}
          <button className='btn btn-primary mt-1' type='submit'>
            {submitBtn}
          </button>
        </div>
      </form>
    </div>
  )
}

export default Form;