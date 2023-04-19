# express_server_test

Node.js Express

### husky有効化
1. `$ npx husky install`
2. `$ npx husky add .husky/pre-commit "npm lint-staged"`

### docker
#### redis
1. `$ docker-compose up -d`
2. `$ docker exec -it [CONTAINER ID] /bin/bash`
3. container id は `docker container ls` で取得する
