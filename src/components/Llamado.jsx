import {  Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import timbre from "../sounds/Bell.mp3"
import "../styles/color.css"
import "../styles/modal.css"

function Llamado(args) {
  const modal = args.toggle;
  const pac = args.paciente
  const box = args.box;
  const doc = args.doctor
  const sound = new Audio(timbre);


    const playSoundInLoop = () => {
        sound.play();
        sound.onended = () => {
            sound.play();
        };
    };

    const stopSound = () => {
        sound.pause();
        sound.currentTime = 0; // Reinicia el sonido al inicio
        sound.onended = null; // Detiene el bucle
    };

  return (
    <Modal
     centered 
     
     onAnimationStart={ev=>{
        ev.preventDefault();
        playSoundInLoop();
    }}
    onAnimationEnd={ev => {
        ev.preventDefault();
        stopSound(); // Detiene el sonido cuando la animación termina
    }} 

    isOpen={modal} {...args}
    
    >
        
        <ModalHeader className='rounded-top d-flex justify-content-center align-items-center llamando noBordes modal-text'    
        >
            {"PACIENTE: "+pac.toUpperCase()}
        </ModalHeader>
        
        <ModalBody className='d-flex justify-content-center align-items-center llamando'>
            <h5 className='modal-text-dr'>
                {doc}
            </h5>
        </ModalBody>
        <ModalFooter className='rounded-bottom d-flex justify-content-center align-items-center llamando noBordes modal-text-box'>
            {"BOX "+box}
        </ModalFooter>
        {/*
        <div className='llamando'>
            <h5 className='modal-text'>
                {"PACIENTE: "+pac.toUpperCase()}
            </h5>
            <h5 className='modal-text'>
                {doc}
            </h5>
            <h5 className='modal-text'>
                {"BOX "+box}
            </h5>
        </div>
        */}
    </Modal>
  );
}

export default Llamado;