

export class ETL{

    recortaNombre(nombre){
        //N1 N2 A1 A2
        let NomArray = nombre.split(" ");
        let newNombre = "";
        try {
            newNombre = NomArray[0].charAt(0)+NomArray[0].substring(1).toLowerCase()+" "+NomArray[2].charAt(0)+". ";    
        } catch (error) {
            newNombre = NomArray[1].charAt(0)+NomArray[1].substring(1).toLowerCase();
        }
        
        return newNombre;        
    }

    recortaNombreP(nombre){
        //N1 N2 A1 A2
        let NomArray = nombre.split(" ");
        let newNombre = "";
        try {
            newNombre = NomArray[2].charAt(0)+NomArray[2].substring(1).toLowerCase()+" "+NomArray[0].charAt(0)+". ";    
        } catch (error) {
            newNombre = NomArray[2].charAt(0)+NomArray[2].substring(1).toLowerCase();
        }
        
        return newNombre;        
    }

    
}