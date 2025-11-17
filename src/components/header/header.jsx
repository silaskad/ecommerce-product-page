import styles from './header.module.css'
import logo from '../../assets/logo.svg'
import iconMenu from '../../assets/icon-menu.svg'
import iconClose from '../../assets/icon-close.svg'
import iconCart from '../../assets/icon-cart.svg'
import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import Cart from '../Cart/Cart.jsx'

function Header({cart, handleRemoveFromCart}) {
    const [isMenuToggled, setIsMenuToggled] = useState(false);
    const [isCartToggled, setIsCartToggled] = useState(false);
    const menuRef = useRef(null);
    const cartRef = useRef(null);

    useEffect(() => {
        const body = document.body;

        if (isMenuToggled) {
            body.classList.add('scroll_lock');
        } else {
            body.classList.remove('scroll_lock');
        }

        return () => body.classList.remove('scroll_lock');
    }, [isMenuToggled]);


    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);

        return () => document.removeEventListener('mousedown', handleOutsideClick);
    }, []);

    useEffect(() => {
        document.addEventListener('scroll', handleScroll);

        return () => document.removeEventListener('scroll', handleScroll);
    }, []);

    function handleOutsideClick(e) {
        if (menuRef.current && !menuRef.current.contains(e.target)) {
            setIsMenuToggled(false);
        }
    }

    function handleScroll(e) {
        if (cartRef.current && !cartRef.current.contains(e.target)) {
            setIsCartToggled(false);
        }
    }
    
    return(
        <header className={styles.header}>
            <div className={styles.section_container}>
                <nav className={styles.nav_menu}>
                    <button className={styles.nav_menu_toggle} aria-label='Open menu'
                        onClick={() => setIsMenuToggled(true)}>
                        <img src={iconMenu} alt="menu icon" aria-hidden='true' />
                    </button>

                    <div ref={menuRef} className={`${styles.nav_menu_container} ${!isMenuToggled && styles.hide_nav_menu}`}>
                        <button className={styles.nav_menu_close} aria-label='Close menu'
                            onClick={() => setIsMenuToggled(false)}>
                            <img src={iconClose} alt="menu icon" aria-hidden='true' />
                        </button>
                        
                        <ul className={styles.menu_content} role='navigation'>
                            <li className={styles.menu_list}>
                                <a href="#">Collections</a>
                            </li>
                            <li className={styles.menu_list}>
                                <a href="#">Men</a>
                            </li>
                            <li className={styles.menu_list}>
                                <a href="#">Women</a>
                            </li>
                            <li className={styles.menu_list}>
                                <a href="#">About</a>
                            </li>
                            <li className={styles.menu_list}>
                                <a href="#">Contact</a>
                            </li>
                        </ul>
                    </div>
                </nav>

                <a href="/" aria-label='back to home' className={styles.logo}>
                    <img src={logo} alt="logo" aria-hidden='true' />
                </a>

                <div className={styles.cart_container}>
                    <button className={styles.cart_toggle} aria-label='View your cart items'
                        onClick={() => setIsCartToggled(!isCartToggled)}>
                        <img src={iconCart} alt="cart icon" aria-hidden='true' />
                    </button>
                    {cart.length > 0 &&
                        <div className={styles.item_count_container}>
                            <span className={styles.cart_items_count}>{cart.length}</span>
                        </div>
                    }
                </div>

                {isCartToggled &&
                    <div ref={cartRef} className={styles.cart_component_container}>
                        <Cart cart={cart} handleRemoveFromCart={handleRemoveFromCart} />
                    </div>
                }

                <a href='#' className={styles.profile_container} aria-label='Go to your profile'>
                    <img src="./assets/image-avatar.png" alt="profile" aria-hidden='true' />
                </a>
            </div>
            
            {isMenuToggled && createPortal(
                <div className='backdrop' ></div>,
                document.body
            )}
        </header>
    )
}

export default Header