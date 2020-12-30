from neo4j import GraphDatabase

class QueryGraph:
    def __init__(self, uri, user, password):
        self.driver = GraphDatabase.driver(uri, auth=(user, password))

    def close(self):
        self.driver.close()

    def run_query(self, query):
        with self.driver.session() as session:
            response = session.write_transaction(self._execute_query, query)
            #print(response)

    @staticmethod
    def _execute_query(tx, query):
        tx.run(query)
        return None