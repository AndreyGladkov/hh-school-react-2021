import { SET_REPO, ADD_BLACKLIST, REMOVE_BLACKLIST, CLEAR_BLACKLIST, SET_USER } from './'

export const setRepo = content => ({
    type: SET_REPO,
    payload: content
})
export const clearBlacklist = () => ({
    type: CLEAR_BLACKLIST
})
export const removeBlacklist = value => ({
    type: REMOVE_BLACKLIST,
    payload: value
})
export const addBlacklist = value => ({
    type: REMOVE_BLACKLIST,
    payload: value
})
export const setUser = user => ({
    type: SET_USER,
    payload: user
})