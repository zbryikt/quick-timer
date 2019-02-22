all:
	pug index.pug
	stylus -p index.styl > index.css
	lsc -cb index.ls
