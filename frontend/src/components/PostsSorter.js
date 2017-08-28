import React, {Component} from "react"
import {MenuItem, SelectField} from "material-ui";

export default class PostSorter extends Component{

    voteSortFunc = (a,b) => a.voteScore < b.voteScore
    dateSortFunc = (a,b) => a.timestamp < b.timestamp

    state = {
        order: 1,
        orderFunc:this.dateSortFunc
    };

    componentDidMount(){
        this.props.handleChange(this.state.orderFunc)
    }

    handleChange = (event, index, value) => {
        const state = {order:value, orderFunc: value===1?this.dateSortFunc:this.voteSortFunc}
        this.setState(state)
        this.props.handleChange(state.orderFunc)
    }

    render() {
        return (
            <SelectField
                floatingLabelText="Sort By"
                value={this.state.order}
                onChange={this.handleChange}
            >
                <MenuItem value={1} primaryText="Date" />
                <MenuItem value={2} primaryText="Votes" />
            </SelectField>
        )
    }
}