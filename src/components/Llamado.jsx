import {  Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import "../styles/color.css"
import "../styles/modal.css"

function Llamado(args) {
  const modal = args.toggle;
  const pac = args.paciente
  const box = args.box;
  const doc = args.doctor

  return (
    <Modal centered isOpen={modal} {...args}>
        <ModalHeader style={{
            width:"50vw",height:"25vh",fontSize:"200px"
        }} className='d-flex justify-content-center align-items-center llamando noBordes'>
            {"PACIENTE "+pac}
        </ModalHeader>
        <ModalBody style={{
            width:"50vw",height:"25vh",fontSize:"100%"
        }} className='d-flex justify-content-center align-items-center llamando'>
            {"BOX "+box}
        </ModalBody>
        <ModalFooter style={{
            width:"50vw",height:"25vh",fontSize:"100%"
        }} className='d-flex justify-content-center align-items-center llamando noBordes'>
            {"DR. "+doc}
        </ModalFooter>
    </Modal>
  );
}

export default Llamado;