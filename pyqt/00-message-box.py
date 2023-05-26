# From: https://www.python-me.org/a-brief-introduction-to-pyqt

import sys
from PyQt5.QtWidgets import (QWidget, QToolTip, QDesktopWidget, QMessageBox,QTextEdit,QLabel,
    QPushButton, QApplication,QMainWindow, QAction, qApp, QHBoxLayout, QVBoxLayout,QGridLayout,
    QLineEdit)
from PyQt5.QtGui import QFont,QIcon
from PyQt5.QtCore import QCoreApplication


## Message Box
class MessageBox(QWidget):
 
    def __init__(self):
        super(). __init__()
        self.initUI()
 
    def initUI(self):
        qbtn = QPushButton('Quit', self) # A button is created. A button is an instance of the QPushButton class.
        # The first argument to the constructor is the text of the label displayed on the button. The second argument is the parent component.
        # The parent component is the Example component, which inherits from the QWiget class.
        qbtn.clicked.connect(QCoreApplication.instance().quit)
        qbtn.resize(qbtn.sizeHint())
        qbtn.move(50, 50)
        self.setGeometry(300, 100, 200, 100)
        self.setWindowTitle('excise')
        self.show()
 
    def closeEvent(self, event):
 
        reply = QMessageBox.question(self, 'Message',
                                     "Are you sure to quit?", QMessageBox.Yes |
                                     QMessageBox.No, QMessageBox.No)
        if reply == QMessageBox.Yes:
            event.accept()
        else:
            event.ignore()
 

if __name__ == '__main__':
   app = QApplication(sys.argv)
   ex = MessageBox()
   sys.exit(app.exec_())
