import React from 'react'

const InputType = ({labelText,lebalFor,inputType,value,onChange,name}) => {
  return (
    <div className="mb-1">
      <label htmlFor={lebalFor} className="form-label">
        {labelText}
      </label>

      <input type={inputType}
        className="form-control"
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

export default InputType;