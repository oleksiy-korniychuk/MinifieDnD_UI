import csv

# INPUTS
inputfile = 'Creatures_Biome_Types_Locations.csv'
creature_biome_file = 'Creatures_Biome.csv'
creature_location_file = 'Creature_Location.csv'


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

def creature_biome(inF, outF):
    with open(inF, newline='') as csvfile:
        reader = csv.reader(csvfile)
        wriecsv = open(outF, 'w', newline='')
        writer = csv.writer(wriecsv)
        i = 0
        for row in reader:
            # if i == 10:
            #     break
            # else:
                biomes = row[Biomes].split(', ')
                creature = row[Name]
                myid = row[Id]
                for biome in biomes:
                    print(creature + ',' + biome)
                    writer.writerow([myid, creature, biome])
                i+=1

def creature_location(inF, outF):
    with open(inF, newline='') as csvfile:
        reader = csv.reader(csvfile)
        wriecsv = open(outF, 'w', newline='')
        writer = csv.writer(wriecsv)
        i = 0
        for row in reader:
            # if i == 10:
            #     break
            # else:
                locations = row[Locations].split(', ')
                creature = row[Name]
                myid = row[Id]
                for location in locations:
                    print(creature + ',' + location)
                    writer.writerow([myid, creature, location])
                i+=1

creature_biome(inputfile, creature_biome_file)
#creature_location(inputfile, creature_location_file)