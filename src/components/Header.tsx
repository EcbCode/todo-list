import styles from './Header.module.css'
import image from '../assets/rocket.svg'

export function Header(){
    return (
        <>
            <header className={styles.header}>
                <img src={image} alt=''/>

                <div className={styles.siteName}>
                    <span className={styles.to}>to</span>
                    <span className={styles.do}>do</span>
                </div>
            </header>
        </>
    )
}