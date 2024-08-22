

const SearchBar = () => {
  return (
    <div className="absolute left-1/2 transform -translate-x-1/2 bottom-[-72px]">
      <svg width="1400" height="180" className="rounded-lg">
        <rect width="1400" height="180" rx="20" ry="20" fill="#10107B" />
        <text
          x="10%"
          y="30%"
          dominantBaseline="middle"
          textAnchor="middle"
          fill="white"
          fontSize="28"
          fontFamily="Arial, sans-serif"
        >
          Looking for
        </text>
        <foreignObject x="5%" y="45%" width="25%" height="40">
          <select
            className="w-full h-full p-2 rounded-lg text-black"
            style={{ width: "100%", height: "100%", boxSizing: "border-box" }}
          >
            <option value="" disabled selected hidden>Choose event type</option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
        </foreignObject>
        <text
          x="39%"
          y="30%"
          dominantBaseline="middle"
          textAnchor="middle"
          fill="white"
          fontSize="28"
          fontFamily="Arial, sans-serif"
        >
          Location
        </text>
        <foreignObject x="35%" y="45%" width="25%" height="40">
          <select
            className="w-full h-full p-2 rounded-lg text-black"
            style={{ width: "100%", height: "100%", boxSizing: "border-box" }}
          >
            <option value="" disabled selected hidden>Choose location</option>
            <option value="location1">Location 1</option>
            <option value="location2">Location 2</option>
            <option value="location3">Location 3</option>
          </select>
        </foreignObject>
        <text
          x="68%"
          y="30%"
          dominantBaseline="middle"
          textAnchor="middle"
          fill="white"
          fontSize="28"
          fontFamily="Arial, sans-serif"
        >
          When
        </text>
        <foreignObject x="65%" y="45%" width="25%" height="40">
          <select
            className="w-full h-full p-2 rounded-xl text-black"
            style={{ width: "100%", height: "100%", boxSizing: "border-box" }}
          >
            <option value="" disabled selected hidden>Choose date and time</option>
            <option value="time1">Time 1</option>
            <option value="time2">Time 2</option>
            <option value="time3">Time 3</option>
          </select>
        </foreignObject>
      </svg>
    </div>
  );
};

export default SearchBar;
