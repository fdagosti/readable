import React from "react"
import {IconButton} from "material-ui";
import {HardwareKeyboardArrowDown, HardwareKeyboardArrowUp} from "material-ui/svg-icons/index";

const Vote = (props) => (
    <span>
        <IconButton tooltip="DownVote the comment">
            <HardwareKeyboardArrowDown />
        </IconButton>
        <span style={{padding: "12px 0 12px 0", height: "48px", width: "48px", display: "inline-block", boxSizing: "border-box", verticalAlign: "super", textAlign: "center"}}>{props.score}</span>
        <IconButton tooltip="UpVote the comment">
            <HardwareKeyboardArrowUp />
        </IconButton>
    </span>

)

export default Vote