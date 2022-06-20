import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect } from 'react';
import { noop, SortableTable } from "chums-components";
import { useDispatch, useSelector } from "react-redux";
import { selectTableSort, sortChangedAction, tableAddedAction } from "./index";
const ConnectedTable = ({ tableKey, defaultSort, fields, data, onChangeSort, keyField, size, rowClassName, onSelectRow = noop, selected = '', className = '', tfoot, children, ...rest }) => {
    const dispatch = useDispatch();
    const currentSort = useSelector(selectTableSort(tableKey));
    useEffect(() => {
        dispatch(tableAddedAction({ key: tableKey, ...defaultSort }));
    }, []);
    useEffect(() => {
        dispatch(sortChangedAction({ key: tableKey, ...defaultSort }));
    }, [defaultSort]);
    const sortChangedHandler = (sort) => {
        dispatch(sortChangedAction({ key: tableKey, ...sort }));
        if (onChangeSort) {
            return onChangeSort(sort);
        }
    };
    return (_jsx(SortableTable, { fields: fields, data: data, currentSort: currentSort, keyField: keyField, onChangeSort: sortChangedHandler, size: size, rowClassName: rowClassName, onSelectRow: onSelectRow, selected: selected, className: className, tfoot: tfoot, children: children, ...rest }));
};
export default ConnectedTable;
//# sourceMappingURL=ConnectedTable.js.map