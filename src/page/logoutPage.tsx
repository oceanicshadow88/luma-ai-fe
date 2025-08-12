import { useEffect } from "react";
import { useLogout } from "../features/auth/hooks/useLogout";

export const LogoutPage = () => {
  const logout = useLogout();
  
  useEffect(() => {
    logout();
  }, [logout]); 

  return <>Logout</>;
};

export default LogoutPage;