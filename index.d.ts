declare module 'snowtransfer' {

    export class SnowTransfer {
        constructor(token: string, options?: SnowTransferOptions)
    }


    export interface SnowTransferOptions {
        sentryDsn?: string;
        sentryOptions?: any;
        baseHost?: string;
    }

}