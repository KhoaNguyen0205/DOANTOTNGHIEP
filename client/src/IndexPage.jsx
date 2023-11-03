import Nike from "./Nike";
import Adidas from "./adidas";


export default function IndexPage(){
    return(
        <div className="container">

                <div className="page"id="one">
                    <h1>Prominent</h1>
                    <div className="wrapper">

                     <div className="img-container">
                            <img src="https://i.ebayimg.com/images/g/hzsAAOSwsAdeD3AT/s-l1600.jpg"  />
                     </div>
                     <div className="img-container">
                            <img src="https://i.pinimg.com/736x/55/10/3c/55103c7b2a31c028002d43af0c203086.jpg"/>
                     </div>
                     <div className="img-container">
                            <img src="https://mir-s3-cdn-cf.behance.net/project_modules/hd/beec4e62488791.5a91f7eac2556.jpg" />
                      </div>
                    </div>
                </div>

                <div className="page">
                    <Nike/>
                </div>

                <div className="page">
                    <Adidas />
                </div>
                <div className="page"></div>

                <div className="">@ngockhoa-20cntt3</div>
        </div>
    )
}