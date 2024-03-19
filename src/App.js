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
import PersistLogin from "./features/auth/PersistLogin";
import Prefetch from "./features/auth/Prefetch";
import PaymentList from "./features/payment/PaymentList";
import EditPayment from "./features/payment/EditPayment";
import NewPayment from "./features/payment/NewPayment";
import RequireAuth from "./features/auth/RequireAuth";
import { ROLES } from "./config/roles";
import useTitle from "./hooks/useTItle";

function App() {
  useTitle("TechNotes")
  return (
    <Routes>
      <Route path="" element={<Layout />}>
        {/* public routes */}
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />

        {/* protected routes */}
        <Route element={<PersistLogin />}>
        <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}>
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
          
            <Route path="payments">
              <Route index element={<PaymentList />} />
              <Route path=":id" element={<EditPayment/>} />
            </Route>
              <Route path="payments/new" element={<NewPayment/>} />
          </Route>
          
           </Route> {/*end dash */}
        </Route>
      </Route>{/*end protected routes */}
      </Route>
    </Routes>
  );
}

export default App;
