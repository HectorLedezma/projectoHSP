import data from "../data/DataTest.json";
import moduticket from "../data/modulos.json";
import pantallas from "../data/Pantallas.json"
export class Datos{
    fuente = data;
    modtick = moduticket;
    screens = pantallas;
    
    armaJSON(idd){
        // esta pantalla
        let MyScreen = {
            "nombre":"",
            "boxs":[],

        }

        //filtrar modulos
        let newMods = [];
        for(let i = 0; i<this.modtick.modulos.length;i++){
            if(this.modtick.modulos[i].idDepartment === idd){
                newMods.push(this.modtick.modulos[i]);
            }
        }
        //filtrar tickets
        let newTicks = [];
        for(let i = 0; i<this.modtick.tickets.length;i++){
            if(this.modtick.tickets[i].idDepartment === idd){
                newTicks.push(this.modtick.tickets[i]);
            }
        }
        // get pantalla
        let newScreen = {};
        for(let i = 0; i<this.screens.length;i++){
            if(this.screens[i].pantalla.idDepartment === idd){
                newScreen = this.screens[i];
                break;
            }
        }
        return JSON.stringify(newMods);
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

