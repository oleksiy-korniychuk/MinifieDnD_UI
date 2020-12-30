from neo4j import GraphDatabase
from queryGraph import QueryGraph
import datetime

class BackupGraph:
    @staticmethod
    def perform_backup():
        agent = QueryGraph("bolt://minifiednd.com:7687", "neo4j", "goblinMonkeyBaby")
        agent.run_query("CALL apoc.export.cypher.all(\"backup_graph_" + datetime.datetime.now().strftime("%Y%m%d") + ".cypher\", {" +
                        "format: \"plain\"," +
                        "useOptimizations: {type: \"UNWIND_BATCH\", unwindBatchSize: 20}})")
        agent.close()