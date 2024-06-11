import { useRef, useState } from "react";


function Test(){
    const busca = (txt) =>{
        let newTxt = "";
        let txtArray = txt.split("");
        
        for(let i = 0;i < txtArray.length; i++){
            if(!txtArray[i].includes("(")){
                newTxt = newTxt + txtArray[i];
            }else{
                break;
            }
        }
        return newTxt;
    }

    const [res,setRes] = useState("");
    const input = useRef();

    return(
        <div>
            <form onSubmit={ev=>{
                ev.preventDefault();
                setRes(busca(input.current.value));
                
            }}><input ref={input} /></form>
            <div className="bg-primary fs-1">{res}</div>
            
        </div>
    )
}

export default Test;
