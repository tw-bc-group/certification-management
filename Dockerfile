FROM node:10.18.0 as build-stage
WORKDIR /ng-app
COPY package.json yarn.lock patch.js /ng-app/
RUN yarn
COPY ./ /ng-app
RUN yarn build:prod
COPY deployment/nginx.conf /etc/nginx/nginx.conf

FROM nginx:1.15.5
COPY --from=build-stage /ng-app/dist/cac-generator /usr/share/nginx/html/admin
COPY --from=build-stage /etc/nginx/nginx.conf /etc/nginx/nginx.conf
EXPOSE 4000
