export class GestionLocalStorage {
    sauvegarder(cle, valeur) {
        localStorage.setItem(cle, JSON.stringify(valeur));
    }

    recuperer(cle) {
        const valeur = localStorage.getItem(cle);
        return valeur ? JSON.parse(valeur) : null;
    }

    supprimer(cle) {
        localStorage.removeItem(cle);
    }
}