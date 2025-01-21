# frontend/Dockerfile
FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

# Build l'application
RUN npm run build

# Exposer le port 3000
EXPOSE 3000

# Option 1 : utiliser un petit serveur node pour le build
RUN npm install -g serve
CMD ["serve", "-s", "build"]

# Option 2 : démarrer en mode dev (pas recommandé pour prod)
# CMD ["npm", "start"]