import React from "react"


export default function Categories(props) {
    console.log("this is categories",props.match)
    return <div>Hello {JSON.stringify(props.match.params.id)}</div>
}