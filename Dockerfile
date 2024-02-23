FROM nginx:1.25.3-bookworm

COPY ./nginx.conf /etc/nginx/conf.d/movie_frontend.conf
COPY ./dist /usr/share/nginx/html

EXPOSE 80