export class Machine {
    id: number;
    name: string;
    type: string;
    active: number;


    static map(obj) {

        const resultat = new Machine ();
        resultat.id = obj.id;
        resultat.name = obj.name;
        resultat.type = obj.type;
        resultat.active = obj.active;
        return resultat;
    }
}
