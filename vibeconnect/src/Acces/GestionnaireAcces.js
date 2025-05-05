import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GestionLocalStorage } from "../LocalStorage/GestionLocalStorage.js";

export function useConnexion() {
    const navigate = useNavigate();
    const gestionnaireLocalStorage = new GestionLocalStorage();

    useEffect(() => {
        try {
            const userId = gestionnaireLocalStorage.recuperer("id");
            if (userId) {
                if (window.location.pathname !== "/accueil") {
                    navigate("/accueil");
                }
            }
        } catch (error) {
            console.error("Error during navigation:", error);
        }
    }, [navigate]);
}

export function useBlockAcces() {
    const navigate = useNavigate();
    const gestionnaireLocalStorage = new GestionLocalStorage();

    useEffect(() => {
        try {
            const userId = gestionnaireLocalStorage.recuperer("id");
            if (!userId) {
                navigate("/");
            }
        } catch (error) {
            console.error("Error during navigation:", error);
        }
    }, [navigate]);
}