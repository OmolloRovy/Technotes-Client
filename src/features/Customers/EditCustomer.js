import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCustomerById } from './customersApiSlice'
import EditCustomerForm from './EditCustomerForm'
import React from 'react'

const EditCustomer = () => {
  const { id } = useParams()

    const customer = useSelector(state => selectCustomerById(state, id))

    const content = customer ? <EditCustomerForm customer={customer} /> : <p>Loading...</p>

    return content
}

export default EditCustomer

