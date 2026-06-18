import React, { useState, useEffect } from 'react'
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'

const dummyArticles = Array.from({ length: 6 }, (_, i) => ({
  title: "Loading fresh headlines...",
  description: "Please wait a moment while we fetch the latest updates for you.",
  image: "https://img.freepik.com/free-vector/realistic-news-studio-background_23-2149985600.jpg",
  url: `placeholder-url-${i}`,
  source: { name: "FizzNews" },
  author: "System",
  publishedAt: new Date().toISOString()
}));

const News = (props) => {
  const [articles, setArticles] = useState(dummyArticles);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  document.title = `${capitalizeFirstLetter(props.category)}-NewsFizz`

  const updateNews = async () => {
    props.setProgress(30);
    // FIX 1: Explicitly pass page=1 for the initial load instead of relying on the async state
    let url = `https://gnews.io/api/v4/top-headlines?category=${props.category}&apikey=8a05801c4dc467682e6e34cd65bbd27f&page=1&pagesize=${props.pagesize}&lang=en&country=in`
    
    try {
      let data = await fetch(url)
      props.setProgress(50);
      let parseddata = await data.json();
      props.setProgress(70);

      console.log(parseddata)
      
      // FIX 2: Only update state if articles actually exist (prevents 429 responses from blanking your screen)
      if (parseddata.articles) {
        setArticles(parseddata.articles);
        setTotalResults(parseddata.totalArticles || 0);
        setPage(2); // Safely advance to page 2 for the infinite scroll
      }
    } catch (e) {
      console.error("Network error, holding dummy content:", e);
    }
    props.setProgress(100);
  }

  useEffect(() => {
    updateNews();
    // eslint-disable-next-line
  }, [])

  const backToTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  const fetchData = async () => {
    // FIX 3: Use the current tracked state page variable explicitly
    let url = `https://gnews.io/api/v4/top-headlines?category=${props.category}&apikey=8a05801c4dc467682e6e34cd65bbd27f&page=${page}&pagesize=${props.pagesize}&lang=en&country=in`
    
    try {
      let data = await fetch(url)
      let parseddata = await data.json();
      console.log("fetchdata1", parseddata)
      
      if (parseddata.articles) {
        setArticles(articles.concat(parseddata.articles));
        setTotalResults(parseddata.totalArticles || 0);
        setPage(page + 1); // Set up next page increment only after successful fetch
      }
    } catch (e) {
      console.error("Error fetching more data:", e);
    }
  }

  return (
    <div className="container" style={{ marginTop: "90px" }}>
      <h2 className="text-center">Top {capitalizeFirstLetter(props.category)} HeadLines</h2>
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchData}
        // FIX 4: If totalResults is still 0 on initial rendering, don't let infinite scroll fetch blindly
        hasMore={totalResults === 0 ? false : articles.length < totalResults}
        loader={<h4 className="text-center my-3">Loading more news...</h4>}
      >

        <div className="row my-4 mx-4" >
          {articles.map((element, index) => {
            // Added index to key to prevent duplicate placeholder key complaints in console
            return <div className='col-md-4' key={`${element.url}-${index}`}>
              <NewsItem title={element.title} description={element.description} imageUrl={element.image} newsUrl={element.url} source={element.source ? element.source.name : "Unknown"} author={element.author} publishedAt={element.publishedAt} />
            </div>
          })}
        </div>
        
        <div className="centre" >
          <button type="button" className="btn btn-success " style={{ display: 'flex' }} onClick={backToTop}>Back To Top</button>
        </div>
      </InfiniteScroll>

    </div>
  )
}

News.defaultProps = {
  country: "us",
  pagesize: 9,
  category: "general",
}

News.propTypes = {
  country: PropTypes.string,
  pagesize: PropTypes.number,
  category: PropTypes.string,
}

export default News