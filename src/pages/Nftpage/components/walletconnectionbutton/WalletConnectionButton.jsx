import { useTonWallet, useTonConnectModal } from "@tonconnect/ui-react";

import { ButtonDefault } from "/src/components/ButtonDefault";

export const WalletConnectionButton = () => {
    const { open } = useTonConnectModal();
    const wallet = useTonWallet();

    const openTonConnectModal = () => {
        open();
    };

    return (
        <ButtonDefault marginTop={20} onClick={!wallet && openTonConnectModal}>
            {wallet ? "Buy Product" : "Connect Wallet"}
        </ButtonDefault>
    );
};
