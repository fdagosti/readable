export function getCategories(){
    const headers = new Headers();
    headers.set("Authorization","toto")
    const myInit = {
        headers: headers,
    }
    return fetch("/categories", myInit)
        .then(res => res.json())
        .then(res => res.categories)
      .then(res => {console.log("res",res);return res})
}

export function getPosts(category){
    const url = category?`/${category}/posts`:"/posts"
    return fetch(url, { headers: { 'Authorization': 'whatever-you-want' }})
        .then(res => res.json())
      .then(res => {console.log("res",res);return res})
}

export function getPost(postId){
    const url = `/posts/${postId}`
    return fetch(url, { headers: { 'Authorization': 'whatever-you-want' }})
        .then(res => res.json())
      .then(res => {console.log("res",res);return res})
}

export function getComments(postId){
    const url = `/posts/${postId}/comments`
    return fetch(url, { headers: { 'Authorization': 'whatever-you-want' }})
        .then(res => res.json())
      .then(res => {console.log("res",res);return res})
}

export function deleteComment(commentId){
    const url = `/comments/${commentId}`
    return fetch(url, { headers: { 'Authorization': 'whatever-you-want'},"method": "DELETE" })
      .then(res => {console.log("res",res);return res})
}

export function createComment(id, timestamp, body, owner, parentId){
    const url = `/comments/`
    return fetch(url, {
        headers: { 'Authorization': 'whatever-you-want','Content-Type': 'application/json'},
        method: "POST",
        body: JSON.stringify({id, timestamp,body,owner,parentId})
    })
        .then(res => res.json())
      .then(res => {console.log("res",res);return res})
}

