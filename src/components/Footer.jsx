export default function Footer({ content }) {
  return (
    <footer>
      <p>{content.shortName} © {new Date().getFullYear()}</p>
      <p>{content.location} · {content.release}</p>
      <a href="#top">Back to signal ↑</a>
    </footer>
  )
}
