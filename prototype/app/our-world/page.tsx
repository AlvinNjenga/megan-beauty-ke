import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, ChevronRight } from "lucide-react";
import { founderStory as story } from "../../data/founder-story";
import styles from "./our-world.module.css";

export const metadata: Metadata = {
  title: "Our World | The story behind Megan Beauty",
  description:
    "An illustrative founder story about a teenage love of beauty and jewellery, and the ambition to make personal style accessible to everyone.",
};

export default function OurWorldPage() {
  return (
    <article className={styles.page}>
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <ChevronRight size={14} />
        <span aria-current="page">Our world</span>
      </nav>
      <p className={styles.previewNote}>
        Story preview: illustrative founder copy and temporary photographs,
        ready to replace with her real story.
      </p>
      <header className={styles.hero}>
        <div className={styles.heroCopy}>
          <h1>
            {story.headline.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h1>
          <p>{story.introduction}</p>
          <a className="text-link" href="#founder-story">
            Read her story <ArrowDown size={19} />
          </a>
        </div>
        <div className={styles.coverImages}>
          <figure className={styles.portrait}>
            <img
              src={story.images.portrait.src}
              alt={story.images.portrait.alt}
              width={1200}
              height={1500}
              fetchPriority="high"
            />
            <figcaption>{story.images.portrait.caption}</figcaption>
          </figure>
          <figure className={styles.beautyInset}>
            <img
              src={story.images.beauty.src}
              alt={story.images.beauty.alt}
              width={400}
              height={400}
            />
            <figcaption>It started with getting ready.</figcaption>
          </figure>
        </div>
      </header>
      <section
        className={styles.origin}
        id="founder-story"
        aria-labelledby="origin-heading"
      >
        <div className={styles.stillLife}>
          <figure>
            <img
              src={story.images.jewellery.src}
              alt={story.images.jewellery.alt}
              width={800}
              height={1000}
              loading="lazy"
            />
            <figcaption>{story.images.jewellery.caption}</figcaption>
          </figure>
        </div>
        <div className={styles.readingColumn}>
          <h2 id="origin-heading">A love of the little details.</h2>
          {story.origin.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>
      <section className={styles.belief} aria-labelledby="belief-heading">
        <h2 id="belief-heading">
          Style is personal.
          <br />
          Let’s keep it within reach.
        </h2>
        <p>
          The ambition was simple: bring the beauty and jewellery she loved into
          one welcoming space, with affordable discovery at its heart.
        </p>
      </section>
      <section className={styles.founderNote} aria-labelledby="note-heading">
        <div className={styles.noteTitle}>
          <h2 id="note-heading">
            A note from
            <br />
            our founder.
          </h2>
          <p>Draft founder’s note for this design preview.</p>
        </div>
        <div className={styles.letter}>
          {story.note.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <p className={styles.signoff}>
            With love,
            <br />
            The Megan Beauty founder
          </p>
        </div>
      </section>
      <section
        className={styles.invitation}
        aria-labelledby="invitation-heading"
      >
        <div>
          <h2 id="invitation-heading">Come find your kind of lovely.</h2>
          <p>
            A beauty find. A finishing touch. A little something that feels like
            you.
          </p>
        </div>
        <div className={styles.shoppingLinks}>
          <Link className="button" href="/collections/beauty">
            Explore beauty <ArrowUpRight size={20} />
          </Link>
          <Link className="button outline" href="/collections/jewellery">
            Explore jewellery <ArrowUpRight size={20} />
          </Link>
        </div>
      </section>
    </article>
  );
}
