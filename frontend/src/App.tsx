import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import AuthCallbackPage from "./Page/AuthCallback";
import HomePage from "./Page/HomePage";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/auth-Callbacke" element={<AuthCallbackPage/>} />

      </Routes>

    </>
  );  
}