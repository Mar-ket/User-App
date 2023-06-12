FROM node AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# RUN npm test - if you want to test before to build
RUN npm run build

FROM nginx:alpine AS prod
WORKDIR /usr/share/nginx/html
COPY --from=build /app/build .

ENV REACT_APP_KONGURI='mar_ket.deti:8081'
ENV REACT_APP_AUTHAPI='mar_ket.deti:4999'
ENV REACT_APP_ADSURI='mar_ket.deti:8082'


EXPOSE 80
# run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]
