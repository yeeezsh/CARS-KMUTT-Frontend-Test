FROM node:12

# cache dependencies
ADD yarn.lock /tmp/yarn.lock
ADD package.json /tmp/package.json
RUN cd /tmp && yarn install
RUN mkdir -p /src && cp -a /tmp/node_modules /src/

ADD . ./src
WORKDIR /src
CMD ["yarn", "start"]
EXPOSE 5000