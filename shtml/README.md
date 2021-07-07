# test-shtml

### Ways to run a local server

#### Python
- Make sure you are in the root folder with ```index.html```
- ```python3 -m http.server```

#### Apache

##### To Run:
- ```sudo apachectl start```
- ```http://127.0.0.1/```
- ```sudo apachectl stop```

##### To Edit Config:
- ```cat /etc/apache2/httpd.conf```
- ```sudo apachectl restart``` (after you make changes to config file)

##### To Edit Document (original):
- ```cat /Library/WebServer/Documents/index.html.en```