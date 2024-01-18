# Stage de construction
FROM node:16 as build

WORKDIR /twzbja/front_web/src/app

COPY package*.json ./

RUN npm install --only=production
RUN npm install -g @angular/cli@15.0.4

COPY . .

# Build de l'application Angular
RUN npm run build

# Stage de production
FROM nginx:latest

# Copie des fichiers de build depuis le stage de construction vers le serveur Nginx
COPY --from=build /twzbja/backend/src/app/dist/* /usr/share/nginx/html/

# Configuration optionnelle pour Nginx (peut être adaptée en fonction de vos besoins)
COPY nginx/nginx.conf /etc/nginx/nginx.conf

# Expose le port 80, le port par défaut pour le trafic HTTP
EXPOSE 80

# Commande pour démarrer le serveur Nginx
CMD ["nginx", "-g", "daemon off;"]
