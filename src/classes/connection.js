import axios from "axios";

export class Connection {
    blog = [];
    
    esperar(t){
        return new Promise(
            resolve =>{
                setTimeout(resolve,t);
            }
        )
    }

    async getModules(dpto){
        try {
            const res = await axios.post(process.env.REACT_APP_MODULES_TEST+dpto);
            //console.log("Conexión con el servidor establecida")
            await this.esperar(1000);
            this.blog = res.data;
        } catch (error) {
            console.log("No hay conexión con el servidor")
            await this.esperar(1000);
            this.blog = {"tickets":[],"modulos":[]};
        }
        return this.blog
    }

    async getPantalla(){
        try {
            const res = await axios.post(process.env.REACT_APP_SCREENS_TEST);
            //console.log("Conexión con el servidor establecida")
            await this.esperar(1000);
            this.blog = res.data;
        } catch (error) {
            console.log("No hay conexión con el servidor")
            //console.log(error);
            this.blog = [{
                "pantalla":{
                    "idDepartment": 0,
                    "nombre": "No hay conexión con el servidor",
                    "policlinico":false
                },
                "mensajes": []
            }];
        }
        return this.blog
    }
}