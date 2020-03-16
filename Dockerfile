FROM node:12.13.1-alpine AS base
WORKDIR /code
EXPOSE 4000


FROM base AS build
RUN apk add --no-cache bash \
  make \
  g++ \
  python
COPY package.json yarn.lock ./
RUN yarn install --production=false
COPY tsconfig.json  ./
COPY config/ ./config

COPY src/ ./src
RUN yarn compile

FROM build as clean
RUN yarn install --production
RUN rm -rf ./src

FROM base AS production
LABEL Name="ze-backend-challenge" Version="2.0"
ARG ENVIRONMENT="production"
ENV NODE_ENV=${ENVIRONMENT}
COPY --from=clean /code ./
COPY ormconfig.prod.js ./ormconfig.js
CMD ["yarn", "start"]
