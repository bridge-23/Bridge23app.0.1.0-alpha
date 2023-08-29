import React, { FC } from 'react';
import { blockExplorer } from '../../consts/parameters';
import { truncateAddress } from '../../utils/truncateAddress';
import { ContractEvent } from '@thirdweb-dev/sdk';
import styles from '../../styles/HistoryCard.module.css';

interface HistoryCardProps {
    event: ContractEvent<Record<string, any>>;
}

export const HistoryCard: FC<HistoryCardProps> = ({ event }) => {
    if (!event || !event.transaction || !event.data) {
        console.error('Event, transaction, or data is undefined', event);
        return null;
    }

    return (
        <a
            href={`${blockExplorer}/tx/${event.transaction.transactionHash}`}
            target="_blank"
            rel="noreferrer"
            className={`${styles.historyCard} ${styles.large}`}
            key={event.transaction.transactionHash}
        >
            <div className={`${styles.flexColumn} ${styles.flex}`}>
                <p className={styles.textSmall}>EVENT</p>
                <p className={`${styles.textMedium} ${styles.textWhite}`}>{event.eventName}</p>
            </div>
            <div className={styles.flex}>
                <div className={`${styles.flexColumn} ${styles.flex}`}>
                    <p className={styles.textSmall}>FROM</p>
                    <p className={styles.textMedium}>{truncateAddress(event.data.from)}</p>
                </div>
                <div className={`${styles.flexColumn} ${styles.flex}`}>
                    <p className={styles.textSmall}>TO</p>
                    <p className={styles.textMedium}>{truncateAddress(event.data.to)}</p>
                </div>
            </div>
        </a>
    );
};
