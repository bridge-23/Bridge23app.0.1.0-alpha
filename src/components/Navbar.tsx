import { ConnectWallet, useAddress } from '@thirdweb-dev/react'
import styles from '../styles/Navbar.module.css'
import Link from 'next/link'
import { useState } from 'react';

export default function Navbar() {
    const address = useAddress();
    const [isNavOpen, setIsNavOpen] = useState(false);
    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    }

    return (
        <div className={styles.navbarcontainer}>
            <div className={styles.navbar}>

                <button className={styles.hamburger} onClick={toggleNav}>
                    ☰
                </button>

                <div className={isNavOpen ? `${styles.navLinksContainer} ${styles.navOpen}` : styles.navLinksContainer}>

                    <div className={styles.navLinks}>

                        <Link href="/">
                            <p>Home</p>
                        </Link>

                    </div>

                    <div className={styles.navLinks}>
                        {address && (
                            <Link href={`profile/${address}`}>
                                <p>Profile</p>
                            </Link>
                        )}
                    </div>

                    <div className={styles.navLinks}>

                        {address && (
                            <Link href={`claim/${address}`}>
                                <p>Claim Rewards</p>
                            </Link>
                        )}
                    </div>

                </div>

                <ConnectWallet theme={"light"}/>

            </div>
        </div>
    )
}





            {/*                <div className={styles.navLinks}>
                    {address && (
                        <Link href={'/rewards'}>
                            <p>My rewards</p>
                        </Link>
                    )}
                </div>*/}



