import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <header>Header here</header>
      <main>
        <Outlet />
      </main>
      <footer>Footer here</footer>
    </>
  );
}

export default Layout;
