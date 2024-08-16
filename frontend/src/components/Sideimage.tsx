
import sideimg from "../assets/signupimage.png";

const Sideimage = () => {
  return (
    <div className="relative h-screen bg-[#F8F8FA]">
      <img
        className="h-full w-4/6 object-cover"
        src={sideimg}
        alt="Side Image"
      />
      <div className="absolute inset-0 w-4/6 flex flex-col items-center justify-center">
        <h2 className="text-white text-4xl font-bold mb-6">WELCOME BACK</h2>
        <h2 className="text-white text-xl font-bold text-center ">
          To keep connected with us provide us with your information
        </h2>
        
      </div>
    </div>
  );
};

export default Sideimage;