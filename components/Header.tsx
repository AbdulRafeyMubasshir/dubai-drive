import Link from "next/link";

export default function Header() {
  return (
    <header>
      <div className="container header-content">
        <Link href="/" className="logo">
          Dubai Drive
        </Link>
        <nav>
          <Link href="/cars">Cars</Link>
          <Link href="/offers">Offers</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </div>
    </header>
  );
}