/* eslint-disable react/prop-types */
import "./../CSS/C.css"
import "./../CSS/C1.css"


const C1 = ({Go}) => {

    return <div className="c c1">
      <div className="c1_w">
        <div className="c1_hello">Привет,</div>
        <div className="c1_writing">Это <b>не</b> коммерческое задание</div>
      </div>
      <button className="c1_button" onClick={Go}>Что дальше?</button>
    </div>;
  };
  
  export default C1;