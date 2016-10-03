#!/bin/bash

sudo apt-get update
sudo apt-get install -y nginx
sudo apt-get install -y nodejs
sudo ln -s /usr/bin/nodejs /usr/bin/node
sudo apt-get install -y npm
cd /home/vagrant/2016-aug-demo/
sudo rm -rf node_modules/
sudo npm install



