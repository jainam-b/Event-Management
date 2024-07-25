import Auth from "../components/Auth";
import Sideimage from "../components/Sideimage";

const Signin = () => {
  return (
    <div className="grid  grid-cols-1 lg:grid-cols-2">
      <Sideimage/>
      <div className="hidden lg:block grid-cols-2">
       <Auth/>
      </div>
    </div>
  );
};

export default Signin;
