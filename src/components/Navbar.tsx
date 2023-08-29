import { ConnectWallet, useAddress } from '@thirdweb-dev/react'
import styles from '../styles/Navbar.module.css'
import Link from 'next/link'
import { useState } from 'react';

export default function Navbar() {
    const address = useAddress();
    const [showModal, setShowModal] = useState(false);  // State to handle modal visibility

    const [isNavOpen, setIsNavOpen] = useState(false);

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    }

        /*    const handleShowModal = () => {
            setShowModal(true);
            setTimeout(() => {
                setShowModal(false);
            }, 300); // Close the modal after 3 seconds
        }*/
        // I want to add auto close modal after 3 seconds but not work

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
                        <button onClick={() => setShowModal(true)} className={styles.navButton}>Claim Rewards</button>
                    )}
                        </div>


                    </div>

                    <ConnectWallet theme={"light"}/>

                </div>

                    {/*                <div className={styles.navLinks}>
                    {address && (
                <Link href='/claim'>
                    <p>Claim rewards</p>
                </Link>
                )}
                </div>*/}

                    {/*                <div className={styles.navLinks}>
                    {address && (
                        <Link href={'/rewards'}>
                            <p>My rewards</p>
                        </Link>
                    )}
                </div>*/}


                {/* Modal code */}
                {showModal && (
                    <div style={{
                        display: 'flex',  // Use flexbox
                        flexDirection: 'column',  // Stack children vertically
                        justifyContent: 'center',  // Center children vertically
                        alignItems: 'center',  // Center children horizontally
                        position: 'fixed',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '400px',
                        height: '200px',
                        backgroundColor: '#FFEB3B',
                        padding: '20px',
                        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                        zIndex: 1000,
                        color: 'black',
                        fontSize: '56px',
                        fontWeight: 'bold',
                        border: '2px solid blue'
                    }}>
                        <p>Coming Soon</p>

                        <button
                            onClick={() => setShowModal(false)}
                            style={{
                                padding: '20px 40px',  // Increase padding for larger button size
                                fontSize: '24px',  // Increase font size
                                borderRadius: '8px',  // Optional: rounded corners
                                border: '2px solid black',  // Optional: adjust border width
                                cursor: 'pointer',  // Change cursor to pointer on hover
                                transition: '0.2s ease',  // Optional: Smoothens hover effects
                                backgroundColor: 'white',  // Optional: button background color
                                color: 'black'  // Optional: button text color
                            }}
                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#e0e0e0'}  // Optional: hover effect to darken button
                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'white'}  // Resetting the hover effect
                        >
                            Close
                        </button>
                    </div>
                )}
            </div>
        );
    };

