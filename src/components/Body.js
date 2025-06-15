import { useState, useEffect, useRef } from "react";
import CustomSearch from "./CustomSearch";

const Body = () => {
    const [searchText, setSearchText] = useState("");
    const [selectedEngine, setSelectedEngine] = useState(null);
    const [showSelection, setShowSelection] = useState(true);
    const googleContainerRef = useRef(null);

    useEffect(() => {
        // Function to safely remove a script element
        const safeRemoveScript = (id) => {
            try {
                const script = document.getElementById(id);
                if (script && script.parentNode) {
                    script.parentNode.removeChild(script);
                }
            } catch (error) {
                console.error("Error removing script:", error);
            }
        };

        if (selectedEngine === "google") {
            // Clear previous script if exists
            safeRemoveScript("google-search-script");
            
            // Clear the container
            if (googleContainerRef.current) {
                googleContainerRef.current.innerHTML = '<div class="gcse-search"></div>';
            }
            
            // Add new script
            const script = document.createElement("script");
            script.src = "https://cse.google.com/cse.js?cx=6232bdbd51c464e5a";
            script.async = true;
            script.id = "google-search-script";
            document.head.appendChild(script);
            
            // Clear hash fragment if present
            if (window.location.hash && window.location.hash.includes('gsc')) {
                try {
                    window.history.pushState("", document.title, window.location.pathname);
                } catch (e) {
                    console.error("Error clearing hash:", e);
                }
            }
        } else if (selectedEngine === "custom") {
            // Remove Google script when switching to custom search
            safeRemoveScript("google-search-script");
            
            // Clear hash fragment if present
            if (window.location.hash && window.location.hash.includes('gsc')) {
                try {
                    window.history.pushState("", document.title, window.location.pathname);
                } catch (e) {
                    console.error("Error clearing hash:", e);
                }
            }
        }

        // Cleanup function
        return () => {
            // No need to remove scripts on unmount as they will be managed by the effect
        };
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
                        <div id="google-search-container" ref={googleContainerRef} className="m-8 p-10">
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
