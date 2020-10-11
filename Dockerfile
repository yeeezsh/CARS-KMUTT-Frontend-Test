FROM node:14-slim as base
COPY yarn.lock yarn.lock
COPY package.json package.json
RUN yarn install

FROM base as dev
ADD . .
CMD ["yarn", "start"]
ENV REACT_APP_BACKEND_ENDPOINT $REACT_APP_BACKEND_ENDPOINT
EXPOSE 5000

FROM base as uat
ADD . .
RUN yarn build
ENV REACT_APP_BACKEND_ENDPOINT $REACT_APP_BACKEND_ENDPOINT

FROM nginx:alpine as nginx
COPY --from=uat dist/ /var/www
COPY /server/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
ENTRYPOINT ["nginx","-g","daemon off;"]