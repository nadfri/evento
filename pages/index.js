import Head from 'next/head'
import styles from './index.module.scss'

export default function Index() {
  return (
    <div className={styles.Index}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Home</h1>

   
    </div>
  )
}
