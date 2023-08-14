import useDebounce from "../hooks/useDebounce";
import { FC, useEffect, useState } from "react";
import styles from "../styles/PaginationHelper.module.css";

interface IProps {
    page: number;
    setPage: (page: number) => void;
    noOfPages: number;
    loading: boolean;
}

const PaginationHelper: FC<IProps> = ({
                                          page,
                                          setPage,
                                          noOfPages,
                                          loading,
                                      }) => {
    const [isSearching, setIsSearching] = useState(false);
    const [pageInput, setPageInput] = useState<number>(page);
    const debouncedSearchTerm = useDebounce(String(pageInput), 500);

    useEffect(() => {
        if (debouncedSearchTerm) {
            setIsSearching(true);
            setPage(Number(debouncedSearchTerm));
            setIsSearching(false);
        } else {
            setPage(1);
        }
    }, [debouncedSearchTerm, setPage]);

    return (
        <div className={styles.paginationContainer}>
            {isSearching || loading ? (
                <div className={styles.spinner}></div>
            ) : (
                <>
                    <button
                        className={page === 1 ? `${styles.paginationButton} ${styles.paginationButtonDisabled}` : styles.paginationButton}
                        onClick={() => setPage(page - 1)}
                        disabled={page === 1}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="h-6 w-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.75 19.5L8.25 12l7.5-7.5"
                            />
                        </svg>
                    </button>
                    <input
                        type="number"
                        className={styles.paginationInput}
                        onChange={(e) => setPageInput(Number(e.target.value))}
                        value={pageInput}
                    />
                    <button
                        className={page === noOfPages ? `${styles.paginationButton} ${styles.paginationButtonDisabled}` : styles.paginationButton}
                        onClick={() => setPage(page + 1)}
                        disabled={page === noOfPages}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="h-6 w-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M8.25 4.5l7.5 7.5-7.5 7.5"
                            />
                        </svg>
                    </button>
                </>
            )}
        </div>
    );
};

export { PaginationHelper };