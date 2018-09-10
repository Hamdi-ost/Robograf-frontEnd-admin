export class Account {

    id;
    username;
    password;
    link;
    event;
    permissions = [];
    author;


    static map(rep, events, users) {

        const resultats = new Array(new Account());
        for (const obj of rep) {
            const resultat = new Account();
            resultat.id = obj.id;
            resultat.username = obj.username;
            resultat.link = obj.link;
            for (const user of users) {
                if (obj.author_id === user.id) {
                    resultat.author = user.name;
                }
            }
            for (const event of events) {
                if (obj.event_id === event.id) {
                    resultat.event = event.name;
                }
                if (event.author === users) {
                    resultat.author = event.author;
                }
            }
           for (const permission of obj.permissions) {
                    resultat.permissions.push (permission.name);
            }
            resultats.push(resultat);
        }
        resultats.splice(0, 1);
        return resultats;
    }
}
