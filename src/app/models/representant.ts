export class Representant {
    id;
    name;
    lastName;
    email;
    phone;
    company;


    static map(rep, companies) {
        const resultats = new Array(new Representant());
        for (const obj of rep) {
            const resultat = new Representant();
            resultat.id = obj.id;
            resultat.name = obj.first_name;
            resultat.lastName = obj.last_name;
            resultat.email = obj.email;
            resultat.phone = obj.phone;
            if (companies) {
                for (const company of companies) {
                    if (obj.entreprise_id === company.id) {
                        resultat.company = company.name;
                    }
                }
            }
            resultats.push(resultat);
        }
        resultats.splice(0, 1);
        return resultats;
    }
}
