import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
const Welcome = () => {

const {username, isManager, isAdmin} = useAuth()

  const date = new Date();
  const today = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "long",
  }).format(date);

  const content = (
    <section className="welcome">
      <p>{today}</p>

      <h1>Welcome! {username}</h1>
      <p>
        <Link to="/dash/notes">
          <button>Created Notes</button>
        </Link>
      
              
        <Link to="/dash/notes/new">
          <button>Add New Note</button>
        </Link>

        
     {(isAdmin || isManager)  && <Link to="/dash/users">
          <button>Employees</button>
        </Link>}
       

        {(isAdmin || isManager)  && <Link to="/dash/users/new">
          <button>Add New User</button>
        </Link>}
      
        <Link to="/dash/payments">
          <button>Payment details</button>
        </Link>
       
        <Link to="/dash/payments/new">
          <button>Add New Payment</button>
        </Link>
        <br/>
        <br/>
      </p>
    </section>
  );

  return content;
};
export default Welcome;
