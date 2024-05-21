FROM node:20.10.0-alpine AS build
WORKDIR /app
COPY package* ./
RUN npm install
COPY index.html ./
COPY public ./public
COPY src ./src
COPY vite.config.js ./
RUN npm run build

FROM nginx:1.25.3-bookworm
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/movie_frontend.conf
COPY --from=build /app/dist /usr/share/nginx/html
COPY static /usr/share/nginx/html/assets
EXPOSE 80