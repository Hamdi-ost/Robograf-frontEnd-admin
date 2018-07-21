import { Machine } from './machine';

export class Session {
    id;
    number;
    startDate;
    startTime;
    endTime;
    endDate;
    description;
    eventS;
    machines: any[];

    static map(rep, events) {
        const resultats = new Array(new Session());
        for (const obj of rep) {
            const resultat = new Session();
            resultat.id = obj.id;
            resultat.number = obj.number;
            resultat.startDate = obj.date;
            resultat.startTime = obj.start_time;
            resultat.endTime = obj.end_time;
            resultat.endDate = obj.end_date;
            resultat.description = obj.description;
            for (const event of events) {
                if (obj.event_id === event.id) {
                    resultat.eventS = event.name;
                }
                resultats.push(resultat);
            }
        }
        resultats.splice(0, 1);
        return (resultats);
    }
}
