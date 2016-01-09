# lxd-web-panel
A web panel for LXD

## Running the app for development

### Overview

* Run the API server in a Vagrant/VirtualBox virtual machine
* Run the client on your host machine (OSX)

### Starting the API server

Ensure you have Vagrant and VirtualBox installed.

On your development machine:

```
cd ./server
vagrant up
vagrant ssh
cd /vagrant/server
sudo npm start
```

The API server will be running at: http://192.168.50.4:9000

## Start the API client:

On your development machine:

```
cd ./client
npm start
```

Navigate to http://localhost:3000/bundle
