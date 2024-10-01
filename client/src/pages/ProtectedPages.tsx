import { Navigate, Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function ProtectedPages() {
  const token = localStorage.getItem("token") ;

  return (
    <>
      <Header />
      <main className="min-h-[540px]">
        {token ? <Outlet /> : <Navigate to={"/login"} />}
      </main>
      <Footer />
    </>
  );
}
