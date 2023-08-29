import { BigNumber } from "ethers";
import styles from "../styles/Footer.module.css";
import { PaginationHelper } from "./PaginationHelper";

interface IProps {
    page: number;
    setPage: (page: number) => void;
    nftsPerPage: number;
    totalCount: BigNumber | undefined;
    loading: boolean;
}

function Footer({
                    page,
                    setPage,
                    nftsPerPage,
                    totalCount,
                    loading,
                }: IProps) {
    if (!totalCount) return null;
    const noOfPages = Math.ceil(totalCount.toNumber() / nftsPerPage);
    const start = (page - 1) * nftsPerPage;
    const end = start + nftsPerPage;

    return (
        <div className={styles.container}>
            <div className={styles.footer}>
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
}

export default Footer;
