import Link from "next/link";
export default function NotFound() {
  return (
    <main className="empty">
      <h1>This page has slipped away.</h1>
      <p>Find a little something on the homepage instead.</p>
      <Link className="button" href="/">
        Back to Megan Beauty
      </Link>
    </main>
  );
}
