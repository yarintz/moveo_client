import React from "react"
// this page include all the API's we need to get data from DB
// determine if it's in localhost or another url
var URL =""
if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")
    URL = 'http://127.0.0.1:8000';
if(window.location.hostname === "matazim-frontend.web.app")
    URL = 'https://yarin.pythonanywhere.com';

const BASE_URL = 'https://yarin.pythonanywhere.com';
const LOCAL_URL = 'http://127.0.0.1:8000';
export class API extends React.Component{

//get all the code blockes
static getAllCodeBlocks(){                                     
    return fetch(`${URL}/main/codeBlock/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
            },                       
    })
    .then( resp => resp.json())
    }

//get a specific code block
static getCodeBlock(id){                                     
    return fetch(`${URL}/main/codeBlock/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
            },                       
    })
    .then( resp => resp.json())
    }
}