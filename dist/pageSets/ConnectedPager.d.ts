import React from "react";
export interface ConnectedPagerProps {
    pageSetKey: string;
    defaultRowsPerPage?: number;
    dataLength: number;
    filtered?: boolean;
    onChangePage?: (page: number) => void;
    onChangeRowsPerPage?: (rowsPerPage: number, page?: number) => void;
}
declare const ConnectedPager: React.FC<ConnectedPagerProps>;
export default ConnectedPager;
