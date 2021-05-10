VERSION   = v0.6.12
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

run: build
	node example.js

test: build
	npx eslint --fix test/*.js  
	npm test

release:
	npm pack
