import { stringify } from '@angular/compiler/src/util';

export class Company {
    id;
    matricule;
    name;
    activity;

    static map(rep) {
        const resultats = new Array(new Company());
        for (const obj of rep) {
            const resultat = new Company();
            resultat.matricule = obj.matricule;
            resultat.name = obj.name;
            resultat.activity = obj.activity;
            resultat.id = obj.id;
            resultats.push(resultat);
        }
        resultats.splice(0, 1);
        return resultats;
    }
}
