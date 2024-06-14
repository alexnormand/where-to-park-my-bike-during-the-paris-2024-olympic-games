.PHONY: clean build

clean:
	rm -fr build

build: clean
	mkdir build
	cp -r js build/js
	cp index.html build/index.html
