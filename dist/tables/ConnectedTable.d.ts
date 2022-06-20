import React from 'react';
import { SortableTableProps } from "chums-components";
import { SorterProps } from "./index";
export interface ConnectedTableProps extends Omit<SortableTableProps, 'onChangeSort' | 'currentSort'> {
    tableKey: string;
    defaultSort: SorterProps;
    onChangeSort?: (sort: SorterProps) => void;
}
declare const ConnectedTable: React.FC<ConnectedTableProps>;
export default ConnectedTable;
