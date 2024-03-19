import { store } from '../../app/store'
import { notesApiSlice } from '../notes/notesApiSlice'
import { usersApiSlice } from '../users/usersApiSlice';
import {paymentsApiSlice} from '../payment/paymentsApiSlice'
import {customersApiSlice} from '../Customers/customersApiSlice'

import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const Prefetch = () => {
    useEffect(() => {
        console.log('subscribing')
        const notes = store.dispatch(notesApiSlice.endpoints.getNotes.initiate())
        const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate())
        const customers = store.dispatch(customersApiSlice.endpoints.getCustomers.initiate())
        const payments = store.dispatch(paymentsApiSlice.endpoints.getPayments.initiate())

        return () => {
            console.log('unsubscribing')
            notes.unsubscribe()
            users.unsubscribe()
            customers.unsubscribe()
            payments.unsubscribe()
        }
    }, [])

    return <Outlet />
}
export default Prefetch
