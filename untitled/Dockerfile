FROM node AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

ENV REACT_APP_KONGURI='marketplace.deti/proxy'
ENV REACT_APP_AUTHAPI='marketplace.auth.deti'
ENV REACT_APP_ADSURI='marketplace.deti/proxy'

# RUN npm test - if you want to test before to build
RUN npm run build

FROM nginx:alpine AS prod
WORKDIR /usr/share/nginx/html
COPY --from=build /app/build .

ENV REACT_APP_KONGURI='marketplace.deti/proxy'
ENV REACT_APP_AUTHAPI='marketplace.auth.deti'
ENV REACT_APP_ADSURI='marketplace.deti/proxy'

EXPOSE 80
# run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]
