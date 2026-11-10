import { Link, useLocation } from "react-router-dom";
import {
  createContext,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import {
  Search,
  UserRound,
  ShoppingBag,
  Menu,
  X,
  ChevronDown,
  Plus,
  Minus,
  ArrowUpRight,
  Heart,
} from "lucide-react";
import {
  products,
  collections,
  img,
  money,
  type Product,
} from "../data/catalogue";

interface BasketLine {
  slug: string;
  variant: string;
  quantity: number;
}
interface StoreState {
  basket: BasketLine[];
  add: (p: Product, variant: string, quantity?: number) => void;
  update: (slug: string, variant: string, delta: number) => void;
  panel: string | null;
  setPanel: (value: string | null) => void;
  saved: string[];
  toggleSaved: (slug: string) => void;
}
const StoreContext = createContext<StoreState | null>(null);
export const useStore = () => {
  const value = useContext(StoreContext);
  if (!value) throw new Error("Store provider is missing");
  return value;
};
export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [basket, setBasket] = useState<BasketLine[]>([]);
  const [panel, setPanel] = useState<string | null>(null);
  const [saved, setSaved] = useState<string[]>([]);
  function add(p: Product, variant: string, quantity = 1) {
    if (
      !p.variants.includes(variant) ||
      !Number.isInteger(quantity) ||
      quantity < 1
    )
      return;
    setBasket((old) => {
      const found = old.find((x) => x.slug === p.slug && x.variant === variant);
      return found
        ? old.map((x) =>
            x === found ? { ...x, quantity: x.quantity + quantity } : x,
          )
        : [...old, { slug: p.slug, variant, quantity }];
    });
    setPanel("bag");
  }
  function update(slug: string, variant: string, delta: number) {
    setBasket((old) =>
      old
        .map((x) =>
          x.slug === slug && x.variant === variant
            ? { ...x, quantity: x.quantity + delta }
            : x,
        )
        .filter((x) => x.quantity > 0),
    );
  }
  return (
    <StoreContext.Provider
      value={{
        basket,
        add,
        update,
        panel,
        setPanel,
        saved,
        toggleSaved: (slug) =>
          setSaved((old) =>
            old.includes(slug) ? old.filter((s) => s !== slug) : [...old, slug],
          ),
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}
export function Logo() {
  return (
    <span className="logo-crop">
      <img
        src={`${import.meta.env.BASE_URL}images/mb-logo-white.png`}
        alt="Megan Beauty"
        width="6250"
        height="6250"
      />
    </span>
  );
}
export function StoreShell({ children }: { children: React.ReactNode }) {
  const { basket, saved, setPanel } = useStore();
  const [mega, setMega] = useState<string | null>(null);
  const { key } = useLocation();
  useEffect(() => {
    setMega(null);
    setPanel(null);
  }, [key, setPanel]);
  useEffect(() => {
    if (!mega) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMega(null);
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [mega]);
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <div className="announcement">
        <span>A little beauty. A little sparkle. A lot of you.</span>
        <Link to="/collections/new-in">
          Discover the new-in edit <ArrowUpRight size={13} />
        </Link>
      </div>
      <header className="header">
        <div className="header-main">
          <button
            className="icon-button mobile-only"
            aria-label="Open navigation"
            onClick={() => setPanel("menu")}
          >
            <Menu />
          </button>
          <button className="search-trigger" onClick={() => setPanel("search")}>
            <Search size={19} />
            <span>Find your next favourite</span>
          </button>
          <Link className="brand" to="/" aria-label="Megan Beauty home">
            <Logo />
          </Link>
          <div className="header-actions">
            <button
              className="icon-button saved-trigger"
              aria-label={`Saved edit, ${saved.length} items`}
              onClick={() => setPanel("saved")}
            >
              <Heart />
              {saved.length > 0 && (
                <span className="saved-count">{saved.length}</span>
              )}
            </button>
            <button
              className="icon-button account-button"
              aria-label="Account"
              onClick={() => setPanel("account")}
            >
              <UserRound />
            </button>
            <button
              className="icon-button"
              aria-label={`Shopping bag, ${basket.reduce((sum, x) => sum + x.quantity, 0)} items`}
              onClick={() => setPanel("bag")}
            >
              <ShoppingBag />
              <span className="bag-count">
                {basket.reduce((sum, x) => sum + x.quantity, 0)}
              </span>
            </button>
          </div>
        </div>
        <nav className="desktop-nav" aria-label="Main navigation">
          <Link to="/collections/new-in">New in</Link>
          {["Beauty", "Jewellery"].map((name) => (
            <button
              key={name}
              aria-expanded={mega === name}
              aria-controls="mega-menu"
              onClick={() => setMega(mega === name ? null : name)}
            >
              {name}
              <ChevronDown size={13} />
            </button>
          ))}
          <Link to="/collections/bestsellers">Bestsellers</Link>
          <Link to="/collections/accessories">Accessories</Link>
          <Link to="/#the-edit">The Megan edit</Link>
          <Link to="/our-world">Our world</Link>
        </nav>
        {mega && (
          <div id="mega-menu" className="mega-menu">
            <div>
              <h2>{mega}, your way.</h2>
              <Link
                className="text-link"
                to={`/collections/${mega.toLowerCase()}`}
              >
                Explore all {mega.toLowerCase()} <ArrowUpRight size={16} />
              </Link>
            </div>
            <div className="mega-links">
              {(mega === "Beauty"
                ? ["Beauty", "Skincare", "New in"]
                : ["Jewellery", "Earrings", "Necklaces"]
              ).map((n) => (
                <Link
                  key={n}
                  to={`/collections/${n.toLowerCase().replace(" ", "-")}`}
                >
                  {n}
                </Link>
              ))}
            </div>
            <Link className="mega-feature" to="/collections/new-in">
              <img
                src={img(mega === "Beauty" ? "lips" : "earrings")}
                alt="Temporary collection inspiration"
              />
              <span>
                Meet your next favourite <ArrowUpRight size={16} />
              </span>
            </Link>
            <button
              className="icon-button mega-close"
              aria-label="Close menu"
              onClick={() => setMega(null)}
            >
              <X />
            </button>
          </div>
        )}
      </header>
      <main id="main-content">{children}</main>
      <Footer />
      <Panels />
    </>
  );
}
export function ProductCard({ product }: { product: Product }) {
  const { add, saved, toggleSaved } = useStore();
  const [choosing, setChoosing] = useState(false);
  const [option, setOption] = useState<string | null>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const optionsId = useId();
  const hasOptions = product.variants.length > 1;
  function closeOptions() {
    setChoosing(false);
    setOption(null);
    trigger.current?.focus();
  }
  return (
    <article className="product-card">
      <div className="product-photo">
        <Link to={`/products/${product.slug}`}>
          <img
            src={img(product.image)}
            alt={`${product.name}, temporary reference photography`}
            loading="lazy"
            width="600"
            height="750"
          />
        </Link>
        {product.isNew && <span className="badge">New in</span>}
        <button
          className={`save-button ${saved.includes(product.slug) ? "is-saved" : ""}`}
          aria-label={`${saved.includes(product.slug) ? "Unsave" : "Save"} ${product.name}`}
          aria-pressed={saved.includes(product.slug)}
          onClick={() => toggleSaved(product.slug)}
        >
          <Heart size={18} />
        </button>
        <button
          ref={trigger}
          className="quick-add"
          aria-expanded={hasOptions ? choosing : undefined}
          aria-controls={choosing ? optionsId : undefined}
          onClick={() => {
            if (hasOptions) {
              setChoosing(!choosing);
              setOption(null);
            } else add(product, product.variants[0]);
          }}
        >
          {hasOptions
            ? choosing
              ? "Close options"
              : "Choose options"
            : "Quick add"}{" "}
          {choosing ? <Minus size={16} /> : <Plus size={16} />}
        </button>
      </div>
      <div className="product-meta">
        <span>{product.type}</span>
        <span>{product.variants.length} options</span>
      </div>
      <div className="product-title">
        <Link to={`/products/${product.slug}`}>{product.name}</Link>
        <span>{money(product.price)}</span>
      </div>
      {choosing && (
        <fieldset
          className="card-options"
          id={optionsId}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              e.stopPropagation();
              closeOptions();
            }
          }}
        >
          <legend>Choose an option for {product.name}</legend>
          <div className="card-option-buttons">
            {product.variants.map((v) => (
              <button
                key={v}
                aria-pressed={option === v}
                onClick={() => setOption(v)}
              >
                {v}
              </button>
            ))}
          </div>
          <button
            className="button full"
            disabled={!option}
            onClick={() => {
              if (!option) return;
              add(product, option);
              setChoosing(false);
              setOption(null);
            }}
          >
            Add to demo bag
          </button>
        </fieldset>
      )}
    </article>
  );
}
export function ProductRail({
  title,
  description,
  items,
  href,
}: {
  title: string;
  description: string;
  items: Product[];
  href: string;
}) {
  const rail = useRef<HTMLDivElement>(null);
  return (
    <section className="section">
      <div className="section-heading">
        <div>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <div className="rail-actions">
          <Link className="text-link" to={href}>
            Shop the edit <ArrowUpRight size={16} />
          </Link>
          <button
            className="round-button"
            aria-label={`Previous ${title}`}
            onClick={() =>
              rail.current?.scrollBy({ left: -350, behavior: "auto" })
            }
          >
            ‹
          </button>
          <button
            className="round-button"
            aria-label={`Next ${title}`}
            onClick={() =>
              rail.current?.scrollBy({ left: 350, behavior: "auto" })
            }
          >
            ›
          </button>
        </div>
      </div>
      <div className="product-rail" ref={rail}>
        {items.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
      <p className="sample-caption">
        Sample catalogue and prices. Reference photography.
      </p>
    </section>
  );
}
function Footer() {
  const { setPanel } = useStore();
  const [subscribed, setSubscribed] = useState(false);
  return (
    <>
      <section className="newsletter">
        <div>
          <h2>Let’s keep in touch.</h2>
          <p>
            Beauty discoveries, new arrivals and a little inspiration for your
            inbox.
          </p>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSubscribed(true);
          }}
        >
          <label htmlFor="newsletter-email">Your email address</label>
          <div className="email-input">
            <input
              id="newsletter-email"
              type="email"
              required
              placeholder="You@example.com"
              disabled={subscribed}
            />
            <button type="submit" disabled={subscribed}>
              {subscribed ? "You’re on the list" : "Count me in"}
              <ArrowUpRight size={17} />
            </button>
          </div>
          <p role="status">
            {subscribed
              ? "Demo sign-up complete. Your email has not been saved or sent."
              : "Prototype form only. No emails are collected."}
          </p>
        </form>
      </section>
      <footer className="footer">
        <div className="footer-brand">
          <Logo />
          <p>
            Beauty, jewellery and the little things
            <br />
            that make a look yours.
          </p>
          <button className="text-link" onClick={() => setPanel("social")}>
            Instagram <ArrowUpRight size={14} />
          </button>
          <button
            className="text-link footer-saved"
            onClick={() => setPanel("saved")}
          >
            Your saved edit <Heart size={16} />
          </button>
        </div>
        <div>
          <h3>Find your favourites</h3>
          {collections.slice(0, 4).map((c) => (
            <Link key={c.slug} to={`/collections/${c.slug}`}>
              {c.name}
            </Link>
          ))}
        </div>
        <div>
          <h3>Here to help</h3>
          {["Contact us", "Delivery & returns", "FAQs", "Your account"].map(
            (s) => (
              <button
                key={s}
                onClick={() => setPanel(s === "Your account" ? "account" : s)}
              >
                {s}
              </button>
            ),
          )}
        </div>
        <div>
          <h3>A little about us</h3>
          <Link to="/our-world">Our world</Link>
          <Link to="/#the-edit">The Megan edit</Link>
          {["Privacy policy", "Terms & conditions"].map((s) => (
            <button key={s} onClick={() => setPanel(s)}>
              {s}
            </button>
          ))}
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} Megan Beauty. Design prototype.
          </span>
          <span>United Kingdom · GBP £</span>
          <span>All products and prices are demonstration content.</span>
        </div>
      </footer>
    </>
  );
}
function Panels() {
  const { panel, setPanel, basket, update, saved } = useStore();
  const dialog = useRef<HTMLDialogElement>(null);
  const [query, setQuery] = useState("");
  useEffect(() => {
    const el = dialog.current;
    if (panel) {
      if (!el?.open) el?.showModal();
      document.body.style.overflow = "hidden";
      const focusTarget =
        panel === "search"
          ? el?.querySelector<HTMLInputElement>(".search-input input")
          : el?.querySelector<HTMLHeadingElement>("#panel-heading");
      focusTarget?.focus({ preventScroll: true });
    } else {
      el?.close();
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [panel]);
  useEffect(() => {
    if (panel === "saved" && saved.length === 0) {
      dialog.current
        ?.querySelector<HTMLHeadingElement>("#panel-heading")
        ?.focus({ preventScroll: true });
    }
  }, [panel, saved.length]);
  const matches = products.filter((p) =>
    `${p.name} ${p.category} ${p.type}`
      .toLowerCase()
      .includes(query.toLowerCase()),
  );
  return (
    <dialog
      ref={dialog}
      className={`drawer ${panel === "search" ? "search-drawer" : ""}`}
      onCancel={() => setPanel(null)}
      onClick={(e) => {
        if (e.target === dialog.current) setPanel(null);
      }}
      aria-labelledby="panel-heading"
    >
      <div className="drawer-inner">
        <div className="drawer-heading">
          <h2 id="panel-heading" tabIndex={-1}>
            {panel === "bag"
              ? "Your bag"
              : panel === "menu"
                ? "Explore Megan"
                : panel === "search"
                  ? "Find a little something"
                  : panel === "account"
                    ? "Your Megan account"
                    : panel === "saved"
                      ? "Your saved edit"
                      : panel}
          </h2>
          <button
            className="icon-button"
            aria-label="Close panel"
            onClick={() => setPanel(null)}
          >
            <X />
          </button>
        </div>
        {panel === "menu" ? (
          <nav className="mobile-nav" aria-label="Mobile navigation">
            <button onClick={() => setPanel("search")}>
              Search products
            </button>
            <button onClick={() => setPanel("saved")}>
              Your saved edit ({saved.length})
            </button>
            {collections.map((c) => (
              <Link
                onClick={() => setPanel(null)}
                key={c.slug}
                to={`/collections/${c.slug}`}
              >
                {c.name}
                <ArrowUpRight size={20} />
              </Link>
            ))}
            <Link to="/our-world" onClick={() => setPanel(null)}>
              Our world
            </Link>
            <button onClick={() => setPanel("account")}>Your account</button>
          </nav>
        ) : panel === "search" ? (
          <>
            <label className="search-input">
              <Search size={22} />
              <input
                aria-label="Search products"
                placeholder="Try earrings, gloss, skincare…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </label>
            <p>
              {query
                ? `${matches.length} matching sample products`
                : "A few things you might love"}
            </p>
            <div className="search-results">
              {matches.map((p) => (
                <Link
                  key={p.slug}
                  to={`/products/${p.slug}`}
                  onClick={() => setPanel(null)}
                >
                  <img src={img(p.image)} alt="" />
                  <span>
                    {p.name}
                    <small>{p.type}</small>
                  </span>
                  <b>{money(p.price)}</b>
                </Link>
              ))}
            </div>
            {matches.length === 0 && (
              <p>
                Try “beauty” or “jewellery”, or explore our{" "}
                <Link to="/collections/new-in" onClick={() => setPanel(null)}>
                  new-in edit
                </Link>
                .
              </p>
            )}
          </>
        ) : panel === "saved" ? (
          <>
            <p className="demo-note" role="status">
              {saved.length} {saved.length === 1 ? "favourite" : "favourites"}{" "}
              saved for this visit. Refreshing clears this edit.
            </p>
            {saved.length === 0 ? (
              <div className="empty">
                <Heart size={40} />
                <h3>Make room for your favourites.</h3>
                <p>
                  Tap a heart on any product to keep it here while you browse.
                </p>
                <Link
                  className="button"
                  to="/collections/new-in"
                  onClick={() => setPanel(null)}
                >
                  Explore new in
                </Link>
              </div>
            ) : (
              <div className="saved-grid">
                {products
                  .filter((p) => saved.includes(p.slug))
                  .map((p) => (
                    <ProductCard key={p.slug} product={p} />
                  ))}
              </div>
            )}
          </>
        ) : panel === "bag" ? (
          <>
            <p className="demo-note">
              Your demonstration bag. No payments or orders.
            </p>
            {basket.length === 0 ? (
              <div className="empty">
                <ShoppingBag size={40} />
                <h3>A little room for something lovely.</h3>
                <p>Your bag is empty. Discover the new-in edit.</p>
                <Link
                  className="button"
                  to="/collections/new-in"
                  onClick={() => setPanel(null)}
                >
                  Explore new in
                </Link>
              </div>
            ) : (
              <>
                <div className="bag-lines">
                  {basket.map((line) => {
                    const p = products.find((p) => p.slug === line.slug)!;
                    return (
                      <div
                        className="bag-line"
                        key={`${line.slug}-${line.variant}`}
                      >
                        <Link
                          to={`/products/${p.slug}`}
                          onClick={() => setPanel(null)}
                        >
                          <img src={img(p.image)} alt={p.name} />
                        </Link>
                        <div>
                          <Link
                            to={`/products/${p.slug}`}
                            onClick={() => setPanel(null)}
                          >
                            {p.name}
                          </Link>
                          <p>
                            {line.variant} · {money(p.price)}
                          </p>
                          <div className="quantity">
                            <button
                              aria-label={`Decrease ${p.name} quantity`}
                              onClick={() =>
                                update(line.slug, line.variant, -1)
                              }
                            >
                              <Minus size={14} />
                            </button>
                            <span>{line.quantity}</span>
                            <button
                              aria-label={`Increase ${p.name} quantity`}
                              onClick={() => update(line.slug, line.variant, 1)}
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                        </div>
                        <b>{money(p.price * line.quantity)}</b>
                      </div>
                    );
                  })}
                </div>
                <div className="bag-total">
                  <span>Subtotal</span>
                  <b>
                    {money(
                      basket.reduce(
                        (sum, l) =>
                          sum +
                          products.find((p) => p.slug === l.slug)!.price *
                            l.quantity,
                        0,
                      ),
                    )}
                  </b>
                </div>
                <p>
                  Delivery and returns information will be added before launch.
                </p>
                <button
                  className="button full"
                  onClick={() => setPanel("Checkout preview")}
                >
                  Preview checkout
                </button>
              </>
            )}
          </>
        ) : (
          <div className="info-panel">
            <h3>
              {panel === "account"
                ? "Your favourites, all together."
                : panel === "Checkout preview"
                  ? "Your look is coming together."
                  : "We’re putting the details together."}
            </h3>
            <p>
              {panel === "account"
                ? "Account sign-in will be available in the commerce phase. Your saved edit is ready to use during this visit."
                : panel === "Checkout preview"
                  ? "This is the end of the shopping demonstration. Checkout, delivery selection and payment will be designed after the visual direction is approved. No order has been placed."
                  : panel === "social"
                    ? "Campaign and community images currently show photography inspiration. Official social links will be added when supplied."
                    : "This information is awaiting confirmed business details. No delivery promises, returns policies, contact information or legal terms have been assumed."}
            </p>
            {panel === "account" && (
              <button className="button full" onClick={() => setPanel("saved")}>
                Open your saved edit <Heart size={18} />
              </button>
            )}
            <button className="button" onClick={() => setPanel(null)}>
              Keep exploring
            </button>
          </div>
        )}
      </div>
    </dialog>
  );
}
