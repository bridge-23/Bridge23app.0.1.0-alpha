import { BigNumber } from "ethers";
import type { FC } from "react";
import { PaginationHelper } from "./PaginationHelper";

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
        <div
            style={{
                WebkitTextSizeAdjust: "100%",
                tabSize: 4,
                fontFamily: "Inter,sans-serif",
                color: "rgb(229, 229, 229)",
                boxSizing: "border-box",
                borderWidth: 0,
                borderStyle: "solid",
                borderColor: "#e5e7eb",
                marginBottom: "1rem",
                marginTop: "2.5rem",
                display: "flex",
                width: "100%",
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "space-between",
                gap: "0px",
            }}
        >
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
    );
};