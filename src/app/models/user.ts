export class User {
    id;
    name;
    email;
    password;
    roles = [];

    static map(obj) {
        const resultat = new User ();
        resultat.id = obj.id;
        resultat.name = obj.name;
        resultat.email = obj.email;
        for (const role of obj.role) {
            resultat.roles.push (role.name);
        }
        return resultat;
    }
}
