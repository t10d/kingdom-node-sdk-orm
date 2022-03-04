style: check-style check-types
	@echo "🎉 style passed!"

test: style
	yarn test
	@echo "🎉 test passed!"

build: test clean
	yarn build
	yarn tsc
	@echo "📦 build complete."

publish: build
	yarn login
	yarn publish --access public
	@echo "🎯 publish complete."

check-types:
	yarn check-types
	@echo "✅ type checking done."

check-style:
	yarn eslint . --ext .ts,.js,.json --fix
	@echo "✅ style checking done."

clean:
	rm -rf dist
	@echo "♲ clean done."
