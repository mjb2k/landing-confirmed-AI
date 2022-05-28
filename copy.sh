docker container exec lc rm -rf /usr/share/nginx/html/
docker container exec lc mkdir /usr/share/nginx/html/

docker container cp html/libraries lc:/usr/share/nginx/html/
docker container cp html/main.js lc:/usr/share/nginx/html/
docker container cp html/player.js lc:/usr/share/nginx/html/
docker container cp html/index.html lc:/usr/share/nginx/html/
docker container cp html/images lc:/usr/share/nginx/html/
