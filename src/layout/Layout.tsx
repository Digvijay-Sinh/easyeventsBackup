import RouteContainer from "../routes/Route";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
const Layout = () => {
  return (
    <>
      <Navbar />
      <div className="pt-12">
        <RouteContainer />
      </div>
      <Footer />
    </>
  );
};

export default Layout;
