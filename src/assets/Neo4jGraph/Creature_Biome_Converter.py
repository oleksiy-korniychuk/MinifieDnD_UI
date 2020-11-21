import csv

# INPUTS
creature_input_file = 'Creature_Biome_Type_Location.csv'
location_input_file = 'Location.csv'
# OUTPUTS
creature_biome_file = 'Creature_Biome.csv'
creature_location_file = 'Creature_Location.csv'
location_biome_file = 'Location_Biome.csv'


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
                exclusives = row[Exclusive].split(', ')
                creature = row[Name]
                myid = row[Id]
                for index, location in enumerate(locations):
                    print(creature + ',' + location + ',' + exclusives[index])
                    writer.writerow([myid, creature, location, exclusives[index]])
                i+=1

def location_biome(inF, outF):
    Id = 0
    Name = 1
    Biomes = 2
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
                location = row[Name]
                myid = row[Id]
                for biome in biomes:
                    print(location + ',' + biome)
                    writer.writerow([myid, location, biome])
                i+=1

creature_biome(creature_input_file, creature_biome_file)
creature_location(creature_input_file, creature_location_file)
location_biome(location_input_file, location_biome_file)