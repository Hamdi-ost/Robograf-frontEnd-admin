export class Machine {
    id: number;
    name: string;
    type: string;
    active;


    static map(rep) {
        const resultats = new Array(new Machine());
        for (const obj of rep) {
            const resultat = new Machine();
            resultat.id = obj.id;
            resultat.name = obj.name;
            resultat.type = obj.type;
            resultat.active = obj.active;
            resultats.push(resultat);
        }
        resultats.splice(0, 1);
        return resultats;
    }
}
