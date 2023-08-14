import { BigNumber } from "ethers";
import type { FC } from "react";
import { PaginationHelper } from "./PaginationHelper";
import styles from "../styles/Home.module.css";

interface IProps {
    page: number;
    setPage: (page: number) => void;
    nftsPerPage: number;
    totalCount: BigNumber | undefined;
    loading: boolean;
}

export const Footer: FC<IProps> = ({
                                       page,
                                       setPage,
                                       nftsPerPage,
                                       totalCount,
                                       loading,
                                   }) => {
    if (!totalCount) return null;
    const noOfPages = Math.ceil(totalCount.toNumber() / nftsPerPage);
    const start = (page - 1) * nftsPerPage;
    const end = start + nftsPerPage;

    return (
        <div className={styles.container}>
        <div
            className={styles.footer}>

            <h3 className="text-2xl font-bold text-[#646D7A]">
                {end} / {totalCount.toNumber().toLocaleString()}
            </h3>

            <PaginationHelper
                page={page}
                noOfPages={noOfPages}
                setPage={setPage}
                loading={loading}
            />
        </div>
        </div>
    );
};