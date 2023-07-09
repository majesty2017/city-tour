import DataTable from "react-data-table-component";

const DataTables = ({columns, data}) => {
    return (
        <DataTable
            columns={columns}
            data={data}
            striped
            pagination
            highlightOnHover
            responsive
        />
    )
}

export default DataTables
