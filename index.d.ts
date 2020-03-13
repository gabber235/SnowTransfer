declare module 'snowtransfer' {

    class SnowTransfer {
        constructor(token: string, options?: SnowTransferOptions)
    }


    interface SnowTransferOptions {
        sentryDsn?: string;
        sentryOptions?: any;
        baseHost?: string;
    }

}