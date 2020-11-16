//INITIAL SET
CREATE (Ocean:Biome {name:"Ocean"})
CREATE (Mermaid:Creature {name:"Mermaid", speed_water:20, speed_land:5, hp:50})
Create (Beaver:Creature {name:"Beaver", speed_water:15, speed_land:10, hp:10})
CREATE (Forest:Biome {name:"Forest"})
CREATE (River:Location {name:"River"})
CREATE (SmallFish:Creature {name:"Small Fish", speed_water:10, hp:2})
CREATE (Mountains:Biome {name:"Mountains"})
CREATE (StoneGiant:Creature {name:"Stone Giant", speed_land:50, hp:300})

CREATE
(Mermaid)-[:LIVES_IN]->(Ocean),
(SmallFish)-[:LIVES_IN]->(Ocean),
(SmallFish)-[:LIVES_IN]->(River),
(Beaver)-[:LIVES_IN]->(River),
(Beaver)-[:LIVES_IN]->(Forest),
(StoneGiant)-[:LIVES_IN]->(Mountains),
(Ocean)-[:IS_NEAR]->(River),
(River)-[:IS_NEAR]->(Ocean),
(Forest)-[:IS_NEAR]->(River),
(River)-[:IS_IN]->(Forest),
(River)-[:IS_IN]->(Mountains),
(Mountains)-[:IS_NEAR]->(Forest)
(Forest)-[:IS_NEAR]->(Mountains)

//FOREST
CREATE (Goblin:Creature {name:"Goblin", speed_land:20, hp:20})
CREATE (Ent:Creature {name:"Ent", speed_land:50, hp:300})
CREATE (Centaur:Creature {name:"Centaur", speed_land:50, hp:50})
CREATE (Fairy:Creature {name:"Fairy", speed_land:5, speed_air:20, hp:10})
CREATE (Bear:Creature {name:"Bear", speed_land:35, hp:100})
CREATE (Werewolf:Creature {name:"Werewolf", speed_land:25, hp:65})

CREATE
(Goblin)-[:LIVES_IN]->(Forest),
(Ent)-[:LIVES_IN]->(Forest),
(Centaur)-[:LIVES_IN]->(Forest),
(Fairy)-[:LIVES_IN]->(Forest),
(Bear)-[:LIVES_IN]->(Forest),
(Werewolf)-[:LIVES_IN]->(Forest)

//OCEAN
CREATE (Siren:Creature {name:"Siren", speed_water:30, hp:45})
CREATE (Kraken:Creature {name:"Kraken", speed_water:150, hp:300})
CREATE (Narwhal:Creature {name:"Narwhal", speed_water:50, hp:60})
CREATE (UndeadPirate:Creature {name:"Undead Pirate", speed_water:20, hp:45})
CREATE (Manatee:Creature {name:"Manatee", speed_water:50, hp:30})

CREATE
(Siren)-[:LIVES_IN]->(Ocean),
(Kraken)-[:LIVES_IN]->(Ocean),
(Narwhal)-[:LIVES_IN]->(Ocean),
(UndeadPirate)-[:LIVES_IN]->(Ocean),
(Manatee)-[:LIVES_IN]->(Ocean)

//CREATURE TYPES
CREATE (Aberration:TYPE {name:"Aberration"})
CREATE (Beast:TYPE {name:"Beast"})
CREATE (Celestial:TYPE {name:"Celestial"})
CREATE (Construct:TYPE {name:"Construct"})
CREATE (Dragon:TYPE {name:"Elemental"})
CREATE (Elemental:TYPE {name:"Elemental"})
CREATE (Fey:TYPE {name:"Fey"})
CREATE (Fiend:TYPE {name:"Fiend"})
CREATE (Giant:TYPE {name:"Giant"})
CREATE (Humanoid:TYPE {name:"Humanoid"})
CREATE (Monstrosity:TYPE {name:"Monstrosity"})
CREATE (Ooze:TYPE {name:"Ooze"})
CREATE (Plant:TYPE {name:"Plant"})
CREATE (Undead:TYPE {name:"Undead"})

//INITIAL LOCATIONS
CREATE (CoralReef:LOCATION {name:"Coral Reef"})
CREATE (Cave:LOCATION {name:"Cave"})
CREATE (TreetopVillage:LOCATION {name:"Treetop Village"})

CREATE
(Cave)-[:IS_IN]->(Mountains),
(CoralReef)-[:IS_IN]->(Ocean),
(TreetopVillage)-[:IS_IN]->(Forest)

