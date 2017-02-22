# vpnCheck


sudo npm install forever -g

sudo forever-service install vpncheck --script index.js -p $(dirname "$(which forever)")
## check:
sudo rcconf
