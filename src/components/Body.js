import { useState, useEffect } from "react";
import CustomSearch from "./CustomSearch";

const Body = () => {
    const [searchText, setSearchText] = useState("");
    const [selectedEngine, setSelectedEngine] = useState(null);
    const [showSelection, setShowSelection] = useState(true);

    useEffect(() => {
        if (selectedEngine === "google") {
            const script = document.createElement("script");
            script.src = "https://cse.google.com/cse.js?cx=6232bdbd51c464e5a";
            script.async = true;
            document.getElementById("google-search-container").appendChild(script);
        }
    }, [selectedEngine]);

    const handleEngineSelect = (engine) => {
        setSelectedEngine(engine);
        setShowSelection(false);
    };

    const toggleSearchEngine = () => {
        setSelectedEngine(selectedEngine === "google" ? "custom" : "google");
    };

    return (
        <div className="bg-gray-900 text-white min-h-screen pt-16">
            {showSelection ? (
                <div className="flex flex-col items-center justify-center h-96">
                    <h2 className="text-3xl font-bold mb-8">Choose your search engine</h2>
                    <div className="flex space-x-6">
                        <button 
                            onClick={() => handleEngineSelect("google")}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition duration-300 shadow-lg hover:shadow-xl"
                        >
                            Google Integration
                        </button>
                        <button 
                            onClick={() => handleEngineSelect("custom")}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition duration-300 shadow-lg hover:shadow-xl"
                        >
                            Custom Search
                        </button>
                    </div>
                </div>
            ) : (
                <>
                    <div className="flex justify-center mb-4">
                        <button 
                            onClick={toggleSearchEngine}
                            className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-full text-sm transition duration-300"
                        >
                            Switch to {selectedEngine === "google" ? "Custom" : "Google"} Search
                        </button>
                    </div>
                    
                    {selectedEngine === "google" ? (
                        <div id="google-search-container" className="m-8 p-10">
                            <div className="gcse-search"></div>
                        </div>
                    ) : (
                        <div>
                            <CustomSearch />
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Body;
