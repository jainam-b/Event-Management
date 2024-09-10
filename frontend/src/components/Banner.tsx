import banner from "../assets/banner.png";
import SearchBar from "./SearchBar";
const Banner = () => {
  return (
    <div className="relative flex justify-center items-center   mx-auto">
      <img
        className="mt-3 w-5/6 h-autos object-contain"
        src={banner}
        alt="Banner"
      />
      <div className="hidden md:block">
        <SearchBar />
      </div>
    </div>
  );
};

export default Banner;




// export const MobileBanner = () => {
//   return (
//     <div id="default-carousel" className="relative w-full" data-carousel="slide">
//       <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
//         <div className="hidden duration-700 ease-in-out" data-carousel-item>
//           <img
//             src={banner}
//             className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
//             alt="..."
//           />
//         </div>
//         <div className="hidden duration-700 ease-in-out" data-carousel-item>
//           <img
//             src={ruppee}
//             className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
//             alt="..."
//           />
//         </div>
//       </div>

//       {/* Slider indicators */}
//       <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
//         <button
//           type="button"
//           className="w-3 h-3 rounded-full bg-white"
//           aria-current="true"
//           aria-label="Slide 1"
//           data-carousel-slide-to="0"
//         ></button>
//         <button
//           type="button"
//           className="w-3 h-3 rounded-full bg-white"
//           aria-current="false"
//           aria-label="Slide 2"
//           data-carousel-slide-to="1"
//         ></button>
//       </div>

//       {/* Slider navigation buttons */}
//       <button
//         type="button"
//         className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
//         data-carousel-prev
//       >
//         <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50">
//           <svg
//             className="w-4 h-4 text-white"
//             aria-hidden="true"
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 6 10"
//           >
//             <path
//               stroke="currentColor"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M5 1 1 5l4 4"
//             />
//           </svg>
//           <span className="sr-only">Previous</span>
//         </span>
//       </button>
//       <button
//         type="button"
//         className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
//         data-carousel-next
//       >
//         <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50">
//           <svg
//             className="w-4 h-4 text-white"
//             aria-hidden="true"
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 6 10"
//           >
//             <path
//               stroke="currentColor"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M1 9l4-4-4-4"
//             />
//           </svg>
//           <span className="sr-only">Next</span>
//         </span>
//       </button>
//     </div>
//   );
// };


