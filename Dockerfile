
FROM node as build

WORKDIR /app

COPY package.json .
COPY yarn.lock .

ENV VITE_apiKey="AIzaSyAIu1rIxJeT-x5z95xPmhspom_d07y1JZM"
ENV VITE_authDomain="instagram-4517c.firebaseapp.com"
ENV VITE_projectId="instagram-4517c"
ENV VITE_storageBucket="instagram-4517c.appspot.com"
ENV VITE_messagingSenderId="1068304099157"
ENV VITE_appId="1:1068304099157:web:78488efb595e6d438631dc"
ENV VITE_measurementId="G-PRS01YJ115"

RUN yarn install

COPY . .

RUN yarn build

FROM nginx

COPY --from=build /app/dist /usr/share/nginx/html