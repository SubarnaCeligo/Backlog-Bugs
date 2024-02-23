ENV=qa
FEATURE=signinPage

build:
	rm -rf ./node_modules
	npm ci

test:
	ENV=$(ENV) \
	FEATURE=$(FEATURE) \
	npm run test:ci



.PHONY: test