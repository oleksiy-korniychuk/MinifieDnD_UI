from backupGraph import BackupGraph
from exportDataFromSheets import ExportData
from separateOutData import SeparateOutData
from generateNewGraph import GenerateGraph

BackupGraph.perform_backup()
export = ExportData()
export.export_all_data()
separate = SeparateOutData()
separate.separate_out_data()
generate = GenerateGraph()
generate.generate_graph()

