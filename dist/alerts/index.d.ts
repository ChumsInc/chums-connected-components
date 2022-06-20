import { ActionInterface, ActionPayload } from "../types";
import { BootstrapColor } from "chums-components/dist/types";
export interface BasicAlert {
    title?: string;
    message?: string;
    context?: string;
    color?: BootstrapColor;
    className?: string | object;
    canDismiss?: boolean;
}
export interface AlertInterface extends BasicAlert {
    id: number;
    count: number;
    timestamp: number;
}
export declare const defaultAlert: BasicAlert;
export interface AlertListState {
    counter: number;
    list: AlertInterface[];
}
export interface AlertPayload extends ActionPayload {
    id?: number;
    alert?: BasicAlert;
}
export interface AlertAction extends ActionInterface {
    payload?: AlertPayload;
}
interface RootStateWithAlerts {
    alerts: AlertListState;
}
export declare const alertAdded: string;
export declare const alertDismissed: string;
export declare const alertDismissedByContext: string;
export declare const addAlertAction: (alert: BasicAlert) => AlertAction;
export declare const dismissAlertAction: (id: number) => AlertAction;
export declare const dismissContextAlertAction: (context: string) => AlertAction;
export declare const onErrorAction: (err: Error, context?: string) => AlertAction;
export declare const alertContextFilter: (list: AlertInterface[], context?: string) => AlertInterface[];
export declare const selectAlertList: (state: RootStateWithAlerts) => AlertInterface[];
export declare const selectAlertListByContext: (context?: string) => (state: RootStateWithAlerts) => AlertInterface[];
declare const alertReducer: (state: AlertListState | undefined, action: AlertAction) => AlertListState;
export default alertReducer;
