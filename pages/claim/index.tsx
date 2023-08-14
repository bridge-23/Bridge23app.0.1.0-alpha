import { useContract } from "@thirdweb-dev/react";
//import { BaseContract } from "ethers";
import type { NextPage } from "next";
import { REWARD_CONTRACT } from "../../consts/parameters";
import styles from "../../styles/Home.module.css";

const Claim: NextPage = () => {
   // const address = useAddress();
    const { contract: rewardContract } = useContract(REWARD_CONTRACT);
    const exchangeTokensHandler = async () => {
        // Replace these with actual values or inputs
        const ruleId = 0;
        const tokenIds = [1];
        const tokenAmounts = [100];

        try {
            const tx = await rewardContract?.call("exchangeTokens", [ruleId, tokenIds, tokenAmounts]);
            // Wait for the transaction to be confirmed, if necessary

            if (tx && tx.wait) {
                await tx.wait();
            }
            alert("Tokens exchanged successfully!");

        } catch (error) {
            console.error("Error exchanging tokens:", error);
            alert("Failed to exchange tokens. Please try again.");
        }
    };

/*    const mintRewardNft = async (reward_Contract: SmartContract<BaseContract>) => {
        // 1. Check the approval of the RewardNft contract to burn the user's serum tokens
        const hasApproval = await rewardContract?.call("isApprovedForAll", [
            address,
            rewardContract?.getAddress(),
        ]);
        const balance = await rewardContract?.call("balanceOf", [address, 0]);

        if (!hasApproval) {
            // Set approval
            await rewardContract?.call("setApprovalForAll", [
                rewardContract?.getAddress(),
                true,
            ]);
        }

        if (balance < 1) {
            return alert("Not enough burn tokens");
        }

        await rewardContract?.call("claim", [address, 1]);
    };*/
/*    function addExchangeRule(
        uint _anyTokenAmounts,
        uint _rewardTokenId,
        uint _rewardTokenAmount
) external
    let onlyOwner;
    onlyOwner*/

    return (
        <div className={styles.container} style={{ marginTop: "3rem" }}>
            {/* ...existing content... */}
            <button onClick={exchangeTokensHandler}>
                Exchange Tokens
            </button>
        </div>
    );
};

export default Claim;