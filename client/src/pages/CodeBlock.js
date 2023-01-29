import React, {useEffect, useState, useRef } from 'react';
import { API } from '../api-service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSmile } from '@fortawesome/free-solid-svg-icons'
import { io } from "socket.io-client";
import Highlight from 'react-highlight'
import "highlight.js/styles/github.css";
import 'highlight.js/styles/monokai-sublime.css';

// this page shows the selected code block from previous page.
// the student can change the code and the mentor can see the changes in real time.
const CodeBlock = () => {
const [codeBlockTitle, setCodeBlockTitle] = useState('')
const [code, setCode] = useState('')
const [codeBlockSolution, setCodeBlockSolution] = useState('')
const [isCorrect, setIsCorrect]= useState(false)
const search = window.location.search; // returns the URL query String - code block Id
const params = new URLSearchParams(search); 
const codeBlockId = params.get('id');
const [socket, setSocket] = useState(null)
const [connectedUsers, setConnectedUsers] = useState(0);
const[firstClient, setFirstClient]= useState(false)
const language = "javaScript"

// every time the student change the code do 2 things:
// 1. check whether it's the right answer - if the current code match the solution - show a smiley on the screen
// 2. send the new code in real time to the mentor using socket
useEffect(() =>{
// convert to the code and the soultion to json format in order to compare them
const solution = JSON.stringify(codeBlockSolution.replace(/\r/g, ""))
const realTimeCode =JSON.stringify(code.replace(/\r/g, ""))

// check equality
if(Object.is(solution,realTimeCode) && code!="")
{
  setIsCorrect(true) 
}
else{
  setIsCorrect(false)
}
socket?.emit("newCode",code);
}, [code])

// set the details of the block object
const setCodeBlockDetails = (codeBlock) =>{
  setCodeBlockTitle(codeBlock.title)
  setCode(codeBlock.code)
  setCodeBlockSolution(codeBlock.solution)
  }

// get the changes of the code in real time
useEffect(() =>{
socket && socket.on("getCode", data=>{
// set the code to the current code of the student
setCode(data.code)
    })

socket && socket.on("firstUser", data=>{
  console.log("user connected : ", data)
  // when data ==2 it means there is one client (the first one entered the website)
  // it's 2 because user establishes two connections - regular events, and one for WebSockets
  if(data==2)
  {
    setFirstClient(true)
  }
      })
}, [socket])

// get the details of the selected code block
  useEffect(() =>{
    API.getCodeBlock(codeBlockId)
      .then(resp => setCodeBlockDetails(resp))   
      .catch( error => console.log(error))
    setSocket(io("http://localhost:5000"))
}, [])


  return (
    
    <div className="App"> 
    {/* show the details of the code block in the screen. the student can change the code */} 
      <h1>{codeBlockTitle}</h1>
    {/* if it's the first client (mentor) he will see the code in "read mode" */}
      {firstClient? 
         <Highlight language={language} className="highlighted-code">
         {code}
       </Highlight>
     : 
    //  otherwise the student can edit the code
     <textarea 
      onChange={e => setCode(e.target.value)}
      rows="20" 
      cols="60"
      value= {code}>
      </textarea>

}


   <div>
    {/* if the code match the solution - show a smiley on the screen */}
   {isCorrect?<FontAwesomeIcon icon={faSmile} size = '10x' />:""}
   </div>
</div> 
   
      
  );
};

export default CodeBlock;