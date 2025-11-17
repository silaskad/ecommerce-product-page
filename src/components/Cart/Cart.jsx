import styles from '../Cart/Cart.module.css'
import iconDelete from '../../assets/icon-delete.svg'

function Cart({cart, handleRemoveFromCart}) {
    return(
        <section className={styles.cart}>
            <div className={styles.section_container}>
                <div className={styles.section_content}>
                    <div className={styles.content_topper}>
                        <h1 className={styles.content_tittle}>Cart</h1>
                    </div>

                    {cart.length <= 0
                        ?   <div className={styles.empty_cart}></div>
                        :   <>
                            <div className={styles.list_container}>
                                <ul className={styles.cart_list} role='list'>
                                    {cart.map(c => (
                                        <li key={c.id} className={styles.list_element}>
                                            <div className={styles.img_container}>
                                                <img src={c.thumbnail} alt="product thumbnail" />
                                            </div>
                                            <div className={styles.text_group}>
                                                <p className={styles.product_name}>{c.name}</p>
                                                <span className={styles.product_price_calc}>{`${new Intl.NumberFormat('en-US', {
                                                    style: 'currency',
                                                    currency: c.pricing.currency,
                                                }).format(c.pricing.sale)} x ${c.purchaseQuantity}`}</span>
                                                <span className={styles.product_price}>{new Intl.NumberFormat('en-US', {
                                                    style: 'currency',
                                                    currency: c.pricing.currency,
                                                }).format(c.pricing.total)}</span>
                                            </div>
                                            <div className={styles.button_container}>
                                                <button className={styles.delete_button} aria-label='Remove item from the cart'
                                                    onClick={() => handleRemoveFromCart(c.id)}>
                                                    <img src={iconDelete} alt="delete icon" aria-hidden='true' />
                                                </button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                    

                    
                        <div className={styles.checkout_button_wrapper}>
                            <a href='#' className={styles.checkout_button}>
                                checkout
                            </a>
                        </div>
                        </>
                    }
                </div>
            </div>
        </section>
    )
}

export default Cart