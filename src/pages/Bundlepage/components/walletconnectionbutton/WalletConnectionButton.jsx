import { useTonWallet, useTonConnectModal } from "@tonconnect/ui-react";

import { ButtonDefault } from "/src/components/ButtonDefault";

export const WalletConnectionButton = () => {
    const { open } = useTonConnectModal();
    const wallet = useTonWallet();

    const openTonConnectModal = () => {
        open();
    };

    return <ButtonDefault onClick={!wallet && openTonConnectModal}>{wallet ? "Buy NFTs for 14 TON" : "Connect Wallet"}</ButtonDefault>;
};
