FROM node:latest

WORKDIR /usr/src/macpaw


COPY . .

RUN npm install
# production builds
#RUN npm run build
#RUN npm install -g serve

# Uses port which is used by the actual application
EXPOSE 5000

CMD ["npm ","start"]
