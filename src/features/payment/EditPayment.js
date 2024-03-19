import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectPaymentById } from './paymentsApiSlice'

import EditPaymentForm from './EditPaymentForm'
const EditPayment = () => {
  const { id } = useParams()

    const payment = useSelector(state => selectPaymentById(state, id))
    

    const content =payment ? <EditPaymentForm payment={payment}/> : <p>Loading...</p>

    return content
}

export default EditPayment