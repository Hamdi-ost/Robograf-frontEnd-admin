export class Machine {
    id: number;
    name: string;
    type: string;
    active: string;


    static map(obj) {
        let i;
        let resultat : Machine[] ;
        for (i = 0; i < obj.length; i++) {
            resultat[i].name = obj[i].name;
            resultat[i].type = obj[i].type;
            resultat[i].active = obj[i].active;
        }
        console.log(resultat)
        return resultat;
    }
}