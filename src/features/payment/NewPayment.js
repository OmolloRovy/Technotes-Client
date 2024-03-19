import NewPaymentForm from './NewPaymentForm'
import { useGetPaymentsQuery } from '../payment/paymentsApiSlice'
import PulseLoader from 'react-spinners/PulseLoader'

const NewPayment  = () => {
    const { payments } = useGetPaymentsQuery ("paymentsList", {
        selectFromResult: ({ data }) => ({
            payments: data?.ids.map(id => data?.entities[id])
        }),
    })

    if (!payments?.length) return <PulseLoader color={"#FFF"}/>

    const content = <NewPaymentForm payments={payments} />

    return content
}
export default NewPayment  