import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div>
      <header>Header here</header>
      <main>
        <Outlet />
      </main>
      <footer>Footer here</footer>
    </div>
  );
}

export default Layout;
