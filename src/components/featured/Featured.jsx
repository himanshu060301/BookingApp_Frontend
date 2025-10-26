import useFetch from "../../hooks/useFetch.js";
import "./featured.css";

const Featured = () => {
  const baseURL = process.env.REACT_APP_BACKEND_URL;

  const {data,loading,error}=useFetch(`${baseURL}/hotels/countByCity?cities=berlin,madrid,london`);
  
  return (
    <div className="featured">
      {loading ? ("Loading please wait"
      ) : ( 
      <>
      <div className="featuredItem">
        <img
          src="https://media.istockphoto.com/id/452534461/photo/berlin-cityscape.jpg?s=612x612&w=0&k=20&c=pWLDEGydN11rAU-PRZ1fmmwc771JJ7HsvBSLIyfQryA="
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>Berlin</h1>
          <h2>{data[0]} properties</h2>
        </div>
      </div>
      
      <div className="featuredItem">
        <img
          src="https://cf.bstatic.com/xdata/images/city/max500/690334.webp?k=b99df435f06a15a1568ddd5f55d239507c0156985577681ab91274f917af6dbb&o="
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>Madrid</h1>
          <h2>{data[1]} properties</h2>
        </div>
      </div>
      <div className="featuredItem">
        <img
          src="https://cf.bstatic.com/xdata/images/city/max500/689422.webp?k=2595c93e7e067b9ba95f90713f80ba6e5fa88a66e6e55600bd27a5128808fdf2&o="
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>London</h1>
          <h2>{data[2]} properties</h2>
        </div>
      </div>
      </>
      )}
    </div>
  );
};

export default Featured;
