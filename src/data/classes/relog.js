

export class Reloj{
    date = new Date();

    getHora(){
        const hora = this.date.getHours();
        const minu = this.date.getMinutes();
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