import { useNFTBalance, useContract, useAddress } from "@thirdweb-dev/react";
import { REGULAR_BURN } from '../consts/parameters';


function UseNFTBalance() {
    const address = useAddress();
    const { contract } = useContract(REGULAR_BURN);
    const { isLoading, data, error } = useNFTBalance(
         contract,
         address,
        "{{anyTokenId}}",
    );
}
export default UseNFTBalance;
// Compare this snippet from hooks/UseNFTBalance.ts: