import * as api from '../api'
import { getBrowser, getIPAddress, getOperatingSystem } from '../utils'
import { setCurrentUser } from './currentUser'
import { updateLoginInfo } from './users'

export const signup= (authData, navigate)=> async (dispatch)=>{
    try {
        const {data} = await api.signUp(authData)
        dispatch({type: 'AUTH', data})
        dispatch(setCurrentUser( JSON.parse(localStorage.getItem('Profile'))))
        navigate('/')
    } catch (error) {
        console.log(error)
    }
}
export const login= (authData, navigate) => async(dispatch)=> {
    try {
        const {data} = await api.logIn(authData)
        const ipAdress= await getIPAddress();
        dispatch({type: 'AUTH', data})
        dispatch(setCurrentUser( JSON.parse(localStorage.getItem('Profile'))))
        console.log(JSON.parse(localStorage.getItem('Profile'))["result"])
        dispatch(updateLoginInfo(JSON.parse(localStorage.getItem('Profile'))["result"]["_id"],{
            "loginHistory":{
            "ip": ipAdress,
            "os": getOperatingSystem(window),
            "browser": getBrowser(window),
            "timeStamp": new Date()
        }
        }))
        navigate('/')
    } catch (error) {
        console.log(error)
    }
}