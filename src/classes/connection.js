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
            await this.esperar(1000);
            this.blog = res.data;
        } catch (error) {
            console.log("algo salió mal aqui en getModules")
            console.log(error);
            this.blog = String(error);
        }
        return this.blog
    }

    async getPantalla(){
        try {
            const res = await axios.post(process.env.REACT_APP_SCREENS_TEST);
            await this.esperar(1000);
            this.blog = res.data;
        } catch (error) {
            console.log("algo salió mal aqui en getPantalla")
            console.log(error);
            this.blog = String(error);
        }
        return this.blog
    }
}