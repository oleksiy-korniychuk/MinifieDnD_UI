
// Load in Biomes
LOAD CSV WITH HEADERS FROM "file:///Biome.csv" AS row
MERGE (biome:Biome {name: row.Name})

//Load in Types
LOAD CSV WITH HEADERS FROM "file:///Type.csv" AS row
MERGE (type:Type {name: row.Name})

// Load in Creature Nodes and relate to Type Nodes
LOAD CSV WITH HEADERS FROM "file:///Creatures_Biome_Types_Locations.csv" AS row
MATCH (type:Type {name: row.Type})
MERGE (creature:Creature {name: row.Name, size: row.Size, cr: row.CR, alignment: row.Alignment, source: row.Source})
MERGE (creature)-[:IS_A]->(type)

// Connect Creature to Biome
LOAD CSV WITH HEADERS FROM "file:///Creatures_Biome.csv" AS row
MATCH (creature:Creature {name: row.Name})
MATCH (biome:Biome {name: row.Biome})
MERGE (creature)-[:LIVES_IN]->(biome)

// Connect Creature to Type
LOAD CSV WITH HEADERS FROM "file:///Creatures_Type.csv" AS row
MATCH (creature:Creature {name: row.Name})
MERGE (creature)-[:IS_A]->(type:Type {name: row.Type})