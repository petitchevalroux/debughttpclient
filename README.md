# Node Http Server for debugging HTTP client
Http server responding 200 to all request and dumping request data

## Install
```
npm i -g @petitchevalroux/debug-http-client
```
## Usage
```
debug-http-client --help
start the http server

Options:
  --version           Affiche le numéro de version                     [booléen]
  --port, -p          Port to bind on                      [nombre] [défaut: 80]
  --ip, -i            Ip to bind on    [chaine de caractère] [défaut: "0.0.0.0"]
  --cache-max-age     <seconds> Specifies the maximum amount of time a resource
                      will be considered fresh. Contrary to Expires, this
                      directive is relative to the time of the request.
                                                            [nombre] [défaut: 0]
  --response-timeout  <milliseconds> Specifies the maximum amount of time before
                      sending the response               [nombre] [défaut: 1000]
  -h, --help          Affiche de l'aide                                [booléen]
  ```