import React, { HTMLAttributes } from "react";
export interface AlertListProps extends HTMLAttributes<HTMLDivElement> {
    context?: string;
    children?: React.ReactNode;
}
declare const AlertList: React.FC<AlertListProps>;
export default AlertList;
