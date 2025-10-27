import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { IoSearch } from "react-icons/io5";

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [places,setPlaces] = useState([])

  useEffect(() => {
    // don't run if search is too short
    if (searchValue.length < 2) return;
  
    const timeout = setTimeout(async () => {
      try {
        const response = await axios.get(
          `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${searchValue}`,
          {
            headers: {
              "X-RapidAPI-Key": "0b07b22316mshbce3fcfd8d07384p19c366jsnd29201ce6597",
              "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
            },
          }
        );
        console.log(response.data.data);
        setPlaces(response.data.data);
      } catch (error) {
        console.error(error);
      }
    }, 400); // wait 400ms after typing
  
    // cleanup function to cancel old timers
    return () => clearTimeout(timeout);
  }, [searchValue]);
    
  return (
    <>
      <div className="min-h-screen w-full bg-white relative max-w-[1442px] mx-auto">
        {/* White Sphere Grid Background */}
        <div
          className="absolute inset-0 z-0 "
          style={{
            background: "white",
            backgroundImage: `
              linear-gradient(to right, rgba(71,85,105,0.3) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(71,85,105,0.3) 1px, transparent 1px),
              radial-gradient(circle at 50% 50%, rgba(139,92,246,0.25) 0%, rgba(139,92,246,0.1) 40%, transparent 80%)
            `,
            backgroundSize: "40px 40px, 40px 40px, 100% 100%",
          }}
        />

        <div className=" w-60 h-20 absolute ml-20 z-11 bg-white border-black border-2 mt-20 rounded-lg text-black flex items-center justify-center">
          <p className=" text-3xl font-extrabold inset-0 mb-1">WeatherMon</p>
        </div>
        <div className=" w-230 h-[65.3vh] bg-[#0100f2] absolute z-10 ml-50 mt-30 text-amber-50 text-6xl ">
          
        </div>
        <div className="w-lg h-15 absolute ml-102 z-11 bg-white border-black border-2 mt-22.5 rounded-lg text-black flex items-center justify-center ">
          <input type="text" placeholder="Search the place" className="w-full rounded-2xl p-1 m-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#0100f2] transition duration-150 ease-in-out" value={searchValue} onChange={(e)=>setSearchValue(e.target.value)}/>
          <button className="w-20 h-full border-l-2 items-center flex justify-center pt-0.5"><IoSearch size={30} /></button>
        </div>
            {/* <div className="w-lg h-15 absolute ml-102 z-11 bg-white border-black border-2 mt-38 rounded-lg text-black flex items-center justify-center ">
         
           </div> */}
      </div>
    </>
  );
}

export default App;
