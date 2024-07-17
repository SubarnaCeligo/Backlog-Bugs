FEATURE=CI

build:
	rm -rf ./node_modules
	npm ci

test:
	node ci-runner.js
tag-validator:
	node tag-validator.js


.PHONY: test