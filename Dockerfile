FROM stakater/pipeline-tools:v1.16.2

LABEL name="Stakater Developer Handbook" \    
      maintainer="Stakater <stakater@aurorasolutions.io>" \
      vendor="Stakater" \
      release="1" \
      summary="Developer Handbook" 

WORKDIR $HOME/application

RUN npm install -g yarn

ADD . ./

RUN yarn

CMD ["yarn", "run", "dev"]
