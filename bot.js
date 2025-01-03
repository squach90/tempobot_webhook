import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = 3000; // Change ce port si nécessaire

// Endpoint pour retourner la couleur de demain en texte simple
app.get("/tempo", async (req, res) => {
  try {
    const response = await fetch(
      "https://www.api-couleur-tempo.fr/api/jourTempo/tomorrow"
    );
    if (!response.ok) {
      throw new Error(`Erreur de l'API: ${response.statusText}`);
    }

    const data = await response.json();
    let couleur = data.codeJour;

    if (couleur == "2") {
      couleur = "Blanc";
    } else if (couleur == "1") {
      couleur = "Bleu";
    } else if (couleur == "3") {
      couleur = "Rouge";
    }

    // Répond avec un texte lisible par Google Assistant
    res.send(`La couleur de demain est ${couleur}.`);
  } catch (error) {
    console.error("Erreur lors de l'appel à l'API:", error);
    res.send(
      "Je n'ai pas pu récupérer la couleur pour demain. Réessayez plus tard."
    );
  }
});

// Lancer le serveur
app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}/tempo`);
});
