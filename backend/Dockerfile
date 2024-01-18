FROM node:16

WORKDIR /twzbja/backend/src/app

COPY package*.json ./

RUN npm install

COPY . .

# Expose le port nécessaire pour le backend
EXPOSE 3000

# Commande pour démarrer le serveur NestJS
CMD ["npm", "start"]