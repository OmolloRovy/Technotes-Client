/* eslint-disable no-unused-vars */
import React from "react";
import { useGetCustomersQuery } from "./customersApiSlice";
import Customer from "./Customer";

const CustomerList = () => {
  const {
    data: customers,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetCustomersQuery();

  let content;

  if (isLoading) content = <p>Loading...</p>;

  if (isError) {
    content = <p className="errmsg">{error?.data?.message}</p>;
  }

  if (isSuccess) {
    const { ids } = customers;

    const tableContent = ids?.length
      ? ids.map((customerId) => (
          <Customer key={customerId} customerId={customerId} />
        ))
      : null;

    content = (
      <table className="table table--users">
        <thead className="table__thead">
          <tr>
            <th scope="col" className="table__th note__created">
               Customer Name
            </th>
            <th scope="col" className="table__th note__created">
              Email
            </th>
            <th scope="col" className="table__th note__created">
              Address
            </th>
            <th scope="col" className="table__th note__created">
              Phone Number
            </th>
            <th scope="col" className="table__th note__created">
              Device Details
            </th>
            <th scope="col" className="table__th user__edit">
              Edit
            </th>
          </tr>
        </thead>
        <tbody>{tableContent}</tbody>
      </table>
    );
  }

  return content;
};

export default CustomerList;
