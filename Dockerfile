FROM node:16.15.0-alpine as build
WORKDIR /app
COPY . .
RUN yarn install && yarn run build && rm -rf node_modules

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
RUN apk add bind-tools
RUN mkdir /etc/nginx/templates/
COPY nginx-k8s.conf.template /etc/nginx/templates/default.conf.template
EXPOSE 80
#Required for creating default.conf in conf.d folder outta .template
# The final command docker-entrypoint.sh nginx -g daemon off;
# https://github.com/nginxinc/docker-nginx/blob/master/stable/alpine/docker-entrypoint.sh#L12
# https://github.com/nginxinc/docker-nginx/issues/422#issuecomment-644299743
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx","-g","daemon off;"]