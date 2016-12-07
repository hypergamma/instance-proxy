FROM node:7.2

RUN mkdir /code
WORKDIR /code
ADD node-app/ /code/

ENV PORT 3030
EXPOSE 3030 3000

CMD ["node", "/code/app.js"]
