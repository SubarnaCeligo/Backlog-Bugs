FEATURE=CI

build:
	rm -rf ./node_modules
	npm ci

test:
	node ci-runner.js
tag-validator:
	node tag-validator.js	
	
update-testcase-zephyr:
	ENV=QA FEATURE=ZEPHYR node update-testcase-zephyr.js


.PHONY: test