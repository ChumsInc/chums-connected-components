import React, {useEffect} from 'react';
import {noop, SortableTable, SortableTableProps} from "chums-components";
import {useDispatch, useSelector} from "react-redux";
import {selectTableSort, sortChangedAction, SorterProps, tableAddedAction} from "./index";


export interface ConnectedTableProps extends Omit<SortableTableProps, 'onChangeSort'|'currentSort'> {
    tableKey: string,
    defaultSort: SorterProps,
    onChangeSort?: (sort: SorterProps) => void,
}

const ConnectedTable: React.FC<ConnectedTableProps> = ({
                                                           tableKey,
                                                           defaultSort,
                                                           fields,
                                                           data,
                                                           onChangeSort,
                                                           keyField,
                                                           size,
                                                           rowClassName,
                                                           onSelectRow = noop,
                                                           selected = '',
                                                           className = '',
                                                           tfoot,
                                                           children,
                                                           ...rest
                                                       }) => {
    const dispatch = useDispatch();
    const currentSort = useSelector(selectTableSort(tableKey));

    useEffect(() => {
        dispatch(tableAddedAction({key: tableKey, ...defaultSort}));
    }, []);

    useEffect(() => {
        dispatch(sortChangedAction({key: tableKey, ...defaultSort}));
    }, [defaultSort])

    const sortChangedHandler = (sort: SorterProps) => {
        dispatch(sortChangedAction({key: tableKey, ...sort}));
        if (onChangeSort) {
            return onChangeSort(sort);
        }
    }
    return (
        <SortableTable fields={fields} data={data} currentSort={currentSort} keyField={keyField}
                       onChangeSort={sortChangedHandler}
                       size={size} rowClassName={rowClassName} onSelectRow={onSelectRow} selected={selected}
                       className={className} tfoot={tfoot} children={children} {...rest}/>
    )
}

export default ConnectedTable;
