import React from "react";
import { useAuth } from "./../../../components/context/AuthContext";

const Login: React.FC = () => {
  const { login } = useAuth();

  return (
    <div>
      <h1>Login</h1>
      <button onClick={login}>Log In</button>
    </div>
  );
};

export default Login;
