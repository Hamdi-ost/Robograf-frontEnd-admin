export class Permission {
    id;
    name;
    description;

    static map(obj) {
        const resultat = new Permission ();
        resultat.id = obj.id;
        resultat.name = obj.name;
        resultat.description = obj.description;
        return resultat;
    }
}
