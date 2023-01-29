import React, {useEffect, useState} from 'react';
import { API } from '../api-service';

// this page shows all the code blocks that exists in DB.
// the user can select one of them and see it's details in the next page (CodeBlock.js)
const Lobby = () => {
    const [allCodeBlocks, setAllCodeBlocks] = useState([]);

    // get all the code blocks from DB after loading this page
    useEffect(() =>{
        API.getAllCodeBlocks()
          .then(resp => setAllCodeBlocks(resp))  
          .catch( error => console.log(error))
    }, [])

    // go to the page of the code blocks after select one of the code blocks
    const displayCodeBlock = (codeBlockId) =>{
    window.location.href ='/CodeBlock?id=' + codeBlockId;
    }
      return (
        <div className="App">  
        {console.log(allCodeBlocks)}  
         
          <h1>Choose code block </h1>

        {/* display the code blocks on the screen */}
        {allCodeBlocks.map(codeBlock => { 
            return <p style={{ cursor: "pointer" }} onClick={() => displayCodeBlock(codeBlock.id)}>
                    {codeBlock.title}
                    </p>
        })}
        </div> 
       
          
      );
    };

export default Lobby;