export class User {
    id;
    name;
    email;
    password;


    static map(obj) {
        const resultat = new User ();
        resultat.id = obj.id;
        resultat.name = obj.name;
        resultat.email = obj.email;
        return resultat;
    }
}
