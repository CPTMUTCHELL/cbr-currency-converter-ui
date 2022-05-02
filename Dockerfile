FROM node:alpine as build

WORKDIR /app

COPY . .
RUN npm install

RUN npm run build
RUN rm -rf node_modules
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx","-g","daemon off;"]