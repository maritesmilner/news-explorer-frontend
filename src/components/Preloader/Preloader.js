import "./Preloader.css"

export default function Preloader() {
  return (
    <section id="preloader">
      <div className="preloader">
        <i className="preloader__circle"></i>
        <p className="preloader__text">Searching for news...</p>
      </div>
    </section>
  );
}
