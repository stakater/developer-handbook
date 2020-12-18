FROM stakater/pipeline-tools:1.15.0

LABEL name="Stakater Developer Handbook" \    
      maintainer="Stakater <stakater@aurorasolutions.io>" \
      vendor="Stakater" \
      release="1" \
      summary="Developer Handbook" 

WORKDIR $HOME/application

# copy the entire application
COPY . .

# To handle 'not get uid/gid'
RUN npm config set unsafe-perm true

# install yarn globaly
RUN npm install -g yarn

# download the application dependencies
RUN yarn install

# build the application
RUN yarn run build

ENTRYPOINT ["yarn", "run", "serve"]
