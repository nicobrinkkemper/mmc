FROM node:buster as build-deps

# got this from https://github.com/buildkite/docker-puppeteer/blob/master/Dockerfile, but node version was too old to use the whole Dockerfile
RUN  apt-get update \
     && apt-get install -y wget gnupg ca-certificates procps libxss1 \
     && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
     && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
     && apt-get update \
     && apt-get install -y google-chrome-stable \
     && rm -rf /var/lib/apt/lists/* \
     && wget --quiet https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh -O /usr/sbin/wait-for-it.sh \
     && chmod +x /usr/sbin/wait-for-it.sh

RUN mkdir -p /home/temp
WORKDIR /home/temp
COPY ./package-lock.json ./package.json ./

RUN npm ci
COPY ./ .
RUN npm run build

# Stage 2 - the production environment
FROM httpd:2.4
COPY --from=build-deps /home/temp/build /usr/local/apache2/htdocs