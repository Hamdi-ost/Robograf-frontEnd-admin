export class Photo {

    url;
    id;
    photoTime;
    machine;
    event;
    session;
    participant;

    static map(rep, machines, eventSession, participants) {

        const resultats = new Array(new Photo());
        for (const obj of rep) {
            const resultat = new Photo();
            resultat.id = obj.id;
            resultat.url = obj.url;
            resultat.photoTime = obj.photo_time;
            for (const machine of machines) {
                if (obj.machine_id === machine.id) {
                    resultat.machine = machine.name;
                }
            }
            for (const session of eventSession) {
                if (obj.session_id === session.id) {
                    resultat.session = session.number;
                   // resultat.event = session.event_id;
                }
            }
            for (const participant of participants) {
                if (obj.participant_id === participant.id) {
                    resultat.participant = participant.name;
                    resultat.event = participant.event;
                }
            }
            resultats.push(resultat);
            console.log(resultat);

        }
        resultats.splice(0, 1);
        return resultats;
    }
}
