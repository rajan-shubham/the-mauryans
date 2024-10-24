import { useState, useEffect } from "react";

const Body = () => {
    const [searchText, setSearchText] = useState("");


    return (
        <div className="m-6 p-6 flex items-center justify-center">
            <input type="text" placeholder="Search" className="m-2 placeholder-gray-500 rounded-lg border-4 border-orange-600 px-3 pl-8 py-1 outline-none transition duration-700 ease-in-out focus:shadow-outline hover:w-64 search-box" value={searchText} onChange={(e) => {
                setSearchText(e.target.value); 
            }} />
            <button className="m-2 border-4 border-green-500 rounded-lg px-2 py-1" onClick={() => {
                console.log(searchText);
            }}>SEARCH</button>
        </div>
    );
};

export default Body;