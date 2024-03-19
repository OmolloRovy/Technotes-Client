import React from 'react'
import { useParams } from 'react-router-dom'
import EditPaymentForm from './EditPaymentForm'
import { useGetPaymentsQuery } from './paymentsApiSlice'
import { PulseLoader } from 'react-spinners/PulseLoader'

const EditPayment = () => {
  const { id } = useParams()

   const { payment } = useGetPaymentsQuery("paymentsList", {
    selectFromResult: ({ data }) =>({
      payment: data?.entities[id]
    }),
   })
    if (!payment) return <PulseLoader color={"#FFF"} />

    const content = <EditPaymentForm payment={payment}/> 

    return content
}
export default EditPayment