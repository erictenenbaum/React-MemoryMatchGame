import React  from "react";
import "./Square.css";

const Square = props => {
    // console.log(props)
   

    if(props.active){
        return (
            <div className="continueStyle">
                {props.number}
            </div>
        )
    }
    return (
        <div className="square" onClick={()=> {props.handleClick(props.id, props.number)}}>
            
        </div>
    );
}

export default Square;
