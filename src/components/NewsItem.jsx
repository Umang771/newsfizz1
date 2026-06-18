import React from "react";
//import News from "./News";

const NewsItem =(props)=> {
 
    
    let { title, description, imageUrl ,newsUrl,source, author,publishedAt} = props;
    return (
      <div>
      <div className="card" >
      <span className="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{zIndex:1}}>
          {source}
        </span>
      <img src={!imageUrl?"https://img.freepik.com/free-vector/realistic-news-studio-background_23-2149985600.jpg?w=740&t=st=1694273968~exp=1694274568~hmac=ce7f7eb8f0645814de6fd507ea4d2ff29872f98e8ae7f48e10b954ea79c6a577":imageUrl} className="card-img-top" alt="..."/>
      <div className="card-body">
        <h5 className="card-title">{title}...
        </h5>
        <p className="card-text">{description}...</p>
        <div className=" text-body-secondary">
          By {author=author?author:"Unknown"} On {new Date(publishedAt).toGMTString()}.
        </div>
        <a href={newsUrl}  target="_blank" rel="noreferrer" className="btn btn-sm btn-primary">Read More</a>
       
      </div>
    </div>
         {/* <News/> News component used here */}
      </div>
    );
 
}

export default NewsItem;
