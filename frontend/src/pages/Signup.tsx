import Auth from "../components/SignUpAuth";
import Sideimage from "../components/Sideimage";

const Signup = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 h-screen">
      <div className="col-span-2 hidden lg:block">
      <Sideimage />
      </div>
      <div className="col-span-2 ">
        <Auth />
      </div>
    </div>
  );
};

export default Signup;
