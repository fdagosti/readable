import React, {Component} from "react"
import {RaisedButton} from "material-ui";
import Link from "react-router-dom/es/Link";
import {connect} from "react-redux";
import {fetchCategories} from "../actions/categories";


class CategoriesSelector extends Component {

    componentDidMount(){
        this.props.dispatch(fetchCategories())
    }


    render() {
        const {categories} = this.props;
        return <div style={row}>
            <span style={{lineHeight: "36px"}}>Categories: </span>
            {categories && categories.map(cat =>
                <RaisedButton
                    containerElement={<Link to={`/${cat.path}`}/>}
                    key={cat.path}>
                    {cat.name}
                </RaisedButton>)}
        </div>
    }
}

const row = {
    display: "grid",
    gridTemplateColumns: "repeat(12, 1fr)",
    gridGap: "20px",
    padding: "15px"
}

const mapStateToProps = (state) => {
    return {
        categories: state.categories.categories,
    };
};

export default connect(mapStateToProps)(CategoriesSelector)
