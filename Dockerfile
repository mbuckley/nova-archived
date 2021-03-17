# base image. This is where we retrieve the base image from.
# more on this base image and others can be found here: https://github.com/clio/container-build#nodejs-nodejs-10
FROM clio-peng-docker-dev-local.jfrog.io/nodejs-10:latest

# These ARGs are used to authenticate requests to Artifactory which hosts our binary repositories
ARG ARTIFACTORY_API_KEY
ARG ARTIFACTORY_USERNAME
ARG ARTIFACTORY_NPM_TOKEN

ENV ARTIFACTORY_NPM_TOKEN "${ARTIFACTORY_NPM_TOKEN}"
ENV ARTIFACTORY_USERNAME "${ARTIFACTORY_USERNAME}"
ENV ARTIFACTORY_API_KEY "${ARTIFACTORY_API_KEY}"

# Install extra deps needed for this project
# - git (used for CI checks)
# - chrome headless (puppeteer)
# TODO: Build this back into a base image
RUN /usr/local/bin/clean_apt_get.sh \
  git \
  libasound2 \
  libatk1.0-0 \
  libc6 \
  libcairo2 \
  libcups2 \
  libdbus-1-3 \
  libexpat1 \
  libfontconfig1 \
  libgcc1 \
  libgconf-2-4 \
  libgdk-pixbuf2.0-0 \
  libglib2.0-0 \
  libgtk-3-0 libnspr4 \
  libpango-1.0-0 \
  libpangocairo-1.0-0 \
  libstdc++6 \
  libx11-6 \
  libx11-xcb1 \
  libxcb1 \
  libxcursor1 \
  libxdamage1 \
  libxext6 \
  libxfixes3 \
  libxi6 \
  libxrandr2 \
  libxrender1 \
  libxss1 \
  libxtst6 \
  libnss3

# App directory
ENV APP_HOME /nova
WORKDIR $APP_HOME

# Install dependencies

## Copy package.json and npmrc files

### root
COPY package.json $APP_HOME/package.json
COPY package-lock.json $APP_HOME/package-lock.json
COPY .npmrc $APP_HOME/.npmrc

### core
COPY packages/core/package.json $APP_HOME/packages/core/package.json
COPY packages/core/package-lock.json $APP_HOME/packages/core/package-lock.json
COPY packages/core/.npmrc $APP_HOME/packages/core/.npmrc

### core-react
COPY packages/core-react/package.json $APP_HOME/packages/core-react/package.json
COPY packages/core-react/package-lock.json $APP_HOME/packages/core-react/package-lock.json
COPY packages/core-react/.npmrc $APP_HOME/packages/core-react/.npmrc

### docs
COPY packages/docs/package.json $APP_HOME/packages/docs/package.json
COPY packages/docs/package-lock.json $APP_HOME/packages/docs/package-lock.json
COPY packages/docs/.npmrc $APP_HOME/packages/docs/.npmrc

## Copy lerna.json
COPY lerna.json $APP_HOME/lerna.json

## Install for root package.json
RUN npm ci

## Install deps for packages/**
RUN npx lerna bootstrap --ci

# Copy code
COPY . $APP_HOME

CMD ["npm", "run", "start"]
