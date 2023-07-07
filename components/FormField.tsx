import React from 'react'
type propsTypes ={
    title: string,
    placeholder: string,
    state: string,
    setState: (value : string)=>{},
    type?: string,
    isTextArea?: boolean
}
function FormField({title,placeholder,state,setState,type,isTextArea}:propsTypes) {
  return (
    <div className='flexStart flex-col w-full gap-2'>
        <label className='w-full text-gray-100'>
            {title}
        </label>
        {isTextArea ? (
            <textarea
                placeholder={placeholder}
                value={state} required
                className='form_field-input'
                onChange={(e)=>setState(e.target.value)}
            />
        ) : (
            <input
                type={type || "text"}
                placeholder={placeholder}
                value={state} required
                className='form_field-input'
                onChange={(e)=>setState(e.target.value)}
            />
        )}
    </div>
  )
}

export default FormField