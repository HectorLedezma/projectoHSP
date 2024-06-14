

export class ETL{

    recortaNombre(nombre){
        //N1 N2 A1 A2
        let newNombre = "v";
        if(nombre !== null && nombre !== ""){
            let NomArray = nombre.split(" ");//[N1, N2, A1, A2]
            
           //console.log("nombre = "+NomArray);
            if( NomArray.length > 1){
                
                NomArray = NomArray.filter(n => (n !== "" && n !== "DE") && (n !== "LA" && n !== "DEL") && (n !== "LOS"));
                try {//          Inicial del 1er nombre.   Apellido
                    newNombre = NomArray[0].charAt(0)+". "+NomArray[2].charAt(0)+NomArray[2].substring(1).toLowerCase();    
                } catch (error) {
                    newNombre = NomArray[1].charAt(0)+NomArray[1].substring(1).toLowerCase();
                }
            }else{
                newNombre = this.abreviar(nombre);
            }
        }
        
        return newNombre;        
    }

    recortaNombreP(nombre){
        //A1 A2, N1 N2
        //0  1  2  3
        //separar nombres y apellidos
       //console.log("nombreP = "+nombre)
        let newNombre = "P";
        if(nombre !== null && nombre !== ""){
            // "404 , P"
            let NomArray0 = nombre.split(",");
            // ["404" , "P"]
            //identificar apellidos compuestos
            let apellidos = NomArray0[0].split(" ");
            apellidos = apellidos.filter(n => (n !== "" && n !== "DE") && (n !== "LA" && n !== "DEL") && (n !== "LOS"));
            //separar nombres
            let nombres = NomArray0[1].split(" ");
           //console.log("nombreP V2 = "+nombres)
            nombres = nombres.filter(n => n !== "");
           //console.log("nombreP V3 = "+nombres)
            let NomArray = nombre.split(" ");
           //console.log("nombreP V4 = "+NomArray)
            NomArray = NomArray.filter(n => (n !== "" && n !== ","));
           //console.log("nombreP V5 = "+NomArray)
            
            try {
                newNombre = nombres[0].charAt(0).toUpperCase()+nombres[0].substring(1).toLowerCase()+" "+apellidos[0].charAt(0).toUpperCase()+".";
            } catch (error) {
               //console.log("ecepcion")
                newNombre = NomArray[2].charAt(0)+NomArray[2].substring(1).toLowerCase();

            }
        }
        
        
        return newNombre;        
    }


    abreviar(txt){
        let newTxt = ""; 
        const lim = 5
        if(txt.length < lim){
            newTxt = txt
        }else{
            newTxt = txt.slice(0,lim)+"."
        }
        return newTxt;
    }

    abreviaComplex(txt){

        //Ej: "Sala de procedimientos especiales"
        let txtMod = txt.split(" ");//crea un arreglo de palabras
        
        //["Sala", "de", "procedimientos", "especiales"]
        const lenSort = (l) =>{
            for(let i = 1; i<l.length;i++){
                let auxi = i;
                while(true){
                    if(l[auxi].length > l[auxi-1].length){
                        let aux = l[auxi];
                        l[auxi] = l[auxi-1];
                        l[auxi-1] = aux;
                    }
                    if(auxi > 1){
                        auxi = auxi-1
                    }else{
                        break;
                    }
                }
            }
            return l
        }
        if(txtMod.length > 1){
            txtMod = lenSort(txtMod);//ordena el arreglo por el largo de cada palabra
        }
        return this.abreviar(txtMod[0]);//retorna la palabra mas larga abreviada
        
    }



    getHora(hrs){
        let ArrayNHora = [];
        if(hrs !== null){
            let ArrayHora = hrs.split(":");
            for(let i = 0; i<2;i++){
                ArrayNHora.push(Number(ArrayHora[i]));
            }
        }
        
        return ArrayNHora;
    }

    estateSort(p){
        let pl = []
        for(let i = 0; i<p.length;i++){
            if(p[i].Estado === 2){
                pl.unshift(p[i]);
            }else{
                pl.push(p[i]);
            }
        }
        return pl
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
        return this.estateSort(p);
    }

    limpiaBox(box){
        //original
            //caso 1 "sala proc. trauma"
            //caso 2 "Trauma1"
            //caso 3 "Trauma1 (2)"
            //caso 4 "box5"
        
        let SalaArray = box.split(" ");
        
        //formato array
        //  caso 1 ["sala", "proc.", "trauma"]
        //  caso 2 ["Trauma1"]
        //  caso 3 ["Trauma1", "(2)"]
        //  caso 4 ["box5"]

        const noBOX = (txt) =>{
            // Usar una expresión regular para capturar el texto y el número
            const match = txt.match(/^([a-zA-Z]+)(\d+)$/);
            // Si hay un match, retornar un arreglo con el texto y el número
            if (match) {
                return [match[1], match[2]];
            } else {
                // Si no coincide con el patrón esperado, devolver null o un mensaje de error
                return [txt];
            }
        }
        if(SalaArray.length === 1){
            SalaArray = noBOX(SalaArray[0]);
        }

        let NoSala = SalaArray.filter(n=>((n !== "sala")&&(n !== "Sala")&&(n !== "box")&&(n !== "Box")&&(n !== "de")))
        //sin "sala", "box" ni conectores
        //  caso 1 ["proc.", "trauma"]
        //  caso 2 ["Trauma1"]
        //  caso 3 ["Trauma1", "(2)"]
        //  caso 4 ["box5"]
        
        const busca = (txt) =>{
            let newTxt = "";
            let txtArray = txt.split("");
            
            for(let i = 0;i < txtArray.length; i++){
                if(!txtArray[i].includes("(")){
                    newTxt = newTxt + txtArray[i];
                }else{
                    break;
                }
            }
            return newTxt;
        }

        let NoChar = busca(NoSala.join(""));

        let nombre = "";
        for(let i = 0; i<NoChar.length;i++){//unir elementos de arreglo para formar un único String
            if(i===0){
                nombre = nombre+NoChar[i].charAt(0).toUpperCase()+NoChar[i].substring(1).toLowerCase();
            }else{
                nombre = nombre+" "+NoChar[i];
            }
        }

        //objetivo
        //  caso 1 "proc."
        //  caso 2 "1"
        //  caso 3 "1"
        return NoChar
    }

    limpiaBox2(box){
        //console.log("box = "+box);
        let final = ""
        const numeros = ["1","2","3","4","5","6","7","8","9","0"];
        //ver si el nombre de la sala hace referencia a un box
        const hayBox = box.includes("box") || box.includes("Box") || box.includes("BOX");
        //console.log("box? = "+hayBox);
        if(hayBox){
            let parentesis = box.charAt(0) === '(';//revisar si hay paréntesis
            //console.log("(? = "+parentesis);
            for(let i = 0;i<box.length;i++){
                //Ej: "Box 21 especial (1)";
                if(!parentesis){//si no hay paréntesis
                    if(numeros.includes(box.charAt(i))){//revisar si hay numeros
                        final = final+box.charAt(i);
                    }
                }
                if(i < box.length-1){//si aun quedan caracteres por evaluar
                    if(box.charAt(i+1) === ')'){//revisar si se cierran paréntesis
                        parentesis = false;//establece que no habrán mas paréntesis
                    }else{
                        parentesis = box.charAt(i+1) === '(';//revisar si hay paréntesis en el sig char
                    }
                    
                }
            }
        }else{
            final = this.abreviaComplex(box);
        }
        //console.log("final = "+final);
        return final
    }


    ticketSort(tickets){
        
    }

    
}