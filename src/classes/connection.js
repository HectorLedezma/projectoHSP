import axios from "axios";

export class Connection {
    blog = [];
    
    async getModules(dpto){
        try {
            const res = await axios.post(process.env.REACT_APP_MODULES_TEST+dpto);
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
            this.blog = res.data;
        } catch (error) {
            console.log("algo salió mal aqui en getPantalla")
            console.log(error);
            this.blog = String(error);
        }
        return this.blog
    }
}