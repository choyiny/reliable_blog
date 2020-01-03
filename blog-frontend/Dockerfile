FROM node:10 as build-app
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
RUN npm install -g @angular/cli@8.3.21
COPY . .
RUN ng build --prod --configuration=production

FROM nginx:alpine
COPY --from=build-app /usr/src/app/dist/blog-frontend /usr/share/nginx/html
