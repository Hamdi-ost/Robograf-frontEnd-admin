export class Event {
    name: string;
    id: number;
    subject: string;
    location: string;
    description;
    email_template_id;
    // company : string;
    author_id: number;

    static map(obj) {
        const resultat = new Event ();
        resultat.id = obj.id;
        resultat.name = obj.name;
        resultat.subject = obj.subject;
        resultat.location = obj.location;
        resultat.email_template_id = obj.email_template_id;
        resultat.author_id = obj.author_id;
        return resultat;
    }

}
