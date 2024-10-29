import { Link, Outlet } from "react-router-dom";
import NavigationBar from "./NavigationBar";
import Modal from "../model/Model";

function AppLayout() {
  return (
    <Modal>
      <div className="min-h-screen text-white bg-blue-950">
        <header className="flex sticky text-black top-0 justify-between p-4 px-7 bg-violet-50">
          <Link to="/">
            <p className="text-2xl font-semibold">Procurement Application</p>
          </Link>
          <NavigationBar />
        </header>
        <div className="p-10 ">
          <Outlet />
        </div>
      </div>
    </Modal>
  );
}

export default AppLayout;
