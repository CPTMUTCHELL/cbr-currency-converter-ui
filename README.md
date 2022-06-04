# cbr-currency-converter-ui

This is frontend for [cbr-currency converter](https://github.com/CPTMUTCHELL/cbr-currency-converter)

It has following options to start:
## local
[Locally](#local)
Execute `npm i && npm start` to start react in dev mode. Proxy to backend is configured [here](https://github.com/CPTMUTCHELL/cbr-currency-converter-ui/blob/master/src/setupProxy.js)

## compose
[**Docker**](#compose)
Execute `docker-compose up --build` to start react in prod mode (static). Proxy to backend is configured [here](https://github.com/CPTMUTCHELL/cbr-currency-converter-ui/blob/master/nginx-compose.conf)

**Important:**
Don't forget to run backend compose first, because this compose requires the [network](https://github.com/CPTMUTCHELL/cbr-currency-converter/blob/k8s/docker-compose.yaml#L133)
## local k8s
[**Local-k8s**](#local-k8s)
`cd k8s/helm` and install release: `helm upgrade --install -n cbr cbr-ui ./cbr-ui`

You can set your own external ip and dns in cm.

**Important:**
Don't forget to create [ingress rule](https://github.com/CPTMUTCHELL/cbr-currency-converter/blob/k8s/k8s/helm/cbr-converter-chart/templates/ing.yml#L34). 



