import csv

# INPUTS
creature_input_file = '../CSVs/Creature_Biome_Type_Location.csv'
location_input_file = '../CSVs/Location.csv'
# OUTPUTS
creature_biome_file = '../CSVs/Creature_Biome.csv'
creature_location_file = '../CSVs/Creature_Location.csv'
creature_type_file = '../CSVs/Creature_Type.csv'
location_biome_file = '../CSVs/Location_Biome.csv'


# CONSTANTS
Id = 0
Name = 1
Size = 2
Type = 3
Alignment = 4
Cr = 5
Source = 6
Biomes = 7
Locations = 8
Exclusive = 9

class SeparateOutData:
    @staticmethod
    def _creature_biome(inF, outF):
        with open(inF, newline='') as csvfile:
            reader = csv.reader(csvfile)
            wriecsv = open(outF, 'w', newline='')
            writer = csv.writer(wriecsv)
            for row in reader:
                biomes = row[Biomes].split(', ')
                creature = row[Name]
                myid = row[Id]
                for biome in biomes:
                    if len(biome):
                        writer.writerow([myid, creature, biome])

    @staticmethod
    def _creature_location(inF, outF):
        with open(inF, newline='') as csvfile:
            reader = csv.reader(csvfile)
            wriecsv = open(outF, 'w', newline='')
            writer = csv.writer(wriecsv)
            for row in reader:
                locations = row[Locations].split(', ')
                exclusives = row[Exclusive].split(', ')
                creature = row[Name]
                myid = row[Id]
                for index, location in enumerate(locations):
                    if len(location):
                        try:
                            writer.writerow([myid, creature, location, exclusives[index]])
                        except:
                            print(creature + ',' + location)

    @staticmethod
    def _creature_type(inF, outF):
        with open(inF, newline='') as csvfile:
            reader = csv.reader(csvfile)
            wriecsv = open(outF, 'w', newline='')
            writer = csv.writer(wriecsv)
            for row in reader:
                types = row[Type].split(', ')
                creature = row[Name]
                myid = row[Id]
                for type in types:
                    writer.writerow([myid, creature, type])

    @staticmethod
    def _location_biome(inF, outF):
        Id = 0
        Name = 1
        Biomes = 2
        with open(inF, newline='') as csvfile:
            reader = csv.reader(csvfile)
            wriecsv = open(outF, 'w', newline='')
            writer = csv.writer(wriecsv)
            for row in reader:
                biomes = row[Biomes].split(', ')
                location = row[Name]
                myid = row[Id]
                for biome in biomes:
                    writer.writerow([myid, location, biome])


    def separate_out_data(self):
        self._creature_biome(creature_input_file, creature_biome_file)
        self._creature_location(creature_input_file, creature_location_file)
        self._creature_type(creature_input_file, creature_type_file)
        self._location_biome(location_input_file, location_biome_file)

#sep = SeparateOutData()
#sep.separate_out_data();