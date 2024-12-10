import "./AboutPage.css";

function AboutPage() {
  return (
    <div className="about-page">
      <header className="about-header">
        
        <p>
          Our web application is designed to simplify the management of art galleries, enabling seamless operations for 
          artworks and artists.
        </p>
      </header>

      <section className="about-section">
        <div className="about-card">
          <h2>Core Features</h2>
          <p>
            - Manage artwork details including title, artist, year, price, and imageUrl. <br />
            - Maintain artist profiles with information such as name, bio, and birth year. <br />
            - Perform CRUD operations (Create, Read, Update, Delete) for artworks and CR (Create,Read) for artists.
          </p>
        </div>

        <div className="about-card">
          <h2>Data Models</h2>
          <p>
            <strong>Artworks:</strong> Includes fields like ID, Title, Artist (linked to the artist model), Year, Price,
            and imageUrl. <br />
            <strong>Artists:</strong> Includes fields like ID, Name, Bio, and Birth Year.
          </p>
        </div>

        <div className="about-card">
          <h2>How It Works</h2>
          <p>
            Our app enables gallery owners to effortlessly manage their collections. Add, update, or remove artworks 
            and artists, ensuring your gallery stays organized and up-to-date.
          </p>
        </div>
      </section>

      <footer className="about-footer">
        <h2>Why Choose Us?</h2>
        <p>
          Whether you're a small gallery or a large museum, our application offers an intuitive interface for managing 
          artworks and artists efficiently.
        </p>
      </footer>
    </div>
  );
}

export default AboutPage;
