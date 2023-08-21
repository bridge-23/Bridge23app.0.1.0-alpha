import { ConnectWallet, useAddress } from '@thirdweb-dev/react'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

export default function Navbar() {
    const address = useAddress();

    return (
        <div className={styles.container}>
            <div className={styles.navbar}>
                <div className={styles.navLinks}>
                    {address && (
                        <Link href="/">
                            <p>Home</p>
                        </Link>
                    )}
                </div>
                <div className={styles.navLinks}>
                    {address && (
                        <Link href={`profile/${address}`}>
                            <p>Profile</p>
                        </Link>
                    )}
                </div>
                <Link href='/claim'>
                    <p>Claim rewards</p>
                </Link>
                <div className={styles.navLinks}>
                    {address && (
                        <Link href={'/rewards'}>
                            <p>My rewards</p>
                        </Link>
                    )}
                </div>
                <ConnectWallet />
            </div>
        </div>
    )
}


/*import { useRouter } from 'next/router';
import { ConnectWallet, useAddress } from '@thirdweb-dev/react';
import styles from '../styles/Home.module.css';
import Link from 'next/link';

export default function Navbar() {
    const address = useAddress();
    const router = useRouter();

    // Function to determine if a link is active
    const isActive = (href) => router.pathname === href;

    return (
        <div className={styles.container}>
            <div className={styles.navbar}>
                <div className={isActive(`https://www.bridge23.tech/`) ? styles.active : styles.navLinks}>
                    {address && (
                        <Link href={`https://www.bridge23.tech/`}>
                            <p>Home</p>
                        </Link>
                    )}
                </div>
                <div className={isActive(`/profile/${address}`) ? styles.active : styles.navLinks}>
                    {address && (
                        <Link href={`profile/${address}`}>
                            <p>Profile</p>
                        </Link>
                    )}
                </div>
                <Link href="/" className={isActive('/') ? styles.active : ''}>
                    <p>index.tsx rewards</p>
                </Link>
                <div className={isActive(`/profile/${address}`) ? styles.active : styles.navLinks}>
                    {address && (
                        <Link href={'Rewards'}>
                            <p>My rewards</p>
                        </Link>
                    )}
                </div>
                <ConnectWallet />
            </div>
        </div>
    );
}*/



