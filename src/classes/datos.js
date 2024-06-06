import data from "../data/DataTest.json";
import moduticket from "../data/modulos.json";
import pantallas from "../data/Pantallas.json"
import { ETL } from "./etl";
export class Datos{
    fuente = data;
    modtick = moduticket;
    screens = pantallas;
    
    armaJSON(idd){
        // esta pantalla
        let MyScreen = {
            "nombre":"",
            "boxs":[],
            "mensaje":[]
        }

        //filtrar modulos
        let newMods = [];
        for(let i = 0; i<this.modtick.modulos.length;i++){
            if(this.modtick.modulos[i].idDepartment === idd){
                newMods.push(this.modtick.modulos[i]);
            }
        }
        //filtrar tickets
        for(let i = 0; i<this.modtick.tickets.length;i++){
    
            if(this.modtick.tickets[i].idDepartment === idd && (this.modtick.tickets[i].estado !== 4 && this.modtick.tickets[i].estado !== 13)){
                let newDato = {
                    "name":this.modtick.tickets[i].nameModule,
                    "dr":this.modtick.tickets[i].nombre_prof,
                    "paciente":this.modtick.tickets[i].nombre_paciente,
                    "estado":this.modtick.tickets[i].estado,
                    "hora":this.modtick.tickets[i].hora_citacion
                };
                MyScreen.boxs.push(newDato);
                
            }
                
        }
        // get pantalla
        
        for(let i = 0; i<this.screens.length;i++){
            if(this.screens[i].pantalla.idDepartment === idd){
                MyScreen.nombre = this.screens[i].pantalla.nombre;
                MyScreen.mensaje = this.screens[i].mensajes
                break;
            }
        }


        //MyScreen
        let datos = MyScreen.boxs;
        const etl = new ETL();
        let doctors = [];
        
        let finalJSON = [];

        for(let i = 0;i<datos.length;i++){//recorre el arreglo de datos proporcionado
            if(!doctors.includes(datos[i].dr)){
                doctors.push(datos[i].dr);
                let subPatient = [];
                let subPatientR = [];
                console.log(datos[i].dr+":");
                for(let j = 0;j<datos.length;j++){//recorre el arreglo de datos proporcionado otra vez
                    if(datos[i].dr === datos[j].dr && (!subPatientR.includes(datos[j].paciente))){
                        
                        console.log("   "+datos[j].paciente);
                        subPatientR.push(datos[j].paciente);
                        subPatient.push({
                            "Nombre":etl.recortaNombreP(datos[j].paciente),
                            "Estado":datos[j].estado,
                            "Hora":etl.getHora(datos[j].hora)
                        });
                    }
                }
                console.log("\n");
                finalJSON.push({
                    "medico":etl.recortaNombre(datos[i].dr),
                    "box":datos[i].name,
                    "pacientes":etl.PatientSort(subPatient)
                })
            }
        }
        return {"Name":MyScreen.nombre,"Datos":finalJSON,"Meseajes":MyScreen.mensaje}
    }
    
    consultar(idd){
        let newarray = []
        //let SQ = {"idDepartment": idd};
        //let resp = "nombre_prof";
        for(let i = 0; i<this.fuente.length;i++){//Obj en el array general
            if(this.fuente[i].idDepartment === idd){
                newarray.push(this.fuente[i])
            }
        }
        return newarray;
            //let aciertos = [];
            /*
            for(let j = 0;j<Object.keys(SQ).length;j++){//claves de la consulta
                if(this.fuente[i][Object.keys(SQ)[j]] === SQ[Object.keys(SQ)[j]]){
                    aciertos.push(1);
                }else{
                    aciertos.push(0);
                }
            }
            let result = 1;
            for(let a = 0; a<aciertos.length;a++){
                result = result*aciertos[a];
            }
            if(result>0){
                newarray.push(this.fuente[i]);
            }
        }
*/
    }


    getDatos(){
        return this.fuente;
    }
}

