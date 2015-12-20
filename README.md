# lxd-web-panel
A web panel for LXD

## Starting the API server

Ensure you have Vagrant installed.

On your development machine:

```
cd ./server
vagrant up
vagrant ssh
cd /vagrant
sudo npm start
```

Navigate to http://192.168.50.4:9000

## Start the API client:

On your development machine:

```
cd ./client
npm start
```

Navigate to http://localhost:3000

## TODO

Codegen swagger models
