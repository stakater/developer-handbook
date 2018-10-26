FROM stakater/pipeline-tools:1.15.0

LABEL name="Stakater Developer Handbook" \    
      maintainer="Stakater <stakater@aurorasolutions.io>" \
      vendor="Stakater" \
      release="1" \
      summary="Developer Handbook" 

WORKDIR $HOME/application

RUN npm install -g yarn

COPY application/ .

RUN yarn

CMD ["yarn", "run", "dev"]
