import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAddNewPaymentMutation } from "./paymentsApiSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";

const NewPaymentForm = () => {
  const [addNewPayment, { isLoading, isSuccess, isError, error }] =
    useAddNewPaymentMutation();

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [amountPaid, setAmountPaid] = useState("");
  const [change, setChange] = useState("");
  const [otherMethods, setOtherMethods] = useState("");
  const [remarks, setRemarks] = useState("");


  useEffect(() => {
    if (isSuccess) {
      setName("");
      setAmountPaid("");
      setChange("");
      setOtherMethods("");
      setRemarks("");
      navigate("/dash/payments");
    }
  }, [isSuccess, navigate]);

  const onNameChanged = (e) => setName(e.target.value);
  const onAmountPaidChanged = (e) => setAmountPaid(e.target.value);
  const onChangeChanged = (e) => setChange(e.target.value);
  const onOtherMethodsChanged = (e) => setOtherMethods(e.target.value);
  const onRemarksChanged = (e) => setRemarks(e.target.value);

  const canSave =
    [name, amountPaid, change, otherMethods, remarks].every(Boolean) &&
    !isLoading;

  const onSavePaymentClicked = async (e) => {
    e.preventDefault();
    try{
    if (canSave) {
      await addNewPayment({
        name,
        amountPaid,
        change,
        otherMethods,
        remarks,
      });
    }
  }catch(error){
    console.log("erro here: ", error)
  }
  };


  const errClass = isError ? "errmsg" : "offscreen";
  const validNameClass = !name ? "form__input--incomplete" : "";
  const validAmountPaidClass = !amountPaid ? "form__input--incomplete" : "";
  const validChangeClass = !change ? "form__input--incomplete" : "";
  const validOtherMethodsClass = !otherMethods ? "form__input--incomplete" : "";
  const validRemarksClass = !remarks ? "form__input--incomplete" : "";

  const content = (
    <>
      <p className={errClass}>{error?.data?.message}</p>

      <form className="form" onSubmit={onSavePaymentClicked}>
        <div className="form__title-row">
          <h2>New payment</h2>
          <div className="form__action-buttons">
            <button className="icon-button" title="Save" disabled={!canSave}>
              <FontAwesomeIcon icon={faSave} />
            </button>
          </div>
        </div>
        <label className="form__label" for="name">
          Customer Name
        </label>
        <input
          className={`form__input ${validNameClass}`}
          id="name"
          name="name"
          type="text"
          autoComplete="off"
          value={name}
          onChange={onNameChanged}
        />
        <label className="form__label" for="amountPaid">
          Amount Paid
        </label>
        <input
          className={`form__input ${validAmountPaidClass}`}
          id="amountPaid"
          name="amountPaid"
          type="text"
          autoComplete="off"
          value={amountPaid}
          onChange={onAmountPaidChanged}
        />
        <label className="form__label" for="change">
          Return Change
        </label>
        <input
          className={`form__input ${validChangeClass}`}
          id="change"
          name="change"
          type="text"
          autoComplete="off"
          value={change}
          onChange={onChangeChanged}
        />

        <label className="form__label" for="otherMethods">
          Other Methods Used
        </label>
        <input
          className={`form__input ${validOtherMethodsClass}`}
          id="otherMethods"
          name="otherMethods"
          type="text"
          autoComplete="off"
          value={otherMethods}
          onChange={onOtherMethodsChanged}
        />

        <label className="form__label" for="remarks">
          Remarks
        </label>
        <textarea
          className={`form__input form__input--text ${validRemarksClass}`}
          id="remarks"
          name="remarks"
          value={remarks}
          type="text"
          onChange={onRemarksChanged}
        />

      </form>
    </>
  );

  return content;
};

export default NewPaymentForm;
