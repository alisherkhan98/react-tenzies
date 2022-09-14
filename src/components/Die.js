import React from "react";

function Die (props) {

    let dieClassName = props.isHeld ? "die held" : "die";
    return (
        <div className={dieClassName}
            onClick={props.toggleHold}>
            <span>
              {props.value}
            </span>
        </div>
    )
}

export default Die;