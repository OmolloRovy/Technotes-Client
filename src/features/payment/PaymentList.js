import React from "react";
import { useGetPaymentsQuery } from "./paymentsApiSlice";
import Payment from "./Payment";
const PaymentList = () => {
  const {
    data: payments,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetPaymentsQuery();

  let content;

  if (isLoading) content = <p>Loading...</p>;

  if (isError) {
    content = <p className="errmsg">{error?.data?.message}</p>;
  }

  if (isSuccess) {
    const { ids } = payments;

    const tableContent = ids?.length
      ? ids.map((paymentId) => (
          <Payment key={paymentId} paymentId={paymentId} />
        ))
      : null;

    content = (
      <table className="table table--notes">
        <thead className="table__thead">
          <tr>
            <th scope="col" className="table__th user__created">
             Customer Name
            </th>
            <th scope="col" className="table__th user_created">
              Amount paid
            </th>
            <th scope="col" className="table__th user__created">
              Change
            </th>
            <th scope="col" className="table__th user__created">
              other Method Used
            </th>
            <th scope="col" className="table__th user__created">
            Remarks
            </th>
          </tr>
        </thead>
        <tbody>{tableContent}</tbody>
      </table>
    );
  }

  return content;
};

export default PaymentList;
