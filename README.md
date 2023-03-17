# cbr-currency-converter-ui

This is frontend for [cbr-currency converter](https://github.com/CPTMUTCHELL/cbr-currency-converter/tree/k8s) Ui is responsive

It has the following options to start:
## local
[Locally](#local)
Execute `yarn install && yarn start` to start react in dev mode. Proxy to backend is configured [here](https://github.com/CPTMUTCHELL/cbr-currency-converter-ui/blob/master/webpack.config.js)

## compose
[**Docker**](#compose)
Execute `docker-compose up --build` to start react in prod mode (static). Proxy to backend is configured [here](https://github.com/CPTMUTCHELL/cbr-currency-converter-ui/blob/master/nginx-compose.conf)

**Important:**
Don't forget to run backend compose first, because this compose requires the [network](https://github.com/CPTMUTCHELL/cbr-currency-converter/blob/k8s/docker-compose.yaml#L133)

Frontend will be available at localhost:3000

