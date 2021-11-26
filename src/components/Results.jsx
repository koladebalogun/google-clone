import React, {useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import ReactPlayer from 'react-player';

import { useResultContext } from '../contexts/ResultContextProvider';
import {Loading} from './Loading';

export const Results = () => {
    const { results, isLoading, getResults, searchTerm } = useResultContext();
    const location = useLocation();

    useEffect(() => {
        if (searchTerm) {
          if (location.pathname === '/videos') {
            getResults(`/search/q=${searchTerm}`);
          } else {
            getResults(`${location.pathname}/q=${searchTerm}&num=40`);
          }
        }
    }, [searchTerm, location.pathname]); //=> Anytime anything in this dependency changes, the function would re-run

    if(isLoading) return <Loading/>

    console.log(location.pathname)

    //location.pathname is anything thats after '/'. e.g '/news', '/videos', '/search' '/image'.

    switch (location.pathname) {
        case '/search':
            return (
                <div className="flex flex-wrap justify-between space-y-6 sm:px-56">
                    {/*We are mapping over the results wnd we wnat to do something with the link and title of each result */}
                    {results?.map(({link, title}, index) => (
                        <div key={index} className="md:w-2/5 w-full">
                            {/* the acnchor tag is for the links */}
                            <a href={link} target="_blank" rel="noreferrer">
                                <p className="text-sm">
                                    {/* if the link is more than 30 characters, it will only take 30 characters else it will show the full link */}
                                    {link.length > 30 ? link.substring(0, 30) :link }
                                </p>
                                <p className="text-lg hover:underline dark:text-blue-300 text-blue-700">
                                    {title}
                                </p>
                            </a>
                        </div>
                    ))}
                </div>
            );
        case '/images':
            return (
                <div className="flex flex-wrap justify-center items-center">
                    {/* Here we are destructuring the image and the link, but the link is an actual object itself so we destructures the link's href and title */}
                    {results?.map(({image, link: {href,title}}, index) => (
                        <a className="sm:p-3 p-5" href={href} key={index} target="_blank" rel="noreferrer">
                            <img src={image?.src} alt={title} loading="lazy" />
                            <p className="w-36 break-words text-sm mt-2">
                                {title}
                            </p>
                        </a>
                    ))}
                </div>
            );
        case '/news':
            return (
                <div className="flex flex-wrap justify-between space-y-6 sm:px-56 items-center">
                    {/*We are mapping over the results wnd we wnat to do something with the link and title of each result */}
                    {results?.map(({links, id, source, title}) => (
                        <div key={id} className="md:w-2/5 w-full">
                            {/* links?.[0].href // is how we'll get the link of a specific news entry */}
                            <a href={links?.[0].href} target="_blank" rel="noreferrer" className="hover:underline">
                                <p className="text-lg dark:text-blue-300 text-blue-700">
                                    {title}
                                </p>
                            </a>
                                <div className="flex gap-4">
                                    <a href={source?.href} target="_blank" rel="noreferrer">
                                        {source?.href}
                                    </a>
                                </div>
                        </div>
                    ))}
                </div>
            );
        default:
            break;
    }
}
 