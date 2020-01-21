FROM node:12

# cache dependencies
ADD package-lock.json /tmp/yarn.json
ADD package.json /tmp/package.json
RUN cd /tmp && yarn install --production=false --no-lockfile
RUN mkdir -p /src && cp -a /tmp/node_modules /src/

ADD . ./src
WORKDIR /src
CMD ["yarn", "start"]
EXPOSE 5000