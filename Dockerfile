FROM timbru31/java-node

WORKDIR /app

COPY package*.json ./

RUN npm i -g npm

RUN npm i

RUN npm install -g firebase-tools

EXPOSE 9005

COPY . .

ENTRYPOINT [ "npm", "start" ]
