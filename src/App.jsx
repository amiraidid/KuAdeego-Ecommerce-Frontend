import { useEffect, useState } from "react";
import { Header, Footer } from "./components";
import AllRoutes from "./routes/AllRoutes";
import { UserContext } from "./context/UserContext";
import PrivateRoutes from "./routes/PrivateRoutes";
import { useLocation } from "react-router-dom";

function App() {
  const [user, setUser] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (sessionStorage.getItem("token") !== null) {
      setUser(true);
    }
  }, [user]);

  return (
    <div className="container mx-auto z-10">
      <UserContext.Provider value={{ user, setUser }}>
        {!location.pathname.includes("admin") ? (
          <>
            <Header />
            <AllRoutes />
            <Footer />
          </>
        ) : (
          <PrivateRoutes />
        )}
      </UserContext.Provider>
    </div>
  );
}

export default App;
