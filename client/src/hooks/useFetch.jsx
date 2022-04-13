import {useEffect, useState} from 'react';

//gives access to the api key variable
const API_KEY = import.meta.env.VITE_GIPHY_API;

//custom useFetch hook
const useFetch = ({keyword}) => {
    const [gifURL, setGifURL] = useState("");

    const fetchGifs = async () => {
        try{
            //splits words then joins them so it can be searched withouth spaces and only looks for 1 gif
            const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${keyword.split(" ").join("")}&limit=1`);

            //destructuring the data
            const {data} = await response.json();
            setGifURL(data[0]?.images?.downsized_medium.url);
    
        } catch(error) {
            //generates a demo gif if nothing is found
            setGifURL('https://metro.co.uk/wp-content/uploads/2015/05/pokemon_crying.gif?quality=90&strip=all&zoom=1&resize=500%2C284');
        }
    }

    //occurs whenever the keyword changes
    useEffect(() => {
        if(keyword){
            fetchGifs();
        }
    }, [keyword])

    return gifURL;
}

export default useFetch;