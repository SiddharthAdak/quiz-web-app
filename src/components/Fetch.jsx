import axios from "axios";
import React, { useEffect, useState } from "react";
import Options from "./Options";

function Fetch() {
    const [Data, setData] = useState([]);
    let [counter, setCounter] = useState(0);
    let [ans, setAns] = useState(0);
    let [quiz, setQuiz] = useState("block");
    let [score, setScore] = useState("none");
    let [k, setK] = useState(0);
    let nextBtn = "block";
    let submitBtn = "none";
    useEffect(() => {
        axios.get("https://opentdb.com/api.php?amount=10")
            .then((response) => {
                setData(response.data.results);
                newQuiz();

            })
            .catch(err => {
                console.log(err);
            })
    }, [k])
 
    let a = -1;  
    
    function handleClick(event) {
        event.preventDefault();
        
        if (a!==-1) {  
            let key = document.getElementById(a).value;
            if (key === Data[counter].correct_answer ) {
                ans++;
                setAns(ans);
            }
            counter++;
            setCounter(counter);
        }
    }
    
    function handleCheck(id){
        a = id;
        
    }

    function handleSubmit(event){
        event.preventDefault();
        if(a!== -1)
        {
            
        let key = document.getElementById(a).value;
        if (key === Data[counter].correct_answer ) {
            ans++;
            setAns(ans);
        }
        setQuiz("none");
        setScore("block");
        
    }
    
    }
    function newQuiz(){
        setQuiz("block");
        setCounter(0);
    }
    function handlePlay(event){
        event.preventDefault();
        if (k===1) {
                k--;
                setK(k);
            }
            else{
                k++;
                setK(k);
            }
            
        
        setAns(0);
        setScore("none");
        
        
    }
    var decodeHTML = function (html) {
        var txt = document.createElement('textarea');
        txt.innerHTML = html;
        return txt.value;
    };
    if (counter === 9) {
        nextBtn = "none";
        submitBtn = "block";
    }
    let arr = [];
    if (Data.length !== 0 && quiz === "block") {
         arr = Data[counter].incorrect_answers;
        let x = Math.floor((Math.random() * (arr.length + 1)));
        arr.splice(x, 0, Data[counter].correct_answer);
        console.log("correct option",x)
        console.log(Data[counter].correct_answer);
        
    }
    if (Data.length !== 0) {
        return (
            <div id = "quiz_ele">
            <div className = "quiz-box" style = {{display: quiz}}>
                <p>{decodeHTML(Data[counter].question)}</p>
                <form action="#">
                    {arr.map((element, index) => {
                        return (<Options  element={element} id = {index} Check = {handleCheck}/>)
                    })}

                    <button onClick={handleClick} style = {{display: nextBtn}}>Next</button>
                    <button onClick={handleSubmit} style = {{display: submitBtn}}>Submit</button>
                </form>
            </div>
            <div style = {{display: score}}>
                <p>Your score is : {ans}</p>
                <form action="#">
                <button onClick = {handlePlay}>Play Again</button>
                </form>
            </div>

            </div>
        )
    }



}
export default Fetch;