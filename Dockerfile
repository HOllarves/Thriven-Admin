FROM node:latest
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD if [ ${APP_ENV} = production ]; \
    then \
    npm install -g http-server && \
    npm run build && \
    cd build && \
    hs -p 3000; \
    else \
    npm run start; \
    fi