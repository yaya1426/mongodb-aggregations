import { useEffect, useMemo, useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";

async function apiGet(path) {
  const response = await fetch(`${API_BASE_URL}${path}`);

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return response.json();
}

function formatPrice(price) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD"
  }).format(price);
}

function Rating({ value, count }) {
  return (
    <span className="rating">
      <span aria-hidden="true">★</span> {value || 0}
      <span className="muted"> ({count || 0})</span>
    </span>
  );
}

function BookCard({ book, onSelect }) {
  return (
    <button className="book-card" type="button" onClick={() => onSelect(book._id)}>
      <div className="cover" aria-hidden="true">
        {book.genre?.slice(0, 2).toUpperCase()}
      </div>
      <div className="book-card-content">
        <p className="eyebrow">{book.genre}</p>
        <h3>{book.title}</h3>
        {book.subtitle ? <p className="muted">{book.subtitle}</p> : null}
        {book.authors?.length ? (
          <p className="authors">By {book.authors.map((author) => author.name).join(", ")}</p>
        ) : null}
        <div className="book-meta">
          {typeof book.price === "number" ? <strong>{formatPrice(book.price)}</strong> : null}
          <Rating value={book.averageRating} count={book.reviewCount} />
        </div>
      </div>
    </button>
  );
}

function Section({ title, subtitle, children }) {
  return (
    <section className="section">
      <div className="section-heading">
        <h2>{title}</h2>
        {subtitle ? <p>{subtitle}</p> : null}
      </div>
      {children}
    </section>
  );
}

function StatCard({ label, value, hint }) {
  return (
    <div className="stat-card">
      <span>{label}</span>
      <strong>{value}</strong>
      {hint ? <small>{hint}</small> : null}
    </div>
  );
}

function App() {
  const [homepage, setHomepage] = useState(null);
  const [genres, setGenres] = useState([]);
  const [books, setBooks] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookLoading, setBookLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadInitialData() {
      try {
        setLoading(true);
        const [homepageResult, genreResult] = await Promise.all([
          apiGet("/homepage"),
          apiGet("/genres/stats")
        ]);

        setHomepage(homepageResult);
        setGenres(genreResult.genres || []);
      } catch (err) {
        setError("Could not load data. Make sure lesson 11 API is running on port 3000.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadInitialData();
  }, []);

  useEffect(() => {
    async function loadBooks() {
      try {
        const query = selectedGenre ? `?genre=${encodeURIComponent(selectedGenre)}` : "";
        const result = await apiGet(`/books${query}`);
        setBooks(result.books || []);
      } catch (err) {
        setError("Could not load books from the API.");
        console.error(err);
      }
    }

    loadBooks();
  }, [selectedGenre]);

  async function selectBook(bookId) {
    try {
      setBookLoading(true);
      const result = await apiGet(`/books/${bookId}`);
      setSelectedBook(result.book);
    } catch (err) {
      setError("Could not load the selected book.");
      console.error(err);
    } finally {
      setBookLoading(false);
    }
  }

  const totalAvailableBooks = useMemo(
    () => genres.reduce((total, genre) => total + genre.availableBooks, 0),
    [genres]
  );

  if (loading) {
    return (
      <main className="app-shell">
        <div className="loading-panel">Loading the library...</div>
      </main>
    );
  }

  return (
    <main className="app-shell">
      <header className="hero">
        <nav className="nav">
          <span className="logo">Library Atlas</span>
          <a href="#books">Browse Books</a>
        </nav>

        <div className="hero-grid">
          <div>
            <p className="eyebrow">MongoDB Aggregation Demo</p>
            <h1>Explore books powered by aggregation pipelines.</h1>
            <p className="hero-copy">
              This frontend visualizes the data returned by the lesson 11 API:
              homepage facets, joined authors, grouped genres, and calculated ratings.
            </p>
            <div className="hero-actions">
              <a className="primary-link" href="#books">
                Browse the catalog
              </a>
              <span className="endpoint-pill">GET /homepage</span>
            </div>
          </div>

          <div className="hero-card">
            <p className="eyebrow">Live API Summary</p>
            <div className="stats-grid">
              <StatCard label="Genres" value={genres.length} hint="from $group" />
              <StatCard label="Available" value={totalAvailableBooks} hint="from $sum" />
              <StatCard
                label="Featured"
                value={homepage?.featuredBooks?.length || 0}
                hint="from $facet"
              />
            </div>
          </div>
        </div>
      </header>

      {error ? <div className="error-banner">{error}</div> : null}

      <Section title="Homepage Sections" subtitle="One API call returns these sections with $facet.">
        <div className="homepage-grid">
          <div>
            <h3>Featured Books</h3>
            <div className="mini-list">
              {(homepage?.featuredBooks || []).map((book) => (
                <BookCard key={book._id} book={book} onSelect={selectBook} />
              ))}
            </div>
          </div>

          <div>
            <h3>Top Rated</h3>
            <div className="mini-list">
              {(homepage?.topRated || []).map((book) => (
                <BookCard key={book._id} book={book} onSelect={selectBook} />
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section title="Genre Stats" subtitle="These cards come from a $group pipeline.">
        <div className="genre-grid">
          {genres.map((genre) => (
            <button
              className={`genre-card ${selectedGenre === genre.genre ? "active" : ""}`}
              key={genre.genre}
              type="button"
              onClick={() => setSelectedGenre(genre.genre === selectedGenre ? "" : genre.genre)}
            >
              <span>{genre.genre}</span>
              <strong>{genre.bookCount} books</strong>
              <small>{genre.availableBooks} available</small>
            </button>
          ))}
        </div>
      </Section>

      <Section
        title="Browse Books"
        subtitle="Book cards use $lookup for authors and calculated review ratings."
      >
        <div className="catalog-toolbar" id="books">
          <p>
            {selectedGenre ? (
              <>
                Filtering by <strong>{selectedGenre}</strong>
              </>
            ) : (
              "Showing all available books"
            )}
          </p>
          {selectedGenre ? (
            <button className="text-button" type="button" onClick={() => setSelectedGenre("")}>
              Clear filter
            </button>
          ) : null}
        </div>

        <div className="catalog-grid">
          {books.map((book) => (
            <BookCard key={book._id} book={book} onSelect={selectBook} />
          ))}
        </div>
      </Section>

      <aside className={`drawer ${selectedBook ? "open" : ""}`} aria-hidden={!selectedBook}>
        <div className="drawer-panel">
          <button className="close-button" type="button" onClick={() => setSelectedBook(null)}>
            Close
          </button>

          {bookLoading ? (
            <p>Loading book...</p>
          ) : selectedBook ? (
            <>
              <p className="eyebrow">{selectedBook.genre}</p>
              <h2>{selectedBook.title}</h2>
              <p className="muted">{selectedBook.subtitle}</p>
              <p>{selectedBook.description}</p>

              <div className="detail-list">
                <span>Authors</span>
                <strong>{selectedBook.authors?.map((author) => author.name).join(", ")}</strong>
                <span>Rating</span>
                <strong>
                  {selectedBook.averageRating} from {selectedBook.reviewCount} reviews
                </strong>
                <span>Price</span>
                <strong>{formatPrice(selectedBook.price)}</strong>
                <span>Published</span>
                <strong>{selectedBook.publishedYear}</strong>
              </div>

              <div className="tag-row">
                {selectedBook.tags?.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </>
          ) : null}
        </div>
      </aside>
    </main>
  );
}

export default App;
