import React, {Component} from "react"
import {MenuItem, SelectField} from "material-ui";
import connect from "react-redux/es/connect/connect";
import {DATE_BASED_SORTING, updateMessageSorting, VOTE_BASED_SORTING} from "../actions/index";

class PostSorter extends Component{



    componentDidMount(){
    }

    render() {
        return (
            <SelectField
                floatingLabelText="Sort By"
                value={this.props.order}
                onChange={(e,i,v)=>this.props.dispatch(updateMessageSorting(v))}
            >
                <MenuItem value={DATE_BASED_SORTING} primaryText="Date" />
                <MenuItem value={VOTE_BASED_SORTING} primaryText="Votes" />
            </SelectField>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        order: state.messageSorting.value,
    };
};

export default connect(mapStateToProps)(PostSorter)