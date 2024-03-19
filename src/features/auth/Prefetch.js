import { store } from '../../app/store'
import { notesApiSlice } from '../notes/notesApiSlice'
import { usersApiSlice } from '../users/usersApiSlice';
import {paymentsApiSlice} from '../payment/paymentsApiSlice'
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const Prefetch = () => {
    
    useEffect(() => {
           store.dispatch(notesApiSlice.util.prefetch('getNotes', 'notesList', { force: true }))
        store.dispatch(usersApiSlice.util.prefetch('getUsers', 'usersList', { force: true }))
        store.dispatch(paymentsApiSlice.util.prefetch('getPayments', 'paymentsList', { force: true }))
        

    }, [])

    return <Outlet />
}
export default Prefetch
