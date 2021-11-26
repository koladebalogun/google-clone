import React, { createContext, useContext, useState } from 'react';

const ResultContext = createContext();
const baseURL = 'https://google-search3.p.rapidapi.com/api/v1'; //url to be gotten from from Rapid api


export const ResultContextProvider = ({ children }) => {
    const [ results, setResults ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ searchTerm, setSearchTerm ] = useState(''); // Access to the search term we are looking for


    const getResults = async (type) => { //This is the function that would handle the api calls of the results
        setIsLoading(true);

        const response = await fetch(`${baseURL}${type}`,{ // The type would either be: /search or /videos or /images or /news
            method: 'GET',
            headers: { 
                //The headers in this case are gotten from rapid Api
                'x-rapidapi-host': 'google-search3.p.rapidapi.com',
                'x-rapidapi-key': '0e0e528eafmsh903a5951a1699aep1e8d4djsn73b49ff0f161'
            }

        });

        const data = await response.json(); //The data represents our actual results

        console.log(data);

        if(type.includes('/news')) {
            setResults(data.entries);
        } else if(type.includes('/images')){
            setResults(data.image_results);
        } else{
            setResults(data.results);
        }

        setIsLoading(false);
    }

    return (
        <ResultContext.Provider value={{ getResults, results, searchTerm, setSearchTerm, isLoading}}>
            {children}
        </ResultContext.Provider>
    )
}

//This function would make it easier for us to use the values from this context

export const useResultContext = () => useContext(ResultContext);