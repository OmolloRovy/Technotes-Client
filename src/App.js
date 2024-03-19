// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Public from "./components/Public";
import Login from "./features/auth/Login";
import DashLayout from "./components/DashLayout";
import Welcome from "./features/auth/Welcome";
import NotesList from "./features/notes/NotesList";
import UsersList from "./features/users/UsersList";
import EditUser from "./features/users/EditUser";
import NewUserForm from "./features/users/NewUserForm";
import EditNote from "./features/notes/EditNote";
import NewNote from "./features/notes/NewNote";
// import CustomerList from "./features/Customers/CustomerList";
// import EditCustomer from "./features/Customers/EditCustomer";
// import NewCustomerForm from "./features/Customers/NewCustomerForm";

import Prefetch from "./features/auth/Prefetch";
import PaymentList from "./features/payment/PaymentList";
import EditPayment from "./features/payment/EditPayment";
import NewPayment from "./features/payment/NewPayment";
function App() {
  return (
    <Routes>
      <Route path="" element={<Layout />}>
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />
        <Route element={<Prefetch />}>
          <Route path="dash" element={<DashLayout />}>
            <Route index element={<Welcome />} />
            <Route path="notes">
              <Route index element={<NotesList />} />
              <Route path=":id" element={<EditNote />} />
              <Route path="new" element={<NewNote />} />
            </Route>
            <Route path="users">
              <Route index element={<UsersList />} />
              <Route path=":id" element={<EditUser />} />
              <Route path="new" element={<NewUserForm />} />
            </Route>
            {/* <Route path="customers">
              <Route index element={<CustomerList />} />
              <Route path=":id" element={<EditCustomer/>} />
              <Route path=":new" element={<NewCustomerForm/>} />

            </Route> */}
            <Route path="payments">
              <Route index element={<PaymentList />} />
              <Route path=":id" element={<EditPayment/>} />
              <Route path=":new" element={<NewPayment/>} />
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
