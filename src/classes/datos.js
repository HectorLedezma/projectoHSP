import data from "../data/DataTest.json";
//import moduticket from "../data/modulos.json";
//import pantallas from "../data/Pantallas.json"
import { Connection } from "./connection";
import { ETL } from "./etl";
export class Datos{
    con = new Connection();
    etl = new ETL();
    fuente = data;
    modtick = {"tickets":[],"modulos":[]};//moduticket;
    screens = [
        {
            "pantalla":{
                "idDepartment": 0,
                "nombre": ""
            },
            "mensajes": []
        }
    ]//pantallas;
    
    actualizar(idd){
        return this.armaJSON(idd);
    }

    async armaJSON2(idd){
        let MyScreen = {
            "nombre":"",//nombre de la pantalla
            "boxs":[],//salas que posee
            "mensaje":[]//mensajes de la pantalla
        }
        this.modtick = await this.con.getModules(idd);
        this.screens = await this.con.getPantalla();
        let llamando = [];
        this.modtick.modulos.forEach(element => {

            let tickets = this.modtick.tickets.filter(x=>(x.idModule === element.idModule))
            //console.log("ticket")
            //console.log(tickets)
            //console.log(element.idModule)
            //de los tickest guardar el 1er ticket que se esta llamando
            for(let i = 0; i<tickets.length;i++){
                if(tickets[i].estado === 2){
                    llamando.unshift(tickets[i]);
                }else{
                    llamando.push(tickets[i]);
                }
            }
            //console.log(llamando)
            //guardar el ultimo ticket que se llamó
            //si el ticket que llamo es nulo => mostrar ultimo !=> mostrar el que esta llamando
            //si ticket len = 0 => no mostrar
            //si el.st = 1 => mostrar
            /**
             * let llamado = llamando[0];

                let ultimo = tickets[0];
                let ticket = (llamado === null? ultimo : llamado);
             */
            

        });
        if(llamando.length > 0){
            for(let i = 0; i<llamando.length;i++){
                
                let newDato = {
                    "id":llamando[i].id, 
                    "name":llamando[i].nameModule,//modulo
                    "dr":(llamando[i].nombre_prof !== null? this.etl.recortaNombre(llamando[i].nombre_prof) : this.etl.abreviar(llamando[i].nameType,4)),
                    "paciente":(llamando[i].nombre_paciente !== null ? this.etl.recortaNombreP(llamando[i].nombre_paciente): llamando[i].number + llamando[i].letter),
                    "estado":llamando[i].estado,
                    "hora":llamando[i].hora_citacion
                };
                MyScreen.boxs.push(newDato);
            }
        }
        return MyScreen
    }

