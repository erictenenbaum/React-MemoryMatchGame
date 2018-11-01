import React from "react";
import { Container, Row, Col } from "../Grid";

export const Game = props => { 
       
    return (        
        <div>
        {/* {console.log(props)}                      */}
              <Col size="xs-4 sm-3">
                <div id={props.id}  onClick={() => {props.handleClick(props)}}>
                  {props.number}
                </div>
              </Col>          
        </div>    
    );
}