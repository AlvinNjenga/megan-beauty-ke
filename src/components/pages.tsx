import { Link } from "react-router-dom";
import { useState } from "react";
import {
  ArrowUpRight,
  SlidersHorizontal,
  Plus,
  Minus,
  Heart,
  Sparkles,
  ChevronRight,
  X,
} from "lucide-react";
import {
  products,
  collections,
  collectionProducts,
  img,
  money,
  type Product,
} from "../data/catalogue";
import { ProductCard, ProductRail, useStore } from "./store";

export function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <h1>
            Beauty.
            <br />
            Sparkle.
            <br />
            All you.
          </h1>
          <p>
            For the getting-ready moments.
            <br />
            And everything that comes after.
          </p>
          <div className="hero-buttons">
            <Link className="button" to="/collections/beauty">
              Shop beauty <ArrowUpRight size={20} />
            </Link>
            <Link className="button outline" to="/collections/jewellery">
              Shop jewellery <ArrowUpRight size={20} />
            </Link>
          </div>
          <span className="hero-footnote">
            Your beauty shelf meets your jewellery box.
          </span>
        </div>
        <div className="hero-visual">
          <img
            className="hero-portrait"
            src={img("beauty")}
            alt="Editorial portrait inspiration for the Megan Beauty campaign"
            fetchPriority="high"
          />
          <Link className="hero-inset" to="/collections/jewellery">
            <img
              src={img("earrings")}
              alt="Earring detail, temporary jewellery photography"
            />
            <span>
              Finish with a little sparkle <ArrowUpRight size={18} />
            </span>
          </Link>
        </div>
      </section>
      <div className="discovery-strip">
        <Link to="/collections/beauty">Beauty for your mood</Link>
        <Sparkles size={20} />
        <Link to="/collections/jewellery">Jewellery for your everyday</Link>
        <Sparkles size={20} />
        <span>Little things. Big feelings.</span>
      </div>
      <section className="section categories">
        <div className="section-heading">
          <h2>What’s your mood?</h2>
          <Link className="text-link" to="/collections/new-in">
            Explore new in <ArrowUpRight size={20} />
          </Link>
        </div>
        <div className="category-grid">
          {[
            {
              name: "Beauty",
              slug: "beauty",
              image: "makeup",
              detail: "Your getting-ready favourites",
            },
            {
              name: "Jewellery",
              slug: "jewellery",
              image: "jewellery",
              detail: "The finishing touch",
            },
            {
              name: "Skincare",
              slug: "skincare",
              image: "skincare",
              detail: "A moment for yourself",
            },
            {
              name: "Earrings",
              slug: "earrings",
              image: "earrings",
              detail: "Find your new signature",
            },
          ].map((c) => (
            <Link
              className="category-tile"
              key={c.slug}
              to={`/collections/${c.slug}`}
            >
              <div>
                <img
                  src={img(c.image)}
                  alt={`${c.name} photography inspiration`}
                  loading="lazy"
                />
              </div>
              <h3>
                {c.name}
                <ArrowUpRight size={24} />
              </h3>
              <p>{c.detail}</p>
            </Link>
          ))}
        </div>
      </section>
      <ProductRail
        title="New in. On your radar."
        description="Fresh finds for your beauty shelf and jewellery box."
        items={products.filter((p) => p.isNew)}
        href="/collections/new-in"
      />
      <section className="pairing-edit" id="the-edit">
        <div className="pairing-copy">
          <h2>
            Make a pair.
            <br />
            Make it yours.
          </h2>
          <p>
            A pop of lip colour. A pendant catching the light. Pick your options
            and put your own finishing touches together.
          </p>
          <Link className="text-link" to="/collections/bestsellers">
            Explore the bestsellers <ArrowUpRight size={20} />
          </Link>
          <p className="sample-caption">
            The Megan edit. Sample pairing and reference photography.
          </p>
        </div>
        <div className="pairing-products">
          <ProductCard product={products[0]} />
          <ProductCard product={products[3]} />
        </div>
      </section>
      <ProductRail
        title="Bestsellers"
        description="An edit of everyday extras worth a second look."
        items={products
          .filter((p) => p.favourite)
          .slice()
          .reverse()}
        href="/collections/bestsellers"
      />
      <section className="story-note section" id="our-story">
        <h2>
          A beauty shelf.
          <br />A jewellery box.
          <br />
          One little world.
        </h2>
        <div>
          <p>
            Welcome to Megan Beauty. We bring beauty and jewellery into the same
            edit, so finding pieces to wear together feels easy.
          </p>
          <p>
            Explore a colour, try a pairing, or save a favourite for later in
            your visit. Your look is yours to put together.
          </p>
          <Link className="text-link" to="/our-world">
            Meet the girl behind the brand <ArrowUpRight size={20} />
          </Link>
        </div>
      </section>
    </>
  );
}

