import gspread
import csv

#CONSTANTS
biome_data_file = "../CSVs/Biome.csv"
location_data_file = '../CSVs/Location.csv'
creature_data_file = '../CSVs/Creature_Biome_Type_Location.csv'
type_data_file = '../CSVs/Type.csv'

gc = gspread.service_account(filename='credentials.json')
sh = gc.open_by_key('101Zk85gI4ZtHoPc04joAsFriB5vG7OM7-Y4M3bElfT4')

class ExportData:
    @staticmethod
    def _pull_biome_data(outF):
        biome_sheet = sh.get_worksheet(0)
        data = biome_sheet.get_all_records()
        wriecsv = open(outF, 'w', newline='')
        writer = csv.writer(wriecsv)

        writer.writerow(['ID', 'Name'])
        for row in data:
            writer.writerow([row['ID'], row['Name']])
    @staticmethod
    def _pull_location_data(outF):
        location_sheet = sh.get_worksheet(1)
        data = location_sheet.get_all_records()
        wriecsv = open(outF, 'w', newline='')
        writer = csv.writer(wriecsv)

        writer.writerow(['ID', 'Name', 'Biome'])
        for row in data:
            writer.writerow([row['ID'], row['Name'], row['Biome']])

    @staticmethod
    def _pull_creature_data(outF):
        creature_sheet = sh.get_worksheet(2)
        data = creature_sheet.get_all_records()
        wriecsv = open(outF, 'w', newline='')
        writer = csv.writer(wriecsv)

        writer.writerow(['ID', 'Name', 'Size', 'Type', 'Alignment', 'CR', 'Source', 'Biome', 'Location', 'Exclusive'])
        for row in data:
            writer.writerow([row['ID'], row['Name'], row['Size'], row['Type'], row['Alignment'], row['CR'], row['Source'], row['Biome'], row['Location'], row['Exclusive']])

    @staticmethod
    def _pull_type_data(outF):
        type_sheet = sh.get_worksheet(3)
        data = type_sheet.get_all_records()
        wriecsv = open(outF, 'w', newline='')
        writer = csv.writer(wriecsv)

        writer.writerow(['ID', 'Name'])
        for row in data:
            writer.writerow([row['ID'], row['Name']])

    def export_all_data(self):
        self._pull_biome_data(biome_data_file)
        self._pull_location_data(location_data_file)
        self._pull_creature_data(creature_data_file)
        self._pull_type_data(type_data_file)