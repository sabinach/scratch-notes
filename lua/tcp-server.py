import socket

# define the test message types
MESSAGE1 = "0101" # "Is the service up?"
MESSAGE2 = "0102" # "Other question?"
MESSAGE3 = "0201" # "Yes, the service is up"
MESSAGE4 = "0202" # "No, the service is down"

s = socket.socket()
print("Socket has successfully created")
port = 12345
s.bind(('', port))
print("socket has binded to %s" % (port))
s.listen(5)
print("socket is listening")

while True:
    c, addr = s.accept()
    print('Got connection from', addr)
    #data = c.recv(1024)
    c.send(bytes.fromhex(MESSAGE4))
    c.close()