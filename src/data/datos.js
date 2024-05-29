import data from "./DataTest.json";


export class Datos{
    fuente = data;
    
    
    consultar(){
        let newarray = []
        let SQ = {"idDepartment": 25};
        let resp = "nombre_prof";
        for(let i = 0; i<this.fuente.length;i++){//Obj en el array general
            let aciertos = [];
            for(let j = 0;j<Object.keys(SQ).length;j++){//claves de la consulta
                if(this.fuente[i][Object.keys(SQ)[j]]=== SQ[Object.keys(SQ)[j]]){
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

        try {
            let sinRepetir = [];
            for(let i = 0; i < newarray.length;i++){
                if(!sinRepetir.includes(newarray[i][resp])){
                    sinRepetir.push(newarray[i][resp]);
                }
            }
            for(let j = 0; j<sinRepetir.length;j++){
                console.log(sinRepetir[j]);
            }   
        } catch (error) {
            console.log("No se encontraron resultados")
        }
    }


    getDatos(){
        return this.fuente;
    }
}

