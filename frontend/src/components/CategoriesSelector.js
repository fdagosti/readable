import React, {Component} from "react"
import {getCategories} from "../utils/api";
import {RaisedButton} from "material-ui";
import Link from "react-router-dom/es/Link";


export default class CategoriesSelector extends Component {

    state = {
        categories: null
    }

    componentDidMount(){
        getCategories()
            .then(categories => this.setState({categories}))
    }


    render() {
        const {categories} = this.state;
        return <div style={row}>
            {categories && categories.map(cat => <RaisedButton containerElement={<Link to={`/category/${cat.path}`}/>} key={cat.path}>{cat.name}</RaisedButton>)}
        </div>
    }
}

const row = {
    display: "grid",
    gridTemplateColumns: "repeat(12, 1fr)",
    gridGap: "20px",
    padding: "15px"
}

// const col6 = {
//     "grid-column": "span 6"
// }
