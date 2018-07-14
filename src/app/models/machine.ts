export class Machine {
    id: number;
    name: string;
    type: string;
    active: number;


    static map(obj) {
        var resultat: Machine[] = [
            { 'id': 1, 'name': "", 'type': "", 'active': 1 }
        ];
        var i;
        for (i = 0; i < obj.length; i++) {
            delete obj[i]['created_at'];
            delete obj[i]['deleted_at'];
            delete obj[i]['updated_at'];
            resultat.push(obj[i]);
        }
        resultat.splice(0, 1)
        return resultat;
    }
}