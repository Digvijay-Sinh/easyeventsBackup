import Navbar from "../components/Navbar";
import BackgroundImage from "../assets/background_picture.png";
import Peoples from "../assets/peoples.png";
const Home = () => {
  return (
    <>
      <div
        className="relative bg-cover w-screen   "
        style={{
          backgroundImage: `linear-gradient(to right bottom,rgbA(255,20,147,0.9), rgba(255, 0, 255, 0.9) 35% ,rgba(0, 0, 255, 0.9)), url(${BackgroundImage})`,
          color: "white",
        }}
      >
        <Navbar />
        <div className="w-full">
          <img src={Peoples} alt="" />
        </div>
      </div>
    </>
  );
};

export default Home;
