
// Load in Biomes
LOAD CSV WITH HEADERS FROM "file:///Biome.csv" AS row
MERGE (biome:Biome {name: row.Name})

// Load in Types
LOAD CSV WITH HEADERS FROM "file:///Type.csv" AS row
MERGE (type:Type {name: row.Name})

// Load in Locations
LOAD CSV WITH HEADERS FROM "file:///Location.csv" AS row
MERGE (location:Location {name: row.Name})

// Load in Creature Nodes and relate to Type Nodes
LOAD CSV WITH HEADERS FROM "file:///Creature_Biome_Type_Location.csv" AS row
MATCH (type:Type {name: row.Type})
MERGE (creature:Creature {name: row.Name, size: row.Size, cr: row.CR, alignment: row.Alignment, source: row.Source})
MERGE (creature)-[:IS_A]->(type)

// Connect Creature to Biome
LOAD CSV WITH HEADERS FROM "file:///Creature_Biome.csv" AS row
MATCH (creature:Creature {name: row.Name})
MATCH (biome:Biome {name: row.Biome})
MERGE (creature)-[:LIVES_IN]->(biome)

// Connect Creature to Type
// LOAD CSV WITH HEADERS FROM "file:///Creature_Type.csv" AS row
// MATCH (creature:Creature {name: row.Name})
// MERGE (creature)-[:IS_A]->(type:Type {name: row.Type})

// Connect Creature to Location
LOAD CSV WITH HEADERS FROM "file:///Creature_Location.csv" AS row
MATCH (creature:Creature {name: row.Name})
MATCH (location:Location {name: row.Location})
MERGE (creature)-[:LIVES_IN]->(location)

// Connect Location to Biome
LOAD CSV WITH HEADERS FROM "file:///Location_Biome.csv" AS row
MATCH (location:Location {name: row.Name})
MATCH (biome:Biome {name: row.Biome})
MERGE (location)-[:IS_IN]->(biome)

// Export Entire DB As Cypher Script
CALL apoc.export.cypher.all("create_graph.cypher", {
    format: "plain",
    useOptimizations: {type: "UNWIND_BATCH", unwindBatchSize: 20}
})