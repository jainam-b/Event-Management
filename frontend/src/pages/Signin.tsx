import Auth from "../components/Auth";
import Sideimage from "../components/Sideimage";

const Signin = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 h-screen">
      <div className="col-span-2">
      <Sideimage />
      </div>
      <div className="col-span-2 hidden lg:block">
        <Auth />
      </div>
    </div>
  );
};

export default Signin;
