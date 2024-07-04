import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../store/store';
import { DataGrid, GridColDef, GridRenderCellParams, GridTreeNodeWithRender } from '@mui/x-data-grid'; // Import GridValueGetterParams
import { eventsSelector, getAllEvents } from '../store/eventsSlice';

const EventsGridComponent: React.FC = () => {

    const appDispatch = useDispatch<AppDispatch>()
    const selector = useSelector(eventsSelector)

    useEffect(() => { 
            appDispatch(getAllEvents())
    }, []) 


    interface Column {
        id: 'Title' | 'description' | 'début' | 'fin' | 'fuseau horaire';
        label: string;
        minWidth?: number;
        align?: 'right';
        format?: (value: number) => string;
    }

    const columns: GridColDef[] = [
        {
          field: 'title',
          headerName: 'Nom',
          description: 'title',
          sortable: true,
          minWidth: 160
        },
        {
            field: 'description',
            headerName: 'Description',
            description: 'description',
            sortable: true,
            width: 260
        },
        {
            field: 'start',
            headerName: 'Début',
            description: 'start',
            sortable: false,
            minWidth: 260,
            renderCell: (params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>) => (
                params.row.start ? `${new Date(params.row.start).toLocaleDateString('en-CA')} ${new Date(params.row.start).toLocaleTimeString('en-CA')}` : ''
            )
        },
        {
            field: 'end',
            headerName: 'Fin',
            description: 'end',
            sortable: false,
            minWidth: 260,
            renderCell: (params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>) => (
                params.row.end ? `${new Date(params.row.end).toLocaleDateString('en-CA')} ${new Date(params.row.end).toLocaleTimeString('en-CA')}` : ''
            )
        },
        {
            field: 'timezone',
            headerName: 'Fuseau Horaire',
            description: 'timezone',
            sortable: false,
            minWidth: 160,
        },

    ];
    
    
    return (
        <DataGrid
            getRowId={(row) => row.uuid}
            rows={selector.events}
            columns={columns}
           
            initialState={{
            pagination: {
                paginationModel: {
                pageSize: 12,
                },
            },
            }}
            pageSizeOptions={[5]}
            disableRowSelectionOnClick
        />
    );
};

export default EventsGridComponent;