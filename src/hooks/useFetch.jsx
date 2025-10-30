import React, { useState, useEffect } from 'react'
import { jwtDecode } from "jwt-decode";

function useFetch() {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = sessionStorage.getItem("token");
  const decoded = jwtDecode(token);

    useEffect(() => {
        const fetchUser = async () => {
          try {
            setLoading(true);
            const response = await fetch(
              `http://localhost:5000/products/user/${decoded.id}`
            );
            if (!response.ok) {
              throw new Error("Failed to fetch user");
            }
            const data = await response.json();
            setUser(data.user);
            setLoading(false);
          } catch (error) {
            console.error("Error fetching user:", error);
          }
        };
        fetchUser();
      }, []);
  return { user, loading };
}

export default useFetch