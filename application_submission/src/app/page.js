import Link from 'next/link'
import 'server-only'

import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
     <div> This is a simpla web application i have created using Next.js with 2 main usecases. 
      <br/>
      Usecase 1: Submit Application
      <br/>
      Usecase 2: View Application Status
     </div>
     <Link href='./submit_application'>
      <button className={styles.homeButton} > Submit Application </button>
     </Link>

     <Link href='./view_status'>
      <button className={styles.homeButton} > View Application Status </button>
     </Link>
     
     
    </main>
  )
}
