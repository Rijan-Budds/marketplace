function Home() {
    return (
      <div style={{ padding: '1rem' }}>
        <header>
          <h1>My Marketplace</h1>
          <nav>
            <a href="/">Home</a> | 
            <a href="/login">Login</a> | 
            <a href="/register">Register</a>
          </nav>
        </header>
  
        <section style={{ marginTop: '2rem' }}>
          <h2>Welcome!</h2>
          <p>Buy and sell used items in your local area with ease.</p>
          <button onClick={() => window.location.href = "/marketplace"}>Browse Items</button>
        </section>
  
        <section style={{ marginTop: '3rem' }}>
          <h3>Sample Listings</h3>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <div>
              <img src="https://via.placeholder.com/150" alt="item" />
              <p>iPhone 12 - ₹45,000</p>
            </div>
            <div>
              <img src="https://via.placeholder.com/150" alt="item" />
              <p>Wooden Table - ₹2,000</p>
            </div>
          </div>
        </section>
  
        <footer style={{ marginTop: '3rem' }}>
          <p>© 2025 My Marketplace. All rights reserved.</p>
        </footer>
      </div>
    );
  }
  
  export default Home;
  