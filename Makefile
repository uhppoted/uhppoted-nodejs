VERSION   = v0.6.x
DIST     ?= development

SERIALNO ?= 405419896
CARD     ?= 65538
DOOR     ?= 3
DEVICEIP ?= 192.168.1.125
DATETIME  = $(shell date "+%Y-%m-%d %H:%M:%S")

BIND      ?= 192.168.1.100
BROADCAST ?= 192.168.1.255:60000
LISTEN    ?= 192.168.1.100:60001
TIMEOUT   ?= 1000
DEBUG     ?= true
ARGS       = bind=$(BIND) broadcast=$(BROADCAST) listen=$(LISTEN) timeout=$(TIMEOUT) debug=$(DEBUG)

.PHONY: build
.PHONY: test

build:
	npx eslint --fix *.js  
	npx eslint --fix src/**/*.js  
	npx eslint --fix examples/**/*.js  

run: build
	node example.js

debug: build
	node examples/get-device-with-device-specific-configuration.js $(ARGS)

test: build
	npx eslint --fix test/*.js  
	npm test

release:
	npm pack

error-handling: build
	node examples/error-handling.js $(ARGS)

get-devices: build
	node examples/get-devices.js $(ARGS)

get-device: build
	node examples/get-device.js $(ARGS)

get-device-with-custom-logger: build
	node examples/get-device-with-custom-logger.js $(ARGS)

get-device-with-device-specific-configuration: build
	node examples/get-device-with-device-specific-configuration.js $(ARGS)

set-ip: build
	node examples/set-ip.js $(ARGS)

get-listener: build
	node examples/get-listener.js $(ARGS)

set-listener: build
	node examples/set-listener.js $(ARGS)

get-time: build
	node examples/get-time.js $(ARGS)

set-time: build
	node examples/set-time.js $(ARGS)

get-door-control: build
	node examples/get-door-control.js $(ARGS)

set-door-control: build
	node examples/set-door-control.js $(ARGS)

get-status: build
	node examples/get-status.js $(ARGS)

get-cards: build
	node examples/get-cards.js $(ARGS)

get-card: build
	node examples/get-card.js $(ARGS)

get-card-by-index: build
	node examples/get-card-by-index.js $(ARGS)

put-card: build
	node examples/put-card.js $(ARGS)

delete-card: build
	node examples/delete-card.js $(ARGS)

delete-cards: build
	node examples/delete-cards.js $(ARGS)

open-door: build
	node examples/open-door.js $(ARGS)

record-special-events: build
	node examples/record-special-events.js $(ARGS)

get-event-index: build
	node examples/get-event-index.js $(ARGS)

set-event-index: build
	node examples/set-event-index.js $(ARGS)

get-events: build
	node examples/get-events.js $(ARGS)

get-event: build
	node examples/get-event.js $(ARGS)

get-event-with-locale: build
	node examples/get-event-with-locale.js $(ARGS)

get-event-with-unsupported-locale: build
	node examples/get-event-with-unsupported-locale.js $(ARGS)

listen: build
	node examples/listen.js $(ARGS)

run-all: build
	@node examples/get-devices.js $(ARGS)
	@node examples/get-device.js $(ARGS)
	@node examples/get-device-with-device-specific-configuration.js $(ARGS)
	@node examples/get-device-with-custom-logger.js $(ARGS)
	@node examples/set-ip.js $(ARGS)
	@node examples/get-listener.js $(ARGS)
	@node examples/set-listener.js $(ARGS)
	@node examples/get-time.js $(ARGS)
	@node examples/set-time.js $(ARGS)
	@node examples/get-door-control.js $(ARGS)
	@node examples/set-door-control.js $(ARGS)
	@node examples/get-status.js $(ARGS)
	@node examples/get-cards.js $(ARGS)
	@node examples/get-card.js $(ARGS)
	@node examples/get-card-by-index.js $(ARGS)
	@node examples/put-card.js $(ARGS)
	@node examples/delete-card.js $(ARGS)
	@node examples/delete-cards.js $(ARGS)
	@node examples/open-door.js $(ARGS)
	@node examples/record-special-events.js $(ARGS)
	@node examples/get-event-index.js $(ARGS)
	@node examples/set-event-index.js $(ARGS)
	@node examples/get-events.js $(ARGS)
	@node examples/get-event.js $(ARGS)
	@node examples/get-event-with-locale.js $(ARGS)
	@node examples/get-event-with-unsupported-locale.js $(ARGS)


