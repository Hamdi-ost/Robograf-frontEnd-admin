export class Template {

    id;
    state;
    event;
    nbrValidated;
    url;

    static map(rep, events) {
        const resultats = new Array(new Template());
        for (const obj of rep) {
            const resultat = new Template();
            resultat.id = obj.id;
            resultat.state = obj.state ? 'Open' : 'Closed';
            for (const event of events) {
                if (obj.event_id === event.id) {
                    resultat.event = event.name;
                }
            }
            resultat.nbrValidated = obj.nbrValidated + '/' + obj.total;
            resultats.push(resultat);
        }
        resultats.splice(0, 1);
        return resultats;
    }

    static map2(rep) {
        const resultats = new Array(new Template());
        for (const obj of rep) {
            const resultat = new Template();
            resultat.url = obj.url;
            resultat.id = obj.id;
            resultat.state = obj.state;
            resultats.push(resultat);
        }
        resultats.splice(0, 1);
        return resultats;
    }
}
