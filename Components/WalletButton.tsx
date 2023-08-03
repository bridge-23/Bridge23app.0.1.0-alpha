// WalletButton.tsx
import { FC, useEffect, useState } from 'react';
import { ConnectWallet } from '@thirdweb-dev/react';

const WalletButton: FC = () => {
    const [isWalletConnected, setIsWalletConnected] = useState<boolean>(false);

    useEffect(() => {
        // Add your logic to check if wallet is connected
        // and set 'isWalletConnected' state accordingly
    }, []);

    if (!isWalletConnected) {
        return <ConnectWallet />;
    }

    // Optionally, you can return a different element (or `null`) when the wallet is connected:
    return null;
};

export default WalletButton;