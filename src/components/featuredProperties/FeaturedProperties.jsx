import useFetch from "../../hooks/useFetch.js";
import "./featuredProperties.css";

const FeaturedProperties = () => {
  const baseURL = process.env.REACT_APP_BACKEND_URL;

  //hotels?featured=true&limit=4
  const {data,loading,error}=useFetch(`${baseURL}/hotels?featured=true`);
  return (
    <div className="fp">
      {loading ? (
        "Loading"
      ) : (
        <>
          {data.map((item)=>(
            <div className="fpItem" key={item._id}>
            <img
              src= {item.photos[0]}             
              alt=""
              className="fpImg"
            />
            <span className="fpName">{item.name}</span>
            <span className="fpCity">{item.city}</span>
            <span className="fpPrice">Starting from ${item.cheapestPrice}</span>
            {item.rating && <div className="fpRating">
              <button>{item.rating}</button>
              <span>Excellent</span>
            </div>}
          </div>
          ))}
        </>
      )}
    </div>
  );
};

export default FeaturedProperties;
