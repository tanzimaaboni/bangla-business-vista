
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to the HomePage
    navigate("/");
  }, [navigate]);
  
  return null; // This component returns nothing as it just redirects
};

export default Index;
