import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { UserProvider } from "./context/AuthContext";
import { AppRoutes } from "./routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <UserProvider>
          <AppRoutes />
          <ToastContainer />
        </UserProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
