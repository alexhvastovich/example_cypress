FROM cypress/base:14

COPY . .

RUN npm install
RUN npm run build:and:test