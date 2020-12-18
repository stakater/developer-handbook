FROM registry.access.redhat.com/ubi8/nodejs-12
USER root
WORKDIR $HOME/application

# copy the entire application
COPY . .

# install yarn globaly
RUN npm install -g yarn

# download the application dependencies
RUN yarn install

# little fix
RUN npx browserslist --update-db

# build the application
RUN yarn run build

RUN chmod -R 755 $HOME/application

USER 1001

ENTRYPOINT ["yarn", "run", "serve"]