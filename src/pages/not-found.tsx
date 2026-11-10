import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <section className="empty">
      <h1>This page has slipped away.</h1>
      <p>Find a little something on the homepage instead.</p>
      <Link className="button" to="/">
        Back to Megan Beauty
      </Link>
    </section>
  );
}
