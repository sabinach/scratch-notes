import gspread
from oauth2client.service_account import ServiceAccountCredentials
from pprint import pprint 

scope = ["https://spreadsheets.google.com/feeds","https://www.googleapis.com/auth/spreadsheets","https://www.googleapis.com/auth/drive.file","https://www.googleapis.com/auth/drive"]

# console.developer.google.com credentials - remember to share sheets with credential email
creds = ServiceAccountCredentials.from_json_keyfile_name("creds.json", scope)
client = gspread.authorize(creds)

# name of sheet to open
member_sheet = client.open("member").sheet1
master_sheet = client.open("master").sheet1

# get sheet data
#member_data = member_sheet.get_all_records()
#master_data = master_sheet.get_all_records()

# get first/last names
firstname = member_sheet.col_values(2)
lastname = member_sheet.col_values(3)
email = member_sheet.col_values(4)
fullname = [' '.join(name) for name in zip(firstname, lastname)][1:]
pprint(fullname)

name_dict = {}
index = len(master_sheet.get_all_values())

# insert member names
#print(len(master_sheet.get_all_values())) # number of rows with data
for name in fullname:
	index += 1
	member_dict[name] = index
	master_sheet.insert_row([name], index)
#master_sheet.insert_row(full_name[0], index)

# get row / col / cell
#row = master_sheet.row_values(3)
#col = master_sheet.col_values(3)
#cell = master_sheet.cell(1, 2).value
#pprint(cell)

# insert row
#insertRow = ["hello", 5, "red", "blue"]
#master_sheet.insert_row(row, 4)

# delete row
#sheet.delete_row(4)

# update cell
#master_sheet.update_cell(2, 2, "HELLOWORLD")

# get row/cell number
#num_rows = master_sheet.row_count
#pprint(num_rows) # rows of ENTIRE sheet
#pprint(len(data)) # rows of data