FEATURE=CI

build:
	rm -rf ./node_modules
	npm ci

test:
	node ci-runner.js



.PHONY: test