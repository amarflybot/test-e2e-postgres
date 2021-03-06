FROM node:14.4-alpine As example

# install build dependencies
RUN apk update && apk upgrade
RUN apk add python3 g++ make

# install packages for sending mail (msmtp = sendmail for alpine)
RUN apk add msmtp
RUN ln -sf /usr/bin/msmtp /usr/sbin/sendmail

# make target directory for assigning permissions
RUN mkdir -p /usr/src/app/node_modules
RUN chown -R node:node /usr/src/app

# use target directory
WORKDIR /usr/src/app

# set user
USER node

# copy package*.json separately to prevent re-running npm install with every code change
COPY --chown=node:node package*.json ./
RUN npm install

# copy the project code (e.g. consider: --only=production)
COPY --chown=node:node . .

# expose port 3000
EXPOSE 3000
