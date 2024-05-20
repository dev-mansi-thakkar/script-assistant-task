declare module 'react-bootstrap-table-next' {
    import { ComponentType } from 'react';
  
    export interface Column<T> {
      dataField: string;
      text: string;
      formatter?: (cell: any, row: T, rowIndex: number, formatExtraData: any) => React.ReactNode;
    }
  
    export interface BootstrapTableProps<T> {
      keyField: string;
      data: T[];
      columns: Column<T>[];
      bootstrap4?: boolean;
      striped?: boolean;
      hover?: boolean;
      condensed?: boolean;
      pagination?: any;
    }
  
    const BootstrapTable: ComponentType<BootstrapTableProps<any>>;
    export default BootstrapTable;
  }
  
  declare module 'react-bootstrap-table2-paginator' {
    const paginationFactory: (options: any) => any;
    export default paginationFactory;
  }
  