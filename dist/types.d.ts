import { AnyAction } from "redux";
export interface ActionPayload {
    error?: Error;
    context?: string;
    clearContext?: string;
}
export interface ActionInterface extends AnyAction {
    type: string;
    payload?: ActionPayload | unknown;
    meta?: Object | string;
    error?: boolean;
}
