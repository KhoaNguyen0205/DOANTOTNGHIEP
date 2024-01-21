import { Link } from "react-router-dom";

/* eslint-disable react/no-unescaped-entities */
export default function Nike() {
    return(
        <div>
        <div className="nike-container">
        <div className="content">
          <div className="social-media">
            <i data-feather="instagram"></i>
            <i data-feather="facebook"></i>
            <i data-feather="twitter"></i>

          </div>
          <div className="content-text left">
            <br/>
            <b>NIKE</b>
            <h3>THE BEST OF THE YEAR</h3>
            <h1>"Just do it"</h1>
          </div>
          <div className="content-text right">
            <h3>Click here to order</h3>
            <Link to={'/NikeProduct'}>
              <button>Watch All</button>
            </Link>
          </div>
          <img src="https://i.imgur.com/GsBNEtU.png"/>
        </div>
        </div>
        </div>
    )
}