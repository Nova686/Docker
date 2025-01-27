# Docker

Projet réalisé en binôme par Tom Schmidt et Noé Zimmermann.

Le principe du projet est de réalisé un site web déployé avec Docker en local permetttant à des utilisateurs de se créer un compte pour ensuite liker/disliker des images enregistré au préalables.

Technos utilisés : 
- React pour le front-end
- NodeJs pour le back-end
- PostgreSQL pour la base de données
- Docker compose


# Mise en place

Changer les variables DB_USER et DB_PASSWORD avec voss identifiants de connexion postgresql dans le fichier .env.example puis renommez le en .env
Tapez ensuite la commande `docker-compose up --build -d` dans le terminal à la racine du projet.

# Structure Docker

Dans le projet, nous avons 3 containers : 
- Un pour le front qui build une image spécifiée dans le Dockerfile présent dans le dossier frontend
- Un pour le back qui build une image spécifiée dans le Dockerfile présent dans le dossier backend
- Un pour la base de données qui build une image postgresql officielle

Aucun réseau n'a été spécifié dans le docker-compose ce qui permet de laisser docker créer un network automatiquement comprenant tous les conteneurs.

Nous avons deux volumes pour la base de données : un volume pour l'initialisation qui se lance à l'initialisation du conteneur et un volume pour persister les données lors de l'arrêt du conteneur.

# Lien Frontend

http://localhost:4000/

# Lien Backend

http://localhost:3000/
