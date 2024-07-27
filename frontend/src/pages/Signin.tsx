import Auth from "../components/SignInAuth";
import Sideimage from "../components/SideImageSignin";

const Signin = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 h-screen">
      <div className="col-span-3">
      <Auth />
      </div>
      <div className="col-span-2 hidden lg:block">
      <Sideimage /> 
      </div>
    </div>
  );
};

export default Signin;
