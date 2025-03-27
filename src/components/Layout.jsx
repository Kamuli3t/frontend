import { Outlet } from "react-router-dom";
import Nav from "./Nav";

function Layout() {
  return (
    <div className="max-w-[1200px] mx-auto">
      <Nav />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
