

export function getCategories(){
    const headers = new Headers();
    headers.set("Authorization","toto")
    const myInit = {
        headers: headers,
    }
    return fetch("/categories", myInit)
        .then(res => res.json())
        .then(res => res.categories)
}

export function getPosts(category){
    const url = category?`/${category}/posts`:"/posts"
    return fetch(url, { headers: { 'Authorization': 'whatever-you-want' }})
        .then(res => res.json())
}

export function createPost(id, timestamp, title, body, author, category){
    const url = `/posts`
    return fetch(url, {
        headers: { 'Authorization': 'whatever-you-want','Content-Type': 'application/json'},
        method: "POST",
        body: JSON.stringify({id, timestamp,title, body,author,category})
    })
        .then(res => res.json())
}

export function getPost(postId){
    const url = `/posts/${postId}`
    return fetch(url, { headers: { 'Authorization': 'whatever-you-want' }})
        .then(res => res.json())
}

export function voteOnPost(postId, up){
    const url = `/posts/${postId}`
    return fetch(url, {
        headers: { 'Authorization': 'whatever-you-want','Content-Type': 'application/json'},
        method: "POST",
        body: JSON.stringify({option:up?"upVote":"downVote" })
    })
        .then(res => res.json())
}

export function editPost(postId, title, body, category){
    const url = `/posts/${postId}`
    return fetch(url, {
        headers: { 'Authorization': 'whatever-you-want','Content-Type': 'application/json'},
        method: "PUT",
        body: JSON.stringify({title,body, category})
    })
        .then(res => res.json())
}

export function deletePost(postId){
    const url = `/posts/${postId}`
    return fetch(url, { headers: { 'Authorization': 'whatever-you-want'},"method": "DELETE" })
}

export function getComments(postId){
    const url = `/posts/${postId}/comments`
    return fetch(url, { headers: { 'Authorization': 'whatever-you-want' }})
        .then(res => res.json())
}


export function createComment(id, timestamp, body, author, parentId){
    const url = `/comments/`
    return fetch(url, {
        headers: { 'Authorization': 'whatever-you-want','Content-Type': 'application/json'},
        method: "POST",
        body: JSON.stringify({id, timestamp,body,author,parentId})
    })
        .then(res => res.json())
}

export function getCommentDetail(commentId){
    const url = `/comments/${commentId}`
    return fetch(url, { headers: { 'Authorization': 'whatever-you-want' }})
        .then(res => res.json())
}

export function voteOnComment(commentId, up){
    const url = `/comments/${commentId}`
    return fetch(url, {
        headers: { 'Authorization': 'whatever-you-want','Content-Type': 'application/json'},
        method: "POST",
        body: JSON.stringify({option:up?"upVote":"downVote" })
    })
        .then(res => res.json())
}


export function editComment(commentId, timestamp, body, voteScore){
    console.log("Edit comment ",commentId)
    const url = `/comments/${commentId}`
    return fetch(url, {
        headers: { 'Authorization': 'whatever-you-want','Content-Type': 'application/json'},
        method: "PUT",
        body: JSON.stringify({timestamp,body,voteScore})
    })
        .then(res => res.json())
}


export function deleteComment(commentId){
    const url = `/comments/${commentId}`
    return fetch(url, { headers: { 'Authorization': 'whatever-you-want'},"method": "DELETE" })
}

