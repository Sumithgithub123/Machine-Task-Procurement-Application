import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Supplier from "./components/Supplier";
import { NotificationsProvider } from "@toolpad/core";
import Items from "./components/Items";
import Cart from "./components/Cart";
import Notfound from "./components/Notfound";

function App() {
  return (
    <NotificationsProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Supplier />} />
            <Route path="/items" element={<Items />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<Notfound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </NotificationsProvider>
  );
}

export default App;
