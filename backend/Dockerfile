# backend/Dockerfile
FROM node:18-alpine

# Créer un répertoire pour l’application
WORKDIR /usr/src/app

# Copier package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste du code
COPY . .

# Exposer le port 4000 (ou autre)
EXPOSE 4000

# Lancer l’application
CMD ["node", "index.js"]