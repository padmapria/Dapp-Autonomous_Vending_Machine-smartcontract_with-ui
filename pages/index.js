import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import 'bulma/css/bulma.min.css';

export default function Home() {
  return (
    <>
      <div className={styles.container}  style={{ 
        backgroundImage: `url("https://images.unsplash.com/photo-1617396900799-f4ec2b43c7ae?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80")`,  
        backgroundSize: '100% 100%',   backgroundRepeat:'no-repeat'}}>
        
        <div>
          <main className={styles.main}>
            <h2 className={styles.title} >
              Vending Maching Dapp
            </h2>

            <div className={styles.imagewrap}>
              <Image className={styles.myImg} src="/gvm.jpg" width={168} height={301} />
            </div>

            <p className={styles.description}>
              purchase and leave a review
            </p>
          </main>
        </div>
      </div>
      </>
  )
}
