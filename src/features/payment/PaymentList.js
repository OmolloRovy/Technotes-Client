import React from "react";
import { useGetPaymentsQuery } from "./paymentsApiSlice";
import Payment from "./Payment";
import { PulseLoader } from "react-spinners";
import useTitle from "../../hooks/useTItle";

const PaymentList = () => {

useTitle('TechNotes : Payment Lists')
  const {
    data: payments,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetPaymentsQuery('paymentsList',{
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true
  });

  let content;

  

  if (isLoading) return <PulseLoader color={"#FFF"} />

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
            {/* <th scope="col" className="table__th user__created">
            Updated
            </th> */}
            <th scope="col" className="table__th user__created">
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

export default PaymentList;
