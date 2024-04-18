import React, { useEffect, useState } from 'react'
import MovieComponent from './MovieComponent';
import Loading from './Loading';

const Home = () => {
    const [card,setCard] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const getCardData = async () => {
        const res = await fetch(
            `https://jsonplaceholder.typicode.com/posts?_limit=9&_page=${page}`
        );
        const data = await res.json();
        console.log(data);
        setCard((prev)=>[...prev,...data]);
        setLoading(false);
    }

    useEffect(()=>{
      getCardData();
  },[page]);

    const handleInfiniteScroll = () => {
      // returns the height of the entire document, in pixels.
      console.log("scroll height (entire doc) is ",document.documentElement.scrollHeight);
      // returns the inner height of the window (the height of the browser window's viewport), in pixels.
      console.log("inner height (viewport) is ",window.innerHeight);
      // returns the number of pixels that the document has been scrolled vertically.
      console.log("scroll top (scrolled vertically) ", document.documentElement.scrollTop);
      try {
        if(document.documentElement.scrollTop + window.innerHeight + 1 >= document.documentElement.scrollHeight) {
          setLoading(true);
          setPage((prev)=>prev+1);
        }
      } catch(error) {
        console.log(error);
      }
    }

    useEffect(()=>{
      window.addEventListener('scroll', handleInfiniteScroll);
      return ()=>window.removeEventListener('scroll',handleInfiniteScroll);
    },[]);

  return (
    <>
    <MovieComponent movieInfo={card}/>
    {loading &&<Loading/>}
    </>
  )
}

export default Home