import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Redirect({ path }) {
  var navigate = useNavigate();
  useEffect(() => {
    navigate(path);
  }, [navigate]);
  return <div>Redirecting...</div>;
}
