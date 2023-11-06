import { useState } from "react";
import HTTP from "@lib/http";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<any>(null);

  const login = async (credentials: { email: string; password: string }) => {
    setLoading(true);
    try {
      const data = await HTTP.post("/customer/auth/login", {
        body: credentials,
      });
      setResponse(data);
      return data;
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    login,
    loading,
    response,
    error,
  };
};

export default useLogin;
