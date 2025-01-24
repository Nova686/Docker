# Docker

Projet réalisé en binôme par Tom Schmidt et Noé Zimmermann.

Le principe du projet est de réalisé un site web déployé avec Docker en local permetttant à des utilisateurs de se créer un compte pour ensuite liker/disliker des images enregistré au préalables.

Technos utilisés : 
- React pour le front-end
- NodeJs pour le back-end
- PostgreSQL pour la base de données
- Docker compose


# Mise en place

Changer les variables DB_USER et DB_PASSWORD dans le fichier .env.example puis renommez le en .env
Tapez ensuite la commande `docker-compose up --build -d` dans le terminal à la racine du projet.

# Structure Docker

Dans le projet, nous avons 3 containers : 
- Un pour le front qui build une image spécifiée dans le Dockerfile présent dans le dossier frontend
- Un pour le back qui build une image spécifiée dans le Dockerfile présent dans le dossier backend
- Un pour la base de données qui build une image postgresql officielle

Au niveau des réseaux, nous avons mis en place deux réseaux. D'un côté un réseau (frontend-network) pour la bdd et backend et d'un autre côté, un autre réseau (frontend-network) pour le frontend et le backend. Cela nous permettra d'ajouter une couche de sécurité pour la base de données.

