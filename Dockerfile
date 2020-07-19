FROM node:12 as dev
# cache dependencies
ADD yarn.lock /tmp/yarn.lock
ADD package.json /tmp/package.json
RUN cd /tmp && yarn install
RUN mkdir -p /src && cp -a /tmp/node_modules /src/
ADD . ./src
WORKDIR /src
CMD ["yarn", "start"]
EXPOSE 5000

FROM node:12 as uat
ADD yarn.lock /tmp/yarn.lock
ADD package.json /tmp/package.json
RUN cd /tmp && yarn install
RUN mkdir -p /src && cp -a /tmp/node_modules /src/
ADD . ./src
WORKDIR /src
RUN yarn build
ARG REACT_APP_BACKEND_ENDPOINT
ENV REACT_APP_BACKEND_ENDPOINT $REACT_APP_BACKEND_ENDPOINT
WORKDIR /src/server
CMD ["node", "--max-old-space-size=2048", "app.js"]
EXPOSE 5000