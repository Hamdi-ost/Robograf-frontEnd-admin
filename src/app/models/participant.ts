export class Participant {
    id;
    email;
    name;
    last_name;
    gender;
    age;
    phone;
    event;

    static map(rep, events) {
        const resultats = new Array(new Participant());
        for (const obj of rep) {
            const resultat = new Participant();
            resultat.id = obj.id;
            resultat.name = obj.name;
            resultat.last_name = obj.last_name;
            resultat.gender = obj.gender ? 'Female' : 'Male';
            resultat.email = obj.email;
            resultat.age = obj.age;
            resultat.phone = obj.phone;
            if (events) {
                for (const event of events) {
                    if (obj.event_id === event.id) {
                        resultat.event = event.name;
                    }
                }
            }
            resultats.push(resultat);
        }
        resultats.splice(0, 1);
        return resultats;
    }


}
