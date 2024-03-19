/* eslint-disable no-unused-vars */
import React from 'react'
import { useState, useEffect } from "react"
import { useUpdateCustomerMutation, useDeleteCustomerMutation } from "./customersApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons" 

const USER_REGEX = /@.com/


const EditCustomerForm = ({customer}) => {

  const [updateCustomer, {
    isLoading,
    isSuccess,
    isError,
    error
}] = useUpdateCustomerMutation()

const [deleteCustomer, {
    isSuccess: isDelSuccess,
    isError: isDelError,
    error: delerror
}] = useDeleteCustomerMutation()
 
const navigate = useNavigate()

            const [name, setName] = useState('')
            const [email, setEmail] = useState('')
            const [validEmail, setValidEmail] = useState(false)
            const [address, setAddress] = useState('')
            const [phone_number, setPhone_number] = useState('')
            const [device_details, setDevice_details] = useState('')
 
            useEffect(() => {
              setValidEmail(USER_REGEX.test(email))
          }, [email])

          useEffect(() => {
            if (isSuccess || isDelSuccess ) {
                setName('')
                setEmail('')
                setAddress('')
                setPhone_number('')
                setDevice_details('')
                navigate('/dash/customers')
            }
        }, [isSuccess,isDelSuccess, navigate])
        const onNameChanged = e => setName(e.target.value)
        const onEmailChanged = e => setEmail(e.target.value)
        const onAddressChanged = e => setAddress(e.target.value)
        const onPhone_numberChanged = e => setPhone_number(e.target.value)
        const onDevice_detailsChanged = e => setDevice_details(e.target.value)
       
      const onDeleteCustomerClicked = async ()=>{
        await deleteCustomer({id: customer.id})
      } 

      const canSave = [ name, validEmail, address, phone_number, device_details].every(Boolean) && !isLoading

      const onSaveCustomerClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            await updateCustomer({id: customer.id, name,email,address,phone_number,device_details })
        }
    }

    const errClass = isError ? "errmsg" : "offscreen"
    const validNameClass = !name ? "form__input--incomplete" : ''
    const validEmailClass = !validEmail ? 'form__input--incomplete' : ''
    const validAddressClass = !address? "form__input--incomplete" : ''
    const validPhone_numberClass = !phone_number? "form__input--incomplete" : ''
    const validDevice_detailsClass = !device_details? "form__input--incomplete" : ''
  
    const content = (
      <>
          <p className={errClass}>{error?.data?.message}</p>

          <form className="form" onSubmit={e => e.preventDefault()}>
              <div className="form__title-row">
                  <h2>Edit Customer</h2>
                  <div className="form__action-buttons">
                      <button
                          className="icon-button"
                          title="Save"
                          onClick={onSaveCustomerClicked}
                          disabled={!canSave}
                      >
                          <FontAwesomeIcon icon={faSave} />
                      </button>
                      <button 
                      className='icon-button'
                      title="Delete"
                      onClick={onDeleteCustomerClicked}
                      >
                          <FontAwesomeIcon icon={faTrashCan} />
                      </button>
                  </div>
              </div>
              <label className="form__label" htmlFor="name">
                  Name: </label>
              <input
                  className={`form__input ${validNameClass}`}
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="off"
                  value={name}
                  onChange={onNameChanged}
              />

              <label className="form__label" htmlFor="email">
                  Email: <span className="nowrap1">[incl. @]</span></label>
              <input
                  className={`form__input ${validEmailClass}`}
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={onEmailChanged}
              />
<label className="form__label" htmlFor="address">
                  Address: </label>
              <input
                  className={`form__input ${validAddressClass}`}
                  id="address"
                  name="address"
                  type="text"
                  value={address}
                  onChange={onAddressChanged}
              />
              
              <label className="form__label" htmlFor="phone_number">
                  Phone Number: </label>
              <input
                  className={`form__input ${validPhone_numberClass}`}
                  id="phone_number"
                  name="phone_number"
                  type="integer"
                  value={phone_number}
                  onChange={onPhone_numberChanged}
                  
              />
              
              <label className="form__label" htmlFor="device_details">
                  Device Details:</label>
              <input
                  className={`form__input ${validDevice_detailsClass}`}
                  id="device_details"
                  name="device_details"
                  type="text"
                  value={device_details}
                  onChange={onDevice_detailsChanged}
                  
              />


          </form>
      </>
  )
return content 
}

export default EditCustomerForm