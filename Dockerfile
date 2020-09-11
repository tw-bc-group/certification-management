FROM node:10.18.0 as build-stage
WORKDIR /ng-app
COPY package.json yarn.lock patch.js /ng-app/
RUN yarn
COPY ./ /ng-app
RUN yarn build:prod

FROM nginx:1.15.5
COPY --from=build-stage deployment/nginx.conf /etc/nginx/nginx.conf
COPY --from=build-stage dist/cac-generator /usr/share/nginx/html
