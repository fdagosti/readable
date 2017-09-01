import {CATEGORIES_FETCH_SUCCESS, CATEGORY_POSTS_FETCH_SUCCESS} from "../actions/categories";
import {POST_EDIT_SUCCESS} from "../actions/posts";


const initialCategoryState = {
    categories: [],
    catBasedPosts: null
}

export function categories (state = initialCategoryState, action) {
    switch (action.type) {
        case CATEGORIES_FETCH_SUCCESS:
            const {categories} = action
            return {...state, categories}
        case CATEGORY_POSTS_FETCH_SUCCESS:
            const {posts, category} = action
            return {...state, catBasedPosts: {category, posts: posts.map(p=>p.id)}}
        case POST_EDIT_SUCCESS:
            const {post} = action
            if (state.catBasedPosts && post.category !== state.catBasedPosts.category){
                const result = state.catBasedPosts.posts.filter(pid=>pid!==post.id)
                return {...state, catBasedPosts: {...state.catBasedPosts,posts: result}}
            }
            return state
        default :
            return state
    }
}