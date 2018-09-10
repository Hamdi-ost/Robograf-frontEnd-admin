export class Execption {
    type;
    message;
    lastest_occurrence;
    machine;
    nbr_occurence;

    static map(rep, machines) {
        const resultats = new Array(new Execption());
        for (const obj of rep) {
            const resultat = new Execption();
            resultat.type = obj.type ? 'Invalid Data Exception' : 'Camera Disconnected Exception';
            resultat.message = obj.message;
            resultat.lastest_occurrence = obj.latest_occurrence;
            for (const machine of machines) {
                if (obj.machine_id === machine.id) {
                    resultat.machine = machine.name;
                }
            }
            resultats.push(resultat);
        }
        resultats.splice(0, 1);
        return resultats;
    }
}
