import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  Outlet,
} from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import ProductList from "./components/Product/ProductList";
import SupplierList from "./components/Supplier/SupplierList";
import OrderList from "./components/Order/OrderList";
import SaleForm from "./components/Sale/SaleForm";
import { useUserContext } from "./components/context/UserContext";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar/Navbar";
import OrderForm from "./components/Order/OrderForm";
import SaleList from "./components/Sale/SaleList";
import { PrivateRoutes } from "./components/PrivateRoutes";
import "./App.css";

function App() {
  const { user } = useUserContext();
  return (
    <div className="App">
      <div className="main">
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={user ? <Navigate to={"/product"} /> : <Login />}
            />

            <Route path="/login" element={<Login />} />
            <Route
              element={
                <div className="content">
                  <Sidebar />
                  <div className="sidebar_outlet">
                    <Navbar /> <Outlet />
                  </div>
                </div>
              }
            >
              <Route element={<PrivateRoutes />}>
                <Route path="/product" element={<ProductList />} />
                <Route path="/supplier" element={<SupplierList />} />
                <Route path="/order" element={<OrderList />} />
                <Route path="/sale" element={<SaleList />} />
                <Route path="/order/create" element={<OrderForm />} />
                <Route path="/sale/create" element={<SaleForm />} />
                <Route path="/signup" element={<Signup />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
