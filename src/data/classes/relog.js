

export class Reloj{
    date = new Date();

    getHora(){
        const unidad = (num) =>{
            let n = "";
            if(num<10){
                n = "0"+num;
            }else{
                n = ""+num;
            }
            return n;
        };
        const hora = unidad(this.date.getHours());
        const minu = unidad(this.date.getMinutes());
        return{hora:hora,minu:minu};
    }

    getFecha(){
        const dias = ["Lunes","Martes","Miércoles","Jueves","Viernes","Sábado","Domingo"];
        const Ndia = this.date.getDay();
        const dia = this.date.getDate();
        const meses = [
            "Enero",
            "Febrero",
            "Marzo",
            "Abril",
            "Mayo",
            "Junio",
            "Julio",
            "Agosto",
            "Septiembre",
            "Octubre",
            "Noviembre",
            "Diciembre"
        ];
        const mes = this.date.getMonth();
        const año = this.date.getFullYear();
        return dias[Ndia]+" "+dia+" de "+meses[mes]+" de "+año
    }

}