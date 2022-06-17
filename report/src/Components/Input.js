import React,{useState,useEffect} from 'react';

function Input(){
    return(
        <>
        <h1>Input.js</h1>
        <form>
            <label for = "org">Select Organization</label>
            <input id='org' type = "text" />
        </form>
        </>
    );
}

export default Input;
