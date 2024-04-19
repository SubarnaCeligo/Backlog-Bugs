ENV=qa
FEATURE=CI

build:
	rm -rf ./node_modules
	npm ci

test:
	ENV=$(ENV) \
	FEATURE=$(FEATURE) \
	AWS_ACCESS_KEY=$(AWS_ACCESS_KEY) \
	AWS_SECRET_KEY=$(AWS_SECRET_KEY) \
	npm run test:ci



.PHONY: test