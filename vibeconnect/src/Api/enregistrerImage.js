export class enregistrerImage {
    #url = "https://api.imgbb.com/1/upload";

    async enregistrerImage(file) {
        const formData = new FormData();
        formData.append("image", file);

        try {
            const response = await fetch(`${this.#url}?key=13e23ba73019e46517fcb418bfe527b7`, {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Erreur lors de l'envoi de l'image : ${errorData.error.message}`);
            }

            const data = await response.json();
            return data.data.url; 
        } catch (error) {
            console.error("Erreur:", error);
            throw error;
        }
    }
}