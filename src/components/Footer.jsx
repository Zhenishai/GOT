export default function Footer() {
  return (
    <footer className="footer">
      <p>
        Data provided by{" "}
        <a
          href="https://www.tvmaze.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          TVMaze
        </a>
      </p>

      <p className="footer-copy">
        © {new Date().getFullYear()} Zheni
      </p>
    </footer>
  );
}