export function Collection({ slug }: { slug: string }) {
  const collection = collections.find((c) => c.slug === slug)!;
  const [sort, setSort] = useState("featured");
  const [type, setType] = useState("All");
  const [price, setPrice] = useState("all");
  const [filterOpen, setFilterOpen] = useState(false);
  const source = collectionProducts(slug);
  const types = Array.from(new Set(source.map((p) => p.type)));
  const items = source
    .filter(
      (p) =>
        (type === "All" || p.type === type) &&
        (price === "all" || p.price <= 20),
    )
    .sort((a, b) =>
      sort === "low"
        ? a.price - b.price
        : sort === "high"
          ? b.price - a.price
          : sort === "name"
            ? a.name.localeCompare(b.name)
            : 0,
    );
  return (
    <div className="collection-page">
      <div className="breadcrumbs">
        <Link to="/">Home</Link>
        <ChevronRight size={12} />
        <span>{collection.name}</span>
      </div>
      <section className="collection-intro">
        <div>
          <h1>{collection.name}</h1>
          <p>{collection.description}</p>
        </div>
        <img
          src={img(collection.image)}
          alt={`${collection.name} collection reference photography`}
        />
      </section>
      <nav className="collection-tabs" aria-label="Browse collections">
        {["beauty", "jewellery", "accessories", "new-in", "bestsellers"]
          .map((key) => collections.find((c) => c.slug === key)!)
          .map((c) => (
            <Link
              aria-current={slug === c.slug ? "page" : undefined}
              key={c.slug}
              to={`/collections/${c.slug}`}
            >
              {c.name}
            </Link>
          ))}
      </nav>
      <section className="section collection-products">
        <div className="collection-toolbar">
          <button
            className="filter-toggle"
            aria-expanded={filterOpen}
            onClick={() => setFilterOpen(!filterOpen)}
          >
            <SlidersHorizontal size={20} /> Filters
            {(type !== "All" || price !== "all") && (
              <span className="filter-count">
                {Number(type !== "All") + Number(price !== "all")}
              </span>
            )}
          </button>
          <span role="status">{items.length} sample products</span>
          <label>
            Sort by{" "}
            <select
              aria-label="Sort products"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="featured">Featured</option>
              <option value="low">Price: low to high</option>
              <option value="high">Price: high to low</option>
              <option value="name">Name: A to Z</option>
            </select>
          </label>
        </div>
        {filterOpen && (
          <div className="filters">
            <label>
              Product type
              <select value={type} onChange={(e) => setType(e.target.value)}>
                <option>All</option>
                {types.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </label>
            <label>
              Price
              <select value={price} onChange={(e) => setPrice(e.target.value)}>
                <option value="all">All prices</option>
                <option value="under20">£20 and under</option>
              </select>
            </label>
            <button
              className="text-link"
              onClick={() => {
                setType("All");
                setPrice("all");
              }}
            >
              Clear filters
            </button>
          </div>
        )}
        {(type !== "All" || price !== "all") && (
          <div className="applied-filters" aria-label="Applied filters">
            {type !== "All" && (
              <button
                onClick={() => setType("All")}
                aria-label={`Remove ${type} filter`}
              >
                {type}
                <X size={16} />
              </button>
            )}
            {price !== "all" && (
              <button
                onClick={() => setPrice("all")}
                aria-label="Remove £20 and under filter"
              >
                £20 and under
                <X size={16} />
              </button>
            )}
            <button
              className="clear-filters"
              onClick={() => {
                setType("All");
                setPrice("all");
              }}
            >
              Clear filters
            </button>
          </div>
        )}
        <div className="product-grid">
          {items.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
        {items.length === 0 && (
          <div className="empty">
            <h2>
              {source.length
                ? "No pieces in this edit just yet."
                : "Something lovely is coming."}
            </h2>
            <p>
              {source.length
                ? "Try clearing your filters to see the full collection."
                : "The accessories catalogue has not been supplied yet. Explore our beauty and jewellery edits in the meantime."}
            </p>
            {source.length ? (
              <button
                className="button"
                onClick={() => {
                  setType("All");
                  setPrice("all");
                }}
              >
                Clear filters
              </button>
            ) : (
              <Link className="button" to="/collections/new-in">
                Explore new in
              </Link>
            )}
          </div>
        )}
        <p className="sample-caption">
          Demonstration catalogue. Names, prices and options are illustrative;
          photographs are temporary references.
        </p>
      </section>
    </div>
  );
}

export function ProductDetail({ product }: { product: Product }) {
  const [variant, setVariant] = useState(product.variants[0]);
  const [quantity, setQuantity] = useState(1);
  const [active, setActive] = useState(product.image);
  const { add, saved, toggleSaved } = useStore();
  return (
    <>
      <div className="breadcrumbs">
        <Link to="/">Home</Link>
        <ChevronRight size={12} />
        <Link to={`/collections/${product.category.toLowerCase()}`}>
          {product.category}
        </Link>
        <ChevronRight size={12} />
        <span>{product.name}</span>
      </div>
      <section className="product-detail">
        <div className="product-gallery">
          <div className="gallery-main">
            <img
              src={img(active)}
              alt={`${product.name}, ${active === product.image ? "main" : "alternate"} reference view`}
            />
            <span className="badge">Reference photography</span>
          </div>
          <div className="gallery-thumbs">
            {[product.image, product.alternate].map((im, i) => (
              <button
                key={im}
                aria-label={`View product image ${i + 1}`}
                aria-pressed={active === im}
                onClick={() => setActive(im)}
              >
                <img src={img(im)} alt="" />
              </button>
            ))}
          </div>
        </div>
        <div className="product-info">
          <h1>{product.name}</h1>
          <p className="detail-price">{money(product.price)}</p>
          <p className="product-description">
            A little something for your{" "}
            {product.category === "Beauty" ? "beauty shelf" : "jewellery box"}.
            Explore how this piece could fit into your everyday edit.
          </p>
          <p className="demo-note">
            Sample product, price and options. Reference image may show a
            different item. Actual product details will be added with the
            confirmed catalogue.
          </p>
          <fieldset className="variants">
            <legend>
              Choose your option: <b>{variant}</b>
            </legend>
            {product.variants.map((v) => (
              <button
                key={v}
                onClick={() => setVariant(v)}
                className={variant === v ? "selected" : ""}
                aria-pressed={variant === v}
              >
                {v}
              </button>
            ))}
          </fieldset>
          <div className="buy-row">
            <div className="quantity">
              <button
                aria-label="Decrease quantity"
                disabled={quantity === 1}
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              >
                <Minus size={16} />
              </button>
              <span aria-live="polite">{quantity}</span>
              <button
                aria-label="Increase quantity"
                onClick={() => setQuantity((q) => q + 1)}
              >
                <Plus size={16} />
              </button>
            </div>
            <button
              className="button"
              onClick={() => add(product, variant, quantity)}
            >
              Add to demo bag <span>{money(product.price * quantity)}</span>
            </button>
            <button
              className={`icon-button detail-save ${saved.includes(product.slug) ? "is-saved" : ""}`}
              aria-label="Save product"
              aria-pressed={saved.includes(product.slug)}
              onClick={() => toggleSaved(product.slug)}
            >
              <Heart size={22} />
            </button>
          </div>
          <p className="purchase-note">
            A frontend preview. No order or payment will be taken.
          </p>
          <div className="product-accordions">
            <details open>
              <summary>A closer look</summary>
              <p>
                This layout previews the space for confirmed product
                descriptions, ingredients or jewellery materials, dimensions and
                care guidance. No product claims have been assumed.
              </p>
            </details>
            <details>
              <summary>Delivery & returns</summary>
              <p>
                Confirmed delivery charges, service areas and returns terms will
                be added before launch.
              </p>
            </details>
            <details>
              <summary>How to make it yours</summary>
              <p>
                Pair with another piece from the Megan edit and explore a look
                that feels like you. Product-specific care and usage
                instructions are pending.
              </p>
            </details>
          </div>
        </div>
      </section>
      <ProductRail
        title="A lovely little pairing"
        description="Beauty shelf, meet jewellery box."
        items={products
          .filter((p) => p.category !== product.category)
          .slice(0, 4)}
        href={`/collections/${product.category === "Beauty" ? "jewellery" : "beauty"}`}
      />
    </>
  );
}
