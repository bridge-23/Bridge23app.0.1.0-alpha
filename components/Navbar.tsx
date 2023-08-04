import { ConnectWallet, useAddress } from '@thirdweb-dev/react'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

export default function Navbar() {
    const address = useAddress();

    return (
        <div className={styles.container}>
            <div className={styles.navbar}>
                <Link href="/">
                    <p>Claim rewards</p>
                </Link>
                <div className={styles.navLinks}>
                    {address && (
                        <Link href={`profile/${address}`}>
                            <p>My items</p>
                        </Link>
                    )}
                </div>
                <div className={styles.navLinks}>
                    {address && (
                        <Link href={`profile/${address}`}>
                            <p>My rewards</p>
                        </Link>
                    )}
                </div>
                <ConnectWallet />
            </div>
        </div>
    )
}