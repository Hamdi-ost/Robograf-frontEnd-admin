export class Event {
    name: string;
    id: number;
    subject: string;
    location: string;
    //company : string;
    contact: string;
    author_id : number;

    static map(obj) {
        var resultat: Event[] = [
            {"id":1,"name":"Event1","subject":"Activity1","location":"location1","author_id":1,"contact":"email1"}
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