import React from 'react'
import {useNavigate} from "react-router-dom";
import { useSelector } from 'react-redux';
import { selectCustomerById } from './customersApiSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"

const Customer = (customerId) => {
  const customer = useSelector((state) => selectCustomerById(state, customerId));
    const navigate = useNavigate()
    if (customer){
              const handleEdit = () => navigate(`/dash/customers/${customerId}`)
            
              return (
                  <tr className="table__row">
                      <td className="table__cell note__created">{customer.name}</td>
                      <td className="table__cell note__created">{customer.email}</td>
                      <td className="table__cell note__created">{customer.address}</td>
                      <td className="table__cell note__created">{customer.phone_number}</td>
                      <td className="table__cell note__created">{customer.device_details}</td>
                      <td className="table__cell note__created">
                          <button
                              className="icon-button table__button"
                              onClick={handleEdit}
                          >
                              <FontAwesomeIcon icon={faPenToSquare} />
                          </button>
                      </td>
                  </tr>
              )
      
          }else return null
}

export default Customer


