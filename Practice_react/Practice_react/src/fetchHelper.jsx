import React from "react";

export function fetchAllUsers (){
    return fetch("https://jsonplaceholder.typicode.com/users")
    .then( res => res.json());
}

export function fetchProfile (){
    return fetch("https://jsonplaceholder.typicode.com/users/1")
    .then(res => res.json());
}

