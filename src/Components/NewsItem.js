import React, { Component } from "react";

export class NewsItem extends Component {
 
  render() {
    let {title,description,ImgUrl,newsUrl,author,date,source}=this.props;
    return (
      <div className="my-4">
        <div className="card">
        <span className="position-absolute top-0 translate-middle badge rounded-pill bg-black "style={{left:'90%',zIndex:'1'}}>
       {source}
   </span>
          <img src={!ImgUrl?"https://cdn.abcotvs.com/dip/images/14526330_target-self-checkout-AP-clean-TN-img.jpg?w=1600":ImgUrl} alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}
            </h5>
            <p className="card-text">{description}..
              
            </p>
            
            <p className="card-text"><small className="text-body-secondary">By {author} on {new Date(date).toGMTString()}</small></p>

            <a href={newsUrl} className="btn btn-sm btn-secondary" target="_blank" rel="noreferrer" >
            Read more..
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
