FROM registry.access.redhat.com/ubi8/nodejs-12

LABEL name="Stakater Developer Handbook" \    
      maintainer="Stakater <hello@stakater.com>" \
      vendor="Stakater" \
      release="1" \
      summary="Developer Handbook" 

# set workdir
RUN mkdir -p $HOME/application
WORKDIR $HOME/application

# copy the entire application
COPY --chown=default:root . .

# install yarn globaly
RUN npm install -g yarn

# download the application dependencies
RUN yarn install

# build the application
RUN yarn run build

# Change permissions
RUN chmod -R 755 $HOME

# set non-root user
USER 1001

ENTRYPOINT ["yarn", "run", "serve"]
