VERSION   = v0.6.13
DIST     ?= development

SERIALNO ?= 405419896
CARD     ?= 65538
DOOR     ?= 3
DEVICEIP ?= 192.168.1.125
DATETIME  = $(shell date "+%Y-%m-%d %H:%M:%S")
LISTEN   ?= 192.168.1.100:60001
DEBUG    ?= --debug

.PHONY: build
.PHONY: test

build:
	npx eslint --fix *.js  
	npx eslint --fix src/*.js  
	npx eslint --fix examples/*.js  

run: build
	node example.js

test: build
	npx eslint --fix test/*.js  
	npm test

release:
	npm pack

get-devices: build
	node examples/get-devices.js

get-device: build
	node examples/get-device.js

set-ip: build
	node examples/set-ip.js

get-listener: build
	node examples/get-listener.js

set-listener: build
	node examples/set-listener.js

get-time: build
	node examples/get-time.js

set-time: build
	node examples/set-time.js

get-door-control: build
	node examples/get-door-control.js

set-door-control: build
	node examples/set-door-control.js

get-status: build
	node examples/get-status.js

get-cards: build
	node examples/get-cards.js

get-card: build
	node examples/get-card.js

get-card-by-index: build
	node examples/get-card-by-index.js

delete-card: build
	node examples/delete-card.js

delete-cards: build
	node examples/delete-cards.js

put-card: build
	node examples/put-card.js

open-door: build
	node examples/open-door.js

listen: build
	node examples/listen.js
