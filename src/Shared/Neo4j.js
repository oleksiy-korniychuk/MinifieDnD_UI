export const testQuery = async () => {
    const neo4j = require('neo4j-driver')

    const driver = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic('neo4j', '1234'))
    const session = driver.session()

    try {
    const result = await session.run(
        'MATCH (n:Biome) RETURN n LIMIT 1'
    )

    const singleRecord = result.records[0]
    const node = singleRecord.get(0)

    console.log(node.properties.type)
    } finally {
    await session.close()
    }

    // on application exit:
    await driver.close()
}
