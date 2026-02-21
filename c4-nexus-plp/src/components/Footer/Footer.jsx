import styles from './Footer.module.css'

const footerLinks = [
  { label: 'Terms & Conditions', href: '#' },
  { label: 'Privacy Policy',     href: '#' },
  { label: 'Contact Us',         href: '#' },
]

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <span className={styles.logo}>Nexus<span>Store</span></span>

        <nav className={styles.links}>
          {footerLinks.map(link => (
            <a key={link.label} href={link.href} className={styles.link}>
              {link.label}
            </a>
          ))}
        </nav>

        <p className={styles.copy}>© {new Date().getFullYear()} Nexus Store</p>
      </div>
    </footer>
  )
}
