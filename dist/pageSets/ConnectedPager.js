import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pager } from "chums-components";
import { addPageSetAction, selectPageSet, setPageAction, setRowsPerPageAction } from "./index";
const ConnectedPager = ({ pageSetKey, dataLength, filtered, onChangePage, onChangeRowsPerPage }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(addPageSetAction({ key: pageSetKey }));
    }, []);
    const { page, rowsPerPage } = useSelector(selectPageSet(pageSetKey));
    const pageChangeHandler = (page) => {
        dispatch(setPageAction({ key: pageSetKey, page }));
        if (onChangePage) {
            onChangePage(page);
        }
    };
    const rowsPerPageChangeHandler = (rowsPerPage) => {
        dispatch(setRowsPerPageAction({ key: pageSetKey, rowsPerPage, page: 1 }));
        if (onChangeRowsPerPage) {
            onChangeRowsPerPage(rowsPerPage, 1);
        }
    };
    return (_jsx(Pager, { page: page, rowsPerPage: rowsPerPage, dataLength: dataLength, onChangePage: pageChangeHandler, filtered: filtered, onChangeRowsPerPage: rowsPerPageChangeHandler }));
};
export default ConnectedPager;
//# sourceMappingURL=ConnectedPager.js.map