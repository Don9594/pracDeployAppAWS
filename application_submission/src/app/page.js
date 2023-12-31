import Link from 'next/link'
import 'server-only'
import styles from './page.module.css'



export default function Home() {
  return (
    <main className={styles.main}>
     <div className={styles.buttonBar}>
      <Link href='./submit_application'>
        <button className="appButton"> Submit Application </button>
      </Link>

      <Link href='./view_status'>
        <button className="appButton" > View Application Status</button>
      </Link>
     </div>
    </main>
  )
}
