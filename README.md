M2X-ADT7410 for node.js
-----

## Using forever

```
$ sudo forever start temperature/main.js
```

## Thanks

- [Raspberry PiによるIoT（M2M）【I2C温度センサー/xively/JavaScript（Node.js）】 - Aldebaranな人のブログ](http://yamaryu0508.hatenablog.com/entry/2014/12/05/080000)

## Development Memo

### Send program to RasPi

    $ scp main.js pi@192.168.1.101:~/temperature/
