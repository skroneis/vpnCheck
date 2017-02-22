# vpnCheck

## install as service with forever
sudo npm install forever -g

sudo forever-service install vpncheck --script index.js -p $(dirname "$(which forever)")
### configure startup...
sudo rcconf
