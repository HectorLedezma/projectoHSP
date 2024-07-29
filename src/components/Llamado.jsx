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
  return (
    <Modal centered onAnimationStart={ev=>{
        ev.preventDefault();
        sound.play();
        //console.log(doc);
    }} isOpen={modal} {...args}
    
    >
        <ModalHeader className='d-flex justify-content-center align-items-center llamando noBordes'>
            {"PACIENTE: "+pac.toUpperCase()}
        </ModalHeader>
        <ModalBody className='d-flex justify-content-center align-items-center llamando'>
            <h5 className='modal-text'>
                {doc}
            </h5>
        </ModalBody>
        <ModalFooter className='d-flex justify-content-center align-items-center llamando noBordes'>
            <h5 className='modal-text'>
                {"BOX "+box}
            </h5>
        </ModalFooter>
    </Modal>
  );
}

export default Llamado;