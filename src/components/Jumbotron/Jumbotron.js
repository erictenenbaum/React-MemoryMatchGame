import React from "react";

const Jumbotron = props => (
    <div className="jumbotron jumbotron-fluid">
    <div classNmae="container">
        <h1 className="display-4">Memory Match Game</h1>
        <p className="lead">Click the Squares to Reveal The Hidden Numbers.</p>
        <p>Elapsed Time: {props.timer}</p> 
        <p>{props.fastMessage}</p>
        {/* <p>Fastest Time: <span class="DOMFastestTime"></span></p>          */}
    </div>
</div>
);

export default Jumbotron;