    async armaJSON(idd){
        //console.log("await armaJSON(idd)");
        this.modtick = await this.con.getModules(idd);
        //this.modtick.tickets.map(t=>t.nameModule === "Oficina Dermatologia"?//console.log(t): "");
        this.screens = await this.con.getPantalla();
        //console.log(this.modtick);
        // esta pantalla
        let MyScreen = {
            "nombre":"",//nombre de la pantalla
            "boxs":[],//salas que posee
            "mensaje":[],//mensajes de la pantalla
            "poli":false
        }

        
        
        const getModul = (idMod) =>{
            //console.log(this.modtick.modulos);
            let res = {
                "idModule": idMod,
                "nameModule": "",
                "state": 1,//vigente 
                "idDepartment": idd,
                "dirIP": "",
                "disponible": 0//llamando
            };
           //console.log(idMod);
            for(let j = 0; j < this.modtick.modulos.length;j++){
                //console.log(Number(idMod) +" | "+ this.modtick.modulos[j].idModule);
                if(Number(idMod) === this.modtick.modulos[j].idModule){

                    res = this.modtick.modulos[j];
                   //console.log(res);
                    break
                }
            }
            
            return res;
        }
        
        //filtrar tickets por dpto.
        //console.log()
        //console.log(this.modtick.tickets)

        for(let i = 0; i<this.modtick.tickets.length;i++){
            // si el ticker coincide con el id del dpto. y que su estado no sea 4 ni 13 this.modtick.tickets[i].estado !== 4 && this.modtick.tickets[i].idDepartment === idd &&
            if((this.modtick.tickets[i].estado !== 13) /*&& (this.modtick.tickets[i].estado !== 4)*/){
               //console.log(this.modtick.tickets[i]);
                let nombreSala = getModul(this.modtick.tickets[i].idModule);
                //console.log("nombreSala = "+nombreSala.nameModule);
                let doctor = (this.modtick.tickets[i].nombre_prof !== null? this.etl.recortaNombre(this.modtick.tickets[i].nombre_prof) : this.etl.abreviar(this.modtick.tickets[i].nameType,15))
                if(nombreSala.nameModule === ""){

                    //console.log(this.modtick.tickets[i])
                    nombreSala.nameModule = ""//this.modtick.tickets[i].nameModule//(this.modtick.tickets[i].nombre_prof !== null? this.etl.recortaNombre(this.modtick.tickets[i].nombre_prof) : this.etl.abreviar(this.modtick.tickets[i].nameType,15));

                }else{
                    nombreSala.nameModule = this.etl.limpiaOnlyBox(nombreSala.nameModule)
                }
               //console.log(nombreSala);
                let newDato = {
                    "id":this.modtick.tickets[i].id, 
                    "name":(nombreSala.nameModule),//modulo
                    "dr":doctor,
                    "drCompleto":this.etl.capitalizeName(this.modtick.tickets[i].nombre_prof),
                    "paciente":(this.modtick.tickets[i].nombre_paciente !== null ? this.etl.recortaNombreP(this.modtick.tickets[i].nombre_paciente): this.modtick.tickets[i].number + this.modtick.tickets[i].letter),
                    "estado":this.modtick.tickets[i].estado,
                    "hora":this.modtick.tickets[i].hora_citacion
                };
                MyScreen.boxs.unshift(newDato);   
            }
        }

        // get pantalla
        for(let i = 0; i<this.screens.length;i++){
            if(this.screens[i].pantalla.idDepartment === idd){
                MyScreen.nombre = this.screens[i].pantalla.nombre;
                MyScreen.mensaje = this.screens[i].mensajes
                MyScreen.poli = this.screens[i].pantalla.policlinico
                break;
            }
        }


        //MyScreen
        let datos = MyScreen.boxs;
        
        let doctors = [];
        
        let finalJSON = [];
        //console.log(datos);
        for(let i = 0;i<datos.length;i++){//recorre el arreglo de datos proporcionado
            if(!doctors.includes(datos[i].dr)){//pregunta si el nombre del box no fue considerado
                doctors.push(datos[i].dr);
                let subPatient = [];//arreglo de tickets a nombre de un mismo box
                //console.log(datos[i]);
                for(let j = 0;j<datos.length;j++){//recorre el arreglo de datos proporcionado otra vez
                    //para capturar todos los tickets que correspondan al mismo medico
                    if(datos[i].dr === datos[j].dr){
                        subPatient.push({
                            "id":datos[j].id,
                            "Modulo":datos[j].name,
                            "Nombre":datos[j].paciente,
                            "Estado":datos[j].estado,
                            "Hora":this.etl.getHora(datos[j].hora),
                            "Medico":datos[i].drCompleto
                        });
                    }
                }
                //
                finalJSON.push({
                    "id":datos[i].id,// id
                    "medico":datos[i].dr,// nombre_prof
                    "box":datos[i].name,// nombre_box
                    "pacientes":this.etl.PatientSort(subPatient) //arreglo de pacientes
                })
            }
        }
       //console.log(doctors);
        const respuesta = {"poli":MyScreen.poli,"Name":this.etl.titulo(MyScreen.nombre),"Datos":finalJSON,"Messages":MyScreen.mensaje}
        
        return respuesta
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


    async getScreens(){
        this.screens = await this.con.getPantalla();
        return this.screens;
    }
}


