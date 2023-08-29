import { useAddress/*, useNFTBalance, useContract, useOwnedNFTs, useWallet*/ } from '@thirdweb-dev/react';
import styles from '../../styles/Home.module.css'
import {NextPage} from "next";
//import { REGULAR_BURN } from '../../consts/parameters';

const Rewards: NextPage = () =>  {
    const address = useAddress();

    const truncateAddress = (address: string) => {
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    };

/*    const { data: ownerBalance, isLoading, error } = useNFTBalance(contract, &quot;{{wallet_address}}&quot;);

    const {contract} = useContract(REGULAR_BURN);

        const { data: ownedNFTs, isLoading: isOwnedNFTsLoading,

        } = useOwnedNFTs(contract, address);*/

    return (
        <div className={styles.container}>
            {address ? (
                <div>
                    <div>
                        <h1>My rewards</h1>
                        <p>Bridge id: {truncateAddress(address || "")}</p>
                    </div>
                    <hr/>
                    <div>
                        <h3>Total rewards is 5670$</h3>
                        <p> Congratulation with good work with Bridge 23, we wait you feed back</p>
                    </div>
                </div>
            ) : null /* You may want to add some content to render if the address is falsy */}
        </div>
    )
}

export default Rewards;