import styles from '../product/Product.module.css'
import iconPrevious from '../../assets/icon-previous.svg'
import iconNext from '../../assets/icon-next.svg'
import iconMinus from '../../assets/icon-minus.svg'
import iconPlus from '../../assets/icon-plus.svg'
import iconCart from '../../assets/icon-cart.svg'
import Lightbox from '../lightbox/Lightbox.jsx'
import { useState, useEffect, useReducer } from 'react'
import { createPortal } from 'react-dom'
import { indexReducer } from '../../functions/Reducers.jsx'
import { handlePrev, handleNext, handleMatch } from '../../functions/ImgDisplays.jsx'

function Product({productObj, handleAddToCart}) {
    const [lightboxView, setLightboxView] = useState(false);
    const [currentIndex, dispatch] = useReducer(indexReducer, (0));
    const [quantityCount, setQuantityCount] = useState(0);

    useEffect(() => {
        const body = document.body;

        if (lightboxView === true) {
            body.classList.add('scroll_lock');
        } else {
            body.classList.remove('scroll_lock');
        }

        return () => body.classList.remove('scroll_lock');
        
    }, [lightboxView]);

    function handleQuantity(type) {
        setQuantityCount(prev =>
            type === '+'
                ? prev + 1
                : Math.max(0, prev - 1)
        );
    }

    return (
        <section className={styles.product}>
            <div className={styles.section_container}>
                <div className={styles.section_images}>
                    <div className={styles.product_image_main_container}>
                        <button className={styles.main_img_button}
                            onClick={() => {setLightboxView(true); }}>
                            <img src={productObj.images.full[currentIndex]} alt="sneaker image" title='View lightbox'/>
                        </button>
                        <div className={styles.button_nav_group}>
                            <button className={`${styles.nav_button} ${styles.previous_button}`}
                                onClick={() => handlePrev(dispatch, productObj.images.full.length)}>
                                <img src={iconPrevious} alt="previous" aria-hidden='true' />
                            </button>
                            <button className={`${styles.nav_button} ${styles.next_button}`}
                                onClick={() => handleNext(dispatch, productObj.images.full.length)}>
                                <img src={iconNext} alt="next" aria-hidden='true' />
                            </button>
                        </div>
                    </div>
                    
                    {lightboxView && (
                        <>
                            {createPortal(
                                <div className='backdrop'></div>,
                                document.body
                            )}
                            <Lightbox productObj={productObj} setLightboxView={setLightboxView} />
                        </>
                    )}

                    <div className={styles.content_thumbnails}>
                        <ul className={styles.thumbnails_container} role='navigation' aria-label='More photos of this sneaker'>
                            {productObj.images.thumbnails.map((thumbnail, index) => (
                                <li key={thumbnail.id} className={`${styles.thumbnail_list_element} ${currentIndex === index && styles.active}`}>
                                    <button className={styles.thumbnail_button}
                                        onClick={(e) => {e.preventDefault(); handleMatch(dispatch, index);}}>
                                        <img src={thumbnail.src} alt={`product thumbnail ${index + 1}`} />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className={styles.section_texts}>
                    <span className={styles.topper}>{productObj.manufacturer}</span>
                    <h1 className={styles.content_title}>{productObj.name}</h1>
                    <p className={styles.content_text}>
                        {productObj.description}
                    </p>
                    <div className={styles.content_price_group}>
                        <span className={styles.sales_price} aria-label='Sales price'>{new Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency: productObj.pricing.currency,
                        }).format(productObj.pricing.sale)}</span>
                        {productObj.pricing.sale < productObj.pricing.regular &&
                        <>
                            <div className={styles.discount_container}>
                                <span className={styles.discount} aria-label='Discount'>{productObj.pricing.discount.toFixed(0)}%</span>
                            </div>
                        
                            <span className={styles.regular_price} aria-label='Regular price' >{new Intl.NumberFormat('en-US', {
                                style: 'currency',
                                currency: productObj.pricing.currency,
                            }).format(productObj.pricing.regular)}</span>
                        </>
                        }
                    </div>
                    <div className={styles.cart_group}>
                        <div className={styles.content_quantity_selector} aria-label='Select the number of sneakers you want to purchase'>
                            <button className={`${styles.button} ${styles.minus_button}`} aria-label='Remove one pair of sneakers'
                                onClick={() => handleQuantity('-')}>
                                <img src={iconMinus} alt="minus" aria-hidden='true'/>
                            </button>
                            <span className={styles.counter_text} aria-label='Number of sneakers selected'>{quantityCount}</span>
                            <button className={`${styles.button} ${styles.plus_button}`} aria-label='add one pair of sneakers'
                                onClick={() => handleQuantity('+')}>
                                <img src={iconPlus} alt="plus" aria-hidden='true'/>
                            </button>
                        </div>
                        <button className={styles.add_to_cart}
                            onClick={() => {
                                quantityCount > 0 && handleAddToCart(productObj, quantityCount); setQuantityCount(0);}}>
                            <img src={iconCart} alt="add to cart" aria-hidden='true' />
                            Add to cart
                        </button>
                    </div>
                </div>
            </div>
      </section>
    )
}

export default Product