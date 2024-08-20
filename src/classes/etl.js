

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
                    let apellido = NomArray[2].charAt(0)+NomArray[2].substring(1).toLowerCase();
                    newNombre = NomArray[0].charAt(0)+". "+(apellido.length>=9? this.abreviar(apellido,6):apellido);
                } catch (error) {
                    let exNombre = NomArray[1].charAt(0)+NomArray[1].substring(1).toLowerCase();
                    newNombre = (exNombre.length>=12? this.abreviar(exNombre,11):exNombre);
                }
            }else{
                newNombre = this.abreviar(nombre,5);
            }
        }
        
        return newNombre;        
    }

    recortaNombreP(nombre){
        //A1 A2, N1 N2
        //A1, N1
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
           const iniApe = (ape)=>{
                let ini = "";
                ape.forEach(a=>ini=ini+a.charAt(0).toUpperCase());
                return ini;
           }
            //apellidos[0].charAt(0).toUpperCase()+apellidos[1].charAt(0).toUpperCase()+
            try {
                newNombre = ((nombres[0].charAt(0).toUpperCase()+nombres[0].substring(1).toLowerCase()).length >= 8? 
                    this.abreviar(nombres[0].charAt(0).toUpperCase()+nombres[0].substring(1).toLowerCase(),7):nombres[0].charAt(0).toUpperCase()+nombres[0].substring(1).toLowerCase())+" "+iniApe(apellidos);
            } catch (error) {
               //console.log("ecepcion")
                newNombre = NomArray[2].charAt(0)+NomArray[2].substring(1).toLowerCase();

            }
        }
        
        
        return newNombre;        
    }


    abreviar(txt,lim){
        let newTxt = ""; 
        
        if(txt.length <= lim){
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
        return this.abreviar(txtMod[0],4);//retorna la palabra mas larga abreviada
        
    }



    getHora(hrs){
        let ArrayNHora = [];
        if(hrs !== null){
            let ArrayHora = hrs.split(":");
            for(let i = 0; i<ArrayHora.length;i++){
                ArrayNHora.push(Number(ArrayHora[i]));
            }
        }
        
        return ArrayNHora;
    }

    getHoraValue(ArrayHora){
        let value = 0
        //60⁰=1
        //60¹=60
        //60²=360
        //360:60:1
        //[01:00:00]
        //[0, 1, 2]
        //[]
        if(ArrayHora.length > 0){
            let Tindex = ArrayHora.length-1;//2
            for(let i = 0; i<ArrayHora.length;i++){
                value = value+(ArrayHora[i]*Math.pow(60,Tindex))
                Tindex--;
            }
        }
        return value;
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
                if((this.getHoraValue(p[iaux].Hora)) < (this.getHoraValue(p[iaux-1].Hora))){
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
            //caso 5 "Box 5"
        
        let SalaArray = box.split(" ");
        
        //formato array
        //  caso 1 ["sala", "proc.", "trauma"]
        //  caso 2 ["Trauma1"]
        //  caso 3 ["Trauma1", "(2)"]
        //  caso 4 ["box5"]
        //  caso 5 ["Box", "5"]

        /*const noBOX = (txt) =>{
            // Usar una expresión regular para capturar el texto y el número
            const match = txt.match(/^([a-zA-Z]+)(\d+)$/);
            // Si hay un match, retornar un arreglo con el texto y el número
            if (match) {
                return [match[1], match[2]];
            } else {
                // Si no coincide con el patrón esperado, devolver null o un mensaje de error
                return [txt];
            }
        }*/
        //if(SalaArray.length === 1){
        //    SalaArray = noBOX(SalaArray[0]);
        //}

        let NoSala = SalaArray.filter(n=>((n !== "sala")&&(n !== "Sala")&&(n !== "de")&&(n !== "Ventanilla")))
        //sin "sala", "box" ni conectores
        //  caso 1 ["proc.", "trauma"]
        //  caso 2 ["Trauma1"]
        //  caso 3 ["Trauma1", "(2)"]
        //  caso 4 ["box5"]
        //  caso 5 ["Box", "5"]
        
        /*const busca = (txt) =>{
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
        }*/

        //let NoChar = busca(NoSala.join(""));

        let nombre = "";
        for(let i = 0; i<NoSala.length;i++){//unir elementos de arreglo para formar un único String
            if(i===0){
                nombre = nombre+" "+NoSala[i].charAt(0).toUpperCase()+NoSala[i].substring(1).toLowerCase();
            }else{
                nombre = nombre+" "+NoSala[i];
            }
        }

        //objetivo
        //  caso 1 "proc."
        //  caso 2 "1"
        //  caso 3 "1"
        return nombre
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
            final = "Box "+final;
        }else{
            final = this.abreviaComplex(box);
        }
        //console.log("final = "+final);
        return final
    }

    limpiaOnlyBox(box){
        let result = box;
        let esBox = false;
        //let arrayBox = box.split(" ");

        
        
        esBox = box.includes("box") || box.includes("Box") || box.includes("BOX")

        if(!esBox){
            result = this.limpiaOnlyProcess(result)
        }else{
            const boxLetter = ["0","0"]
            const boxSplit = box.split("");
            let racha = 0;
            
            let nombre = "";
            let fin = false;
            for(let l = 0; l<boxLetter.length;l++){
                //console.log("Racha = "+racha)
                for(let i = racha; i<boxSplit.length;i++){
                    if(boxSplit[i] === "("){
                        fin = true;
                        break;
                    }
                    if((boxSplit[i].toUpperCase() === boxLetter[l] || Number(boxSplit[i])+"" !== "NaN") && boxSplit[i] !== " "){
                        //console.log(i+" = "+boxSplit[i].toUpperCase())
                        racha = i+1;
                        nombre = nombre+(l===2?boxSplit[i].toUpperCase()+" ":boxSplit[i].toUpperCase())
                        break;
                    }
                    
                }
                if(fin || racha === boxSplit.length){
                    break;
                }
            }
            result = nombre;
        }
        return result;
    }

    limpiaOnlyProcess(box){
        let result = box;
        const esProcess = 
            box.includes("Proce") || 
            box.includes("Proce".toUpperCase()) || 
            box.includes("Proce".toLowerCase())
        if(esProcess){
            const arrayBox = box.split("");
            let nProc = "";
            for(let i = 0; i<arrayBox.length;i++){
                if(arrayBox[i] === "("){
                    break;
                }

                if(Number(arrayBox[i])+"" !== "NaN" && arrayBox[i] !== " "){
                    nProc = nProc+arrayBox[i];
                }
            }
            result = "SP "+nProc;
        }
        return result.toUpperCase()
    }

    titulo(tit){
        function Roma(num) {
            // Mapa de números y sus correspondientes símbolos romanos
            const valoresRomanos = [
                { valor: 1000, simbolo: 'M' },
                { valor: 900, simbolo: 'CM' },
                { valor: 500, simbolo: 'D' },
                { valor: 400, simbolo: 'CD' },
                { valor: 100, simbolo: 'C' },
                { valor: 90, simbolo: 'XC' },
                { valor: 50, simbolo: 'L' },
                { valor: 40, simbolo: 'XL' },
                { valor: 10, simbolo: 'X' },
                { valor: 9, simbolo: 'IX' },
                { valor: 5, simbolo: 'V' },
                { valor: 4, simbolo: 'IV' },
                { valor: 1, simbolo: 'I' }
            ];
            
            // Variable para almacenar el número romano resultante
            let resultado = '';
            
            // Iterar sobre los valores romanos
            for (const { valor, simbolo } of valoresRomanos) {
                // Mientras el número sea mayor o igual al valor actual
                while (num >= valor) {
                    resultado += simbolo;  // Añadir el símbolo romano al resultado
                    num -= valor;  // Reducir el número por el valor correspondiente
                }
            }
            
            return resultado;  // Devolver el número romano resultante
        }
        let tits = tit.split(" ");
        let result = ""
        if(tits.includes("Torre")){
            let torre = Roma(Number(tits[1]));
            tits.splice(1,1,torre);
            tits.forEach((t)=>result = result+t+" ")
        }else{
            result = tit;
        }

        return result
    }

    ticketSort(tickets){
        
    }

    CallTickets(datos){
        //let llamas = [];
        
        return datos.map((d)=>{
            d.forEach((p)=>{
                if(p.Estado === 2){
                    return p//llamas.push(p);
                }
            })
        })
    }

    capitalizeName(str) {
        let result = "";
        //console.log(str)
        let strList = str.split(" ");
        //console.log("lista: ")
        //console.log(strList)
        strList.forEach((s)=>{
            if (typeof s !== 'string' || s.length === 0) {
                return '';
            }
            result = result + s.charAt(0).toUpperCase() + s.slice(1).toLowerCase()+" ";
        });
        //console.log("Result: "+result);
        return result;
        
    }

    
}