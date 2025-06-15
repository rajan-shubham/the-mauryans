import { useState } from "react";
import { API_KEY, SearchEngineID } from "../assets/api";

const CustomSearch = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchType, setSearchType] = useState("all"); // "all" or "image"

    const handleSearch = async () => {
        if (!query.trim()) return;
        
        setIsLoading(true);
        try {
            const searchParams = new URLSearchParams({
                key: API_KEY,
                cx: SearchEngineID,
                q: query,
                ...(searchType === "image" && { searchType: "image" })
            });
            
            const response = await fetch(
                `https://www.googleapis.com/customsearch/v1?${searchParams.toString()}`
            );
            const data = await response.json();
            setResults(data.items || []);
            console.log(data);
        } catch (error) {
            console.error("Search error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="max-w-5xl mx-auto px-4 bg-gray-900 text-white">
            <div className="my-8 flex flex-col items-center justify-center">
                <div className="relative w-full max-w-2xl">
                    <div className="flex items-center mb-4 justify-center space-x-4">
                        <button 
                            className={`px-4 py-2 rounded-full transition-all ${searchType === "all" ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"}`}
                            onClick={() => setSearchType("all")}
                        >
                            All
                        </button>
                        <button 
                            className={`px-4 py-2 rounded-full transition-all ${searchType === "image" ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"}`}
                            onClick={() => setSearchType("image")}
                        >
                            Images
                        </button>
                    </div>
                    
                    <div className="relative">
                        <input
                            type="text"
                            className="w-full placeholder-gray-400 rounded-full border-2 border-blue-600 bg-gray-800 px-6 py-3 pr-12 outline-none transition duration-300 ease-in-out focus:border-blue-500 focus:shadow-lg text-white"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Search the web..."
                        />
                        <button
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white rounded-full px-5 py-2 transition duration-300"
                            onClick={handleSearch}>
                            {isLoading ? 
                                <span className="flex items-center">
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Searching
                                </span> : 
                                "Search"
                            }
                        </button>
                    </div>
                </div>
            </div>

            {results.length > 0 && (
                <div className="search-results mt-8 mb-12">
                    <p className="text-sm text-gray-400 mb-4">About {results.length} results</p>
                    
                    {searchType === "image" ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {results.map((item) => (
                                <a 
                                    key={item.link} 
                                    href={item.link} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="block overflow-hidden rounded-lg bg-gray-800 shadow-md hover:shadow-xl transition-all duration-300"
                                >
                                    {item.image && (
                                        <div className="relative pb-[100%] bg-gray-700">
                                            <img 
                                                src={item.image.thumbnailLink} 
                                                alt={item.title}
                                                className="absolute inset-0 w-full h-full object-cover"
                                            />
                                        </div>
                                    )}
                                    <div className="p-2">
                                        <p className="text-sm font-medium text-gray-200 truncate">{item.title}</p>
                                        <p className="text-xs text-gray-400 truncate">{item.displayLink}</p>
                                    </div>
                                </a>
                            ))}
                        </div>
                    ) : (
                        <div>
                            {results.map((item) => (
                                <div key={item.link} className="mb-6 p-5 border border-gray-700 hover:border-blue-700 hover:bg-gray-800 rounded-xl transition duration-300 shadow-sm hover:shadow-md">
                                    <a href={item.link} target="_blank" rel="noopener noreferrer" className="block">
                                        <div className="flex items-center mb-1">
                                            {item.pagemap?.cse_image?.[0]?.src && (
                                                <img 
                                                    src={item.pagemap.cse_image[0].src} 
                                                    alt="" 
                                                    className="w-6 h-6 mr-2 rounded-full object-cover"
                                                />
                                            )}
                                            <div className="text-xs text-green-400 truncate">{item.displayLink}</div>
                                        </div>
                                        <h3 className="text-xl text-blue-400 font-medium mb-2 hover:underline">{item.title}</h3>
                                        <p className="text-sm text-gray-300 mb-2">{item.snippet}</p>
                                        
                                        {item.pagemap?.cse_image?.[0]?.src && (
                                            <div className="mt-3 mb-2 max-w-xs">
                                                <img 
                                                    src={item.pagemap.cse_image[0].src} 
                                                    alt="" 
                                                    className="rounded-lg max-h-32 object-cover"
                                                    onError={(e) => e.target.style.display = 'none'}
                                                />
                                            </div>
                                        )}
                                    </a>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
            
            {query && results.length === 0 && !isLoading && (
                <div className="mt-8 text-center p-8 bg-gray-800 rounded-lg shadow-inner">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-lg text-gray-300">No results found for "{query}"</p>
                    <p className="text-sm text-gray-400 mt-2">Try different keywords or check your spelling</p>
                </div>
            )}
        </div>
    );
};

export default CustomSearch;
