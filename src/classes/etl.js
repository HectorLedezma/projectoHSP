

export class ETL{

    recortaNombre(nombre){
        //N1 N2 A1 A2
        let NomArray = nombre.split(" ");
        NomArray = NomArray.filter(n => (n !== "" && n !== "DE") && (n !== "LA" && n !== "DEL") && (n !== "LOS"));
        let newNombre = "";
        try {//          Inicial del 1er nombre.   Apellido
            newNombre = NomArray[0].charAt(0)+". "+NomArray[2].charAt(0)+NomArray[2].substring(1).toLowerCase();    
        } catch (error) {
            newNombre = NomArray[1].charAt(0)+NomArray[1].substring(1).toLowerCase();
        }
        
        return newNombre;        
    }

    recortaNombreP(nombre){
        //A1 A2, N1 N2
        //0  1  2  3
        //separar nombres y apellidos
        let NomArray0 = nombre.split(",");
        //identificar apellidos compuestos
        let apellidos = NomArray0[0].split(" ");
        apellidos = apellidos.filter(n => (n !== "" && n !== "DE") && (n !== "LA" && n !== "DEL") && (n !== "LOS"));
        //separar nombres
        let nombres = NomArray0[1].split(" ");
        nombres = nombres.filter(n => n !== "");

        let NomArray = nombre.split(" ");
        NomArray = NomArray.filter(n => (n !== "" && n !== ","));
        
        let newNombre = "";
        try {
            newNombre = nombres[0].charAt(0).toUpperCase()+nombres[0].substring(1).toLowerCase()+" "+apellidos[0].charAt(0).toUpperCase()+".";
        } catch (error) {
            newNombre = NomArray[2].charAt(0)+NomArray[2].substring(1).toLowerCase();
        }
        
        return newNombre;        
    }

    getHora(hrs){
        let ArrayHora = hrs.split(":");
        let ArrayNHora = [];
        for(let i = 0; i<2;i++){
            ArrayNHora.push(Number(ArrayHora[i]));
        }
        return ArrayNHora;
    }

    PatientSort(p){
        for(let i = 1; i < p.length;i++){
            let iaux = i;
            while(true){
                if(((p[iaux].Hora[0]*60)+p[iaux].Hora[1]) < ((p[iaux-1].Hora[0]*60)+p[iaux-1].Hora[1])){
                    let aux = p[iaux];
                    p[iaux] = p[iaux-1];
                    p[iaux-1] = aux;
                }
                if(iaux > 1){
                    iaux = iaux-1;
                }else{
                    break
                }

            }
        }
        return p
    }

    

    
}