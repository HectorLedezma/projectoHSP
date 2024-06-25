import { Button, Input } from 'reactstrap';
import { ETL } from '../classes/etl';
import { useRef, useState } from 'react';
function Test(args) {
    
    const input = useRef();
    const etl = new ETL();
    const [inputT,setInput] = useState("");
    const [result,setResult] = useState("");

    return (
        <div>
            <input ref={input} placeholder='Texto' onChange={ev=>{
                ev.preventDefault();
                setInput(input.current.value);
                setResult(etl.limpiaOnlyBox(input.current.value));
            }}/>
            <h1>{inputT}</h1>
            <h1>{result}</h1>

        </div>
    );
}

export default Test;
