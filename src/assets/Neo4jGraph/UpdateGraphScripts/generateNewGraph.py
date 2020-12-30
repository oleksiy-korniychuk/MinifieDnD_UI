import csv
from queryGraph import QueryGraph

biome_data_file = "../CSVs/Biome.csv"
location_data_file = '../CSVs/Location.csv'
creature_data_file = '../CSVs/Creature_Biome_Type_Location.csv'
type_data_file = '../CSVs/Type.csv'

creature_biome_file = '../CSVs/Creature_Biome.csv'
creature_location_file = '../CSVs/Creature_Location.csv'
creature_type_file = '../CSVs/Creature_Type.csv'
location_biome_file = '../CSVs/Location_Biome.csv'

class GenerateGraph:
    # CREATE NODES
    @staticmethod
    def _create_biome_cypher(inF):
        cypher = ""
        ID = 0
        Name = 1

        with open(inF, newline='') as csvfile:
            reader = csv.reader(csvfile)
            for i, row in enumerate(reader):
                if i == 0:
                    continue
                cypher += ("CREATE (:Biome {name:\"" + row[Name] + "\"})\n")

        return cypher

    @staticmethod
    def _create_location_cypher(inF):
        cypher = ""
        ID = 0
        Name = 1
        Biome = 2

        with open(inF, newline='') as csvfile:
            reader = csv.reader(csvfile)
            for i, row in enumerate(reader):
                if i == 0:
                    continue
                cypher += ("CREATE (:Location {name:\"" + row[Name] + "\"})\n")

        return cypher

    @staticmethod
    def _create_creature_cypher(inF):
        cypher = ""
        ID = 0
        Name = 1
        Size = 2
        Type = 3
        Alignment = 4
        CR = 5
        Source = 6
        Biome = 7
        Location = 8
        Exclusive =9

        with open(inF, newline='') as csvfile:
            reader = csv.reader(csvfile)
            for i, row in enumerate(reader):
                if i == 0:
                    continue
                cypher += ("CREATE (:Creature {name:\"" + row[Name] + "\", size:\"" + row[Size] + "\", " +
                           "alignment:\"" + row[Alignment] + "\", cr:\"" + row[CR] + "\", source:\"" + row[Source] +
                           "\"})\n")

        return cypher

    @staticmethod
    def _create_type_cypher(inF):
        cypher = ""
        ID = 0
        Name = 1

        with open(inF, newline='') as csvfile:
            reader = csv.reader(csvfile)
            for i, row in enumerate(reader):
                if i == 0:
                    continue
                cypher += ("CREATE (:Type {name:\"" + row[Name] + "\"})\n")

        return cypher

    # CREATE RELATIONSHIPS
    @staticmethod
    def _relate_creature_biome(inF):
        cypher_list = []
        ID = 0
        Name = 1
        Biome = 2

        with open(inF, newline='') as csvfile:
            reader = csv.reader(csvfile)
            for i, row in enumerate(reader):
                if i == 0:
                    continue
                cypher_list.append("MATCH (c:Creature {name:\"" + row[Name] + "\"})\n" +
                           "MERGE (b:Biome {name:\"" + row[Biome] + "\"})\n" +
                           "MERGE (c)-[:LIVES_IN]->(b)\n")

        return cypher_list

    @staticmethod
    def _relate_creature_location(inF):
        cypher_list = []
        ID = 0
        Name = 1
        Location = 2
        Exclusive = 3

        with open(inF, newline='') as csvfile:
            reader = csv.reader(csvfile)
            for i, row in enumerate(reader):
                if i == 0:
                    continue
                cypher_list.append("MATCH (c:Creature {name:\"" + row[Name] + "\"})\n" +
                           "MERGE (l:Location {name:\"" + row[Location] + "\"})\n" +
                           "MERGE (c)-[:LIVES_IN {exclusive:\"" + row[Exclusive] + "\"}]->(l)\n")

        return cypher_list

    @staticmethod
    def _relate_creature_type(inF):
        cypher_list = []
        ID = 0
        Name = 1
        Type = 2

        with open(inF, newline='') as csvfile:
            reader = csv.reader(csvfile)
            for i, row in enumerate(reader):
                if i == 0:
                    continue
                cypher_list.append("MATCH (c:Creature {name:\"" + row[Name] + "\"})\n" +
                           "MERGE (t:Type {name:\"" + row[Type] + "\"})\n" +
                           "MERGE (c)-[:IS_A]->(t)\n")

        return cypher_list

    @staticmethod
    def _relate_location_biome(inF):
        cypher_list = []
        ID = 0
        Name = 1
        Biome = 2

        with open(inF, newline='') as csvfile:
            reader = csv.reader(csvfile)
            for i, row in enumerate(reader):
                if i == 0:
                    continue
                cypher_list.append("MATCH (l:Location {name:\"" + row[Name] + "\"})\n" +
                           "MERGE (b:Biome {name:\"" + row[Biome] + "\"})\n" +
                           "MERGE (l)-[:IS_IN]->(b)\n")

        return cypher_list

    def generate_graph(self):
        # OPEN
        agent = QueryGraph("bolt://minifiednd.com:7687", "neo4j", "goblinMonkeyBaby")
        # DELETE
        agent.run_query("MATCH (n) DETACH DELETE n")
        # CREATE
        agent.run_query(self._create_biome_cypher(biome_data_file))
        agent.run_query(self._create_location_cypher(location_data_file))
        agent.run_query(self._create_creature_cypher(creature_data_file))
        agent.run_query(self._create_type_cypher(type_data_file))
        # RELATE
        i = 0
        for query in self._relate_creature_biome(creature_biome_file):
            agent.run_query(query)
            print("relate_creature_biome" + str(i))
            i += 1
        i = 0
        for query in self._relate_creature_location(creature_location_file):
            agent.run_query(query)
            print("relate_creature_location" + str(i))
            i += 1
        i = 0
        for query in self._relate_creature_type(creature_type_file):
            agent.run_query(query)
            print("relate_creature_type" + str(i))
            i += 1
        i = 0
        for query in self._relate_location_biome(location_biome_file):
            agent.run_query(query)
            print("relate_location_biome" + str(i))
            i += 1
        # CLOSE
        agent.close()
