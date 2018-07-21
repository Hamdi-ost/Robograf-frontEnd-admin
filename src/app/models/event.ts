export class Event {
    name: string;
    id: number;
    subject: string;
    location: string;
    description;
    email_template_id;
    // company : string;
    author;

    static map(rep, users) {
        const resultats = new Array(new Event());
        for (const obj of rep) {
            const resultat = new Event();
            resultat.id = obj.id;
            resultat.name = obj.name;
            resultat.subject = obj.subject;
            resultat.location = obj.location;
            resultat.email_template_id = obj.email_template_id;
            for (const user of users) {
                if (obj.author_id === user.id) {
                    resultat.author = user.name;
                }
            }
            resultats.push(resultat);
        }
        resultats.splice(0, 1);
        return resultats;
    }


}
