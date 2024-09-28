import { Navigate, Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function ProtectedPages() {
  const token = localStorage.getItem("token") ;

  return (
    <>
      <Header />
      <main className="mt-16">
        {token ? <Outlet /> : <Navigate to={"/login"} />}
      </main>
      <Footer />
    </>
  );
}
