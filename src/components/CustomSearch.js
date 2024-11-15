import { useState } from "react";
import { API_KEY, SearchEngineID } from "../assets/api";

const CustomSearch = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);

    const handleSearch = async () => {
        const response = await fetch(
            `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${SearchEngineID}&q=${query}`
        );
        const data = await response.json();
        setResults(data.items || []);
        console.log(data);
    };

    return (
        <div>
            <div className="m-6 p-6 flex items-center justify-center">
                <input
                    type="text"
                    className="m-2 placeholder-gray-500 rounded-lg border-4 border-orange-600 px-3 pl-8 py-1 outline-none transition duration-700 ease-in-out focus:shadow-outline hover:w-64"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search..."
                />
                <button
                    className="m-2 border-4 border-green-500 rounded-lg px-2 py-1"
                    onClick={handleSearch}>Search</button>
            </div>

            <div>
                {results.map((item) => (
                    <div key={item.link}>
                        <h3>{item.title}</h3>
                        <p>{item.snippet}</p>
                        <a href={item.link}>{item.link}</a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CustomSearch;
