import {useAddress, useContract/*, useNFTBalance, useContract, useOwnedNFTs, useWallet*/} from '@thirdweb-dev/react';
import styles from '../../styles/Home.module.css'
import {NextPage} from "next";
import { REWARD_CONTRACT } from '../../consts/parameters';

const Admin: NextPage = () => {
    const address = useAddress();
    const {contract: rewardContract} = useContract(REWARD_CONTRACT);
    const ownerAddress = "0x852C133d411b756A3a5b79d4EF4a4cA780f013D8";

/*    const truncateAddress = (address: string) => {
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    };*/
// Здесь добавлять правила для обмена токенов
    const addExchangeRuleHandler = async () => {
        const _anyTokenAmounts = 100; // Replace with appropriate value
        const _rewardTokenId = 0; // Replace with appropriate value
        const _rewardTokenAmount = 1; // Replace with appropriate value

        try {
            // Call the 'addExchangeRule' function on the smart contract
            const tx = await rewardContract?.call("addExchangeRule", [_anyTokenAmounts, _rewardTokenId, _rewardTokenAmount]);

            // Wait for the transaction to be confirmed, if necessary
            if (tx && tx.wait) {
                await tx.wait();
            }

            alert("Exchange rule added successfully!");
        } catch (error) {
            console.error("Error adding exchange rule:", error);
            alert("Failed to add exchange rule. Please try again.");
        }
    };

    return (
        <div className={styles.container} style={{marginTop: "3rem"}}>
            {/* ...existing content... */}
            {address === ownerAddress && (
                <button onClick={addExchangeRuleHandler}>
                    Add Exchange Rule
                </button>
            )}
        </div>
    )
}

export default Admin;

/*
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
            ) : null /!* You may want to add some content to render if the address is falsy *!/}
        </div>
        {/!* ...existing content... *!/}
        {address === ownerAddress && (
            <button onClick={addExchangeRuleHandler}>
                Add Exchange Rule
            </button>
        )}
    </div>
    )
}
*/

