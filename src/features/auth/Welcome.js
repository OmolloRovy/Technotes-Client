import { Link } from "react-router-dom";

const Welcome = () => {
  const date = new Date();
  const today = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "long",
  }).format(date);

  const content = (
    <section className="welcome">
      <p>{today}</p>

      <h1>Welcome!</h1>
      <p>
        <Link to="/dash/notes">
          <button>Created Notes</button>
        </Link>

        <Link to="/dash/notes/new">
          <button>Add New Note</button>
        </Link>

        <Link to="/dash/users">
          <button>Employees</button>
        </Link>

        <Link to="/dash/users/new">
          <button>Add New User</button>
        </Link>
        {/* <Link to="/dash/customers"><button>Customer details</button></Link>
            <Link to="/dash/customers/new"><button>Add New Customer Details</button></Link> */}

        <Link to="/dash/payments">
          <button>Payment details</button>
        </Link>
        <Link to="/dash/payments/new">
          <button>Add New Payment</button>
        </Link>
      </p>
    </section>
  );

  return content;
};
export default Welcome;
