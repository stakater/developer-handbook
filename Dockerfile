FROM stakater/pipeline-tools:v1.16.2

LABEL name="Stakater Developer Handbook" \    
      maintainer="Stakater <stakater@aurorasolutions.io>" \
      vendor="Stakater" \
      release="1" \
      summary="Developer Handbook" 

WORKDIR $HOME/application

ARG USER=1001

RUN npm install -g yarn

ADD [--chown=$USER:root] . ./

# Change the group to root group
RUN chgrp -R 0 /$HOME && \
    chmod -R g=u /$HOME

# Change back to USER
USER $USER

RUN yarn

CMD yarn run dev




