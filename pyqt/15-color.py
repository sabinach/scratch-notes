# From: https://www.pythonguis.com/tutorials/pyqt-layouts/

import sys
from PyQt5.QtWidgets import (
    QApplication, 
    QMainWindow, 
    QWidget
)
from PyQt5.QtGui import (
    QPalette, 
    QColor
)

class Color(QWidget):

    def __init__(self, color):
        super(Color, self).__init__()
        self.setAutoFillBackground(True)

        palette = self.palette()
        palette.setColor(QPalette.Window, QColor(color))
        self.setPalette(palette)

class MainWindow(QMainWindow):

    def __init__(self):
        super(MainWindow, self).__init__()

        self.setWindowTitle("My App")

        widget = Color('red')
        self.setCentralWidget(widget)

app = QApplication(sys.argv)

window = MainWindow()
window.show()

app.exec()
