import styles from '../lightbox/Lightbox.module.css'
import iconClose from '../../assets/icon-close.svg'
import iconPrevious from '../../assets/icon-previous.svg'
import iconNext from '../../assets/icon-next.svg'
import { useReducer } from 'react'
import { indexReducer } from '../../functions/Reducers.jsx'
import { handlePrev, handleNext, handleMatch } from '../../functions/ImgDisplays.jsx'

function Lightbox({productObj, setLightboxView}) {
    const [currentIndex, dispatch] = useReducer(indexReducer, (0));
    
    return(
        <section className={styles.lightbox}>
            <div className={styles.section_container}>
                <div className={styles.close_button_container}>
                    <button className={styles.close_button} aria-label='Close the lightbox'
                        onClick={() => setLightboxView(false)}>
                        <img src={iconClose} alt="close button" aria-hidden='true' />
                    </button>
                </div>

                <div className={styles.section_images}>
                    <div className={styles.product_image_main_container}>
                        <img src={productObj.images.full[currentIndex]} alt="sneaker image"/>
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
            </div>
        </section>
    )
}

export default Lightbox