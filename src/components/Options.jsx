import React, { useState } from "react";
function Options(props){
    var decodeHTML = function (html) {
        var txt = document.createElement('textarea');
        txt.innerHTML = html;
        return txt.value;
    };
    function Checked(){
        props.Check(props.id);
    }
    let a = document.querySelector("input:checked");
    if(a){
        a.checked = false;
    }

    return (<div className = "options">
        <input onClick = {Checked}  className="radio-btn" type="radio" name="type" id = {props.id} value={props.element} />
        <label onClick = {Checked} className="radio-label" htmlFor = {props.id}>
            {decodeHTML(props.element)}
        </label>
    </div>)
}
export default Options;