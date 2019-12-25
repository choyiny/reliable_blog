FROM node:10 as build-app
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
RUN npm install -g @angular/cli@8.2.14
COPY . .
RUN ng build --configuration=production

FROM nginx:alpine
COPY --from=build-app /usr/src/app/dist/ /usr/share/nginx/html
