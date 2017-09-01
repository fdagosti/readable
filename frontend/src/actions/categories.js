import {getCategories, getPosts} from "../utils/api";

export const CATEGORIES_FETCH_SUCCESS = "CATEGORIES_FETCH_SUCCESS"
export const CATEGORY_POSTS_FETCH_SUCCESS = "CATEGORY_POSTS_FETCH_SUCCESS"

export function fetchCategories(){
    return (dispatch) => {
        getCategories()
            .then((categories) => dispatch(categoriesFetchSuccess(categories)))
    }
}

export function categoriesFetchSuccess(categories){
    return {
        type: CATEGORIES_FETCH_SUCCESS,
        categories
    }
}

export function postsFetchByCategory(category){
    return (dispatch) => {
        getPosts(category)
            .then((posts) => dispatch(categoryPostsFetchSuccess(posts, category)))
    }
}

export function categoryPostsFetchSuccess(posts, category){
    return {
        type: CATEGORY_POSTS_FETCH_SUCCESS,
        posts,
        category
    }
}