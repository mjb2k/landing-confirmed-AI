#builds docker container that hosts the actual website (apache2 giving me a headache).
FROM nginx
COPY /html /usr/share/nginx/html
EXPOSE 80
#docker run --name some-nginx -d some-content-nginx