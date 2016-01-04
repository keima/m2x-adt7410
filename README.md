M2X-ADT7410 for node.js
-----

## Using forever

    $ sudo forever start main.js

## Thanks

- [Raspberry PiによるIoT（M2M）【I2C温度センサー/xively/JavaScript（Node.js）】 - Aldebaranな人のブログ](http://yamaryu0508.hatenablog.com/entry/2014/12/05/080000)

## Development Memo

### Send program to RasPi

    $ scp main.js pi@192.168.1.101:~/temperature/

### Gather InfraRed data

One shot:

    $ mode2 -m -d /dev/lirc0 > OUTPUT

Repeat:

    $ sudo irrecord -n -d /dev/lirc0 OUTPUT

Format example:

https://gist.github.com/keima/f153dc46d56a5aa7ca51

### Running debug mode

    $ NODE_DEBUG=true node main.js


