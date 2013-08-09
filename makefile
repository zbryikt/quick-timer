all:
	jade index.jade
	sass index.sass index.css
	livescript -cb index.ls
