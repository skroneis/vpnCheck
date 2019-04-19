# vpnCheck

## install as service with forever
sudo apt-get install rcconf
sudo npm install forever-service -g
sudo npm install forever -g

sudo forever-service install vpncheck --script index.js -p $(dirname "$(which forever)")
### configure startup...
sudo rcconf

### start / stop service
----------------
```shell
sudo service vpncheck start
sudo service vpncheck stop
```

### config-file
```js
module.exports={
    'filename': '/var/log/openvpn-status.log',
    'interval': 2000
};
```

### wiring-pi
use node-wiring-pi
