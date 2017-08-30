import React from "react"
import {IconButton} from "material-ui";
import {HardwareKeyboardArrowDown, HardwareKeyboardArrowUp} from "material-ui/svg-icons/index";
import {connect} from "react-redux";
import {changeCommentVote} from "../actions/index";

const styles = {
    smallIcon: {
        width: 20,
        height: 20,
    },
    mediumIcon: {
        width: 48,
        height: 48,
    },
    largeIcon: {
        width: 60,
        height: 60,
    },
    small: {
        verticalAlign: "middle",
        width: 20,
        height: 20,
        padding: 0,
    },
    medium: {
        width: 96,
        height: 96,
        padding: 24,
    },
    large: {
        width: 120,
        height: 120,
        padding: 30,
    },
}

const Vote = (props) => {
    const {data} = props

    return (
    <span>
        <IconButton onClick={()=>props.dispatch(changeCommentVote(data.id, data.voteScore-1))} iconStyle={styles.smallIcon} style={styles.small} tooltip="DownVote">
            <HardwareKeyboardArrowDown />
        </IconButton>
        <span style={{...styles.small,display: "inline-block", boxSizing: "border-box", verticalAlign: "inherit", textAlign: "center"}}>
            {data.voteScore}
            </span>
        <IconButton onClick={()=>props.dispatch(changeCommentVote(data.id, data.voteScore+1))} iconStyle={styles.smallIcon} style={styles.small} tooltip="UpVote">
            <HardwareKeyboardArrowUp />
        </IconButton>
    </span>

)}

export default connect()(Vote)