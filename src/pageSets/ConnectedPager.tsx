import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Pager} from "chums-components";
import {addPageSetAction, selectPageSet, setPageAction, setRowsPerPageAction} from "./index";


export interface ConnectedPagerProps {
    pageSetKey: string,
    dataLength: number,
    filtered?: boolean,
    onChangePage?: (page: number) => void
    onChangeRowsPerPage?: (rowsPerPage: number, page?: number) => void
}

const ConnectedPager: React.FC<ConnectedPagerProps> = ({pageSetKey, dataLength, filtered, onChangePage, onChangeRowsPerPage}) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(addPageSetAction({key: pageSetKey}));
    }, [])
    const {page, rowsPerPage} = useSelector(selectPageSet(pageSetKey));

    const pageChangeHandler = (page: number) => {
        dispatch(setPageAction({key: pageSetKey, page}));
        if (onChangePage) {
            onChangePage(page);
        }
    }
    const rowsPerPageChangeHandler = (rowsPerPage: number) => {
        dispatch(setRowsPerPageAction({key: pageSetKey, rowsPerPage, page: 1}));
        if (onChangeRowsPerPage) {
            onChangeRowsPerPage(rowsPerPage, 1);
        }
    }

    return (
        <Pager page={page} rowsPerPage={rowsPerPage} dataLength={dataLength} onChangePage={pageChangeHandler}
               filtered={filtered}
               onChangeRowsPerPage={rowsPerPageChangeHandler}/>
    )
}

export default ConnectedPager;
