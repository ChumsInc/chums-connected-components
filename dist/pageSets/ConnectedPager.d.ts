import React from "react";
export interface ConnectedPagerProps {
    pageSetKey: string;
    dataLength: number;
    onChangePage?: (page: number) => void;
    onChangeRowsPerPage?: (rowsPerPage: number, page?: number) => void;
}
declare const ConnectedPager: React.FC<ConnectedPagerProps>;
export default ConnectedPager;
