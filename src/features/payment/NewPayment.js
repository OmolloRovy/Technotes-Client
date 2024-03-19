import { useSelector } from 'react-redux'
import { selectAllPayments } from '../payment/paymentsApiSlice'
import NewPaymentForm from './NewPaymentForm'

const NewPayment  = () => {
    const payments = useSelector(selectAllPayments)

    if (!payments?.length) return <p>Not Currently Available</p>

    const content = <NewPaymentForm payments={payments} />

    return content
}
export default NewPayment  