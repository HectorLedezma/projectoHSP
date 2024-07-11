import { Button, Input } from 'reactstrap';
import { ETL } from '../classes/etl';
import { useRef, useState } from 'react';
import Llamado from '../components/Llamado';
import timbre from "../sounds/Bell.mp3"
function Test(args) {
    
    const input = useRef();
    const etl = new ETL();
    const [inputT,setInput] = useState("");
    const [result,setResult] = useState("");

    const esperar = (t) =>{
        return new Promise(
            resolve =>{
                setTimeout(resolve,t);
            }
        )
    }

    const [call, setCall] = useState(false);
    const llamando = () =>{
        const sound = new Audio(timbre);
        setCall(true);
        sound.play();
        esperar(240000).finally(()=>{
            setCall(false)
        });
    }


    //form
    const box = useRef();
    const pac = useRef();    
    const doc = useRef();

    const [vbox,setVbox] = useState("");
    const [vpac,setVpac] = useState("");    
    const [vdoc,setVdoc] = useState("");

    return (
        <div>
            <form>
                <input ref={box} placeholder='Box'/>
                <input ref={pac} placeholder='Paciente'/>
                <input ref={doc} placeholder='Doctor'/>
                <Button onClick={
                    ev=>{
                        ev.preventDefault();
                        setVbox(box.current.value);
                        setVpac(pac.current.value);
                        setVdoc(doc.current.value);
                        llamando();
                    }
                }>a ver</Button>
            </form>
            <Llamado className='d-flex justify-content-center align-items-center' toggle={call} box={vbox} paciente={vpac} doctor={vdoc}/>
        </div>
    );
}

export default Test;
