//..src/components/Info/TotalMintComponent.tsx
import { Card, CardContent, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useContract, useTotalCirculatingSupply, useTotalCount } from "@thirdweb-dev/react";
import { REWARD_CONTRACT } from "../../consts/parameters";

interface TotalMintProps {
    totalMint: string;
}

const TotalMintCard: React.FC<TotalMintProps> = ({ totalMint }) => {
    const { contract } = useContract(REWARD_CONTRACT);
    const { data:totalCount, isLoading, error } = useTotalCount(contract);
    const { data: data1, isLoading: isLoading1, error: error1 } = useTotalCirculatingSupply(contract, "1");
    const { data: data2, isLoading: isLoading2, error: error2 } = useTotalCirculatingSupply(contract, "2");
    const { data: data3, isLoading: isLoading3, error: error3 } = useTotalCirculatingSupply(contract, "3");
    const { data: data4, isLoading: isLoading4, error: error4 } = useTotalCirculatingSupply(contract, "4");
    const [totalRewards, setTotalRewards] = useState<number | null>(null);

    useEffect(() => {
        let sum = 0;
        if (data1) {
            sum += parseFloat(data1.toString())* 5;
        }
        if (data2) {
            sum += parseFloat(data2.toString()) * 10;
        }
        if (data3) {
            sum += parseFloat(data3.toString()) * 50;
        }
        if (data4) {
            sum += parseFloat(data4.toString()) * 100;
        }
        setTotalRewards(sum);
        /*        console.log("Data1:", data1?.toString());
                console.log("Data2:", data2?.toString());
                console.log("Data3:", data3?.toString());
                console.log("Data4:", data4?.toString());*/
    }, [data1, data2, data3, data4]);

    return (
        <Card>
            <CardContent>
                <Typography variant="h6">
                    Items Tokenized
                </Typography>
                <Typography variant="h5">
                    {totalCount ? totalCount.toString() : 'Loading...'}
                </Typography>
                <Typography variant="body2">
                    The total number of items tokenized.
                </Typography>
            </CardContent>
        </Card>
    );
};

export default TotalMintCard;
