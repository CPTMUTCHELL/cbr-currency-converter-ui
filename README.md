# cbr-currency-converter-ui

This is frontend for [cbr-currency converter](https://github.com/CPTMUTCHELL/cbr-currency-converter/tree/k8s)

It has following options to start:
## local
[Locally](#local)
Execute `npm i && npm start` to start react in dev mode. Proxy to backend is configured [here](https://github.com/CPTMUTCHELL/cbr-currency-converter-ui/blob/master/src/setupProxy.js)

## compose
[**Docker**](#compose)
Execute `docker-compose up --build` to start react in prod mode (static). Proxy to backend is configured [here](https://github.com/CPTMUTCHELL/cbr-currency-converter-ui/blob/master/nginx-compose.conf)

**Important:**
Don't forget to run backend compose first, because this compose requires the [network](https://github.com/CPTMUTCHELL/cbr-currency-converter/blob/k8s/docker-compose.yaml#L133)

Frontend will be available at localhost:3000
## local k8s
[**Local-k8s**](#local-k8s)
`cd k8s/helm` and install release: `helm upgrade --install -n cbr cbr-ui ./cbr-ui`

You can set your own external ip and dns in cm.

**Important:**
Don't forget to create [ingress rule](https://github.com/CPTMUTCHELL/cbr-currency-converter/blob/k8s/k8s/helm/cbr-converter-chart/templates/ing.yml#L34). 

## Cloud provider

I recommend to use a different [subdomain](https://github.com/CPTMUTCHELL/cbr-currency-converter/blob/k8s/k8s/helm/cbr-converter-chart/templates/ing.yml#L42) to avoid any traefik misunderstanding. 

In [CM](https://github.com/CPTMUTCHELL/cbr-currency-converter-ui/blob/master/k8s/helm/cbr-ui/templates/cbr-ui-cm.yml#L7) specify your own backend ip ( traefik ip ) and backend domain name

I created Dockerfile.cache to cache node_modules in jenkins WORKSPACE, but you can install node_nodules with each push. Check Jenkinsfile.

## P.S

I plan to:
- [ ] make css responsive for modible devices
- [ ] refactore code :)
