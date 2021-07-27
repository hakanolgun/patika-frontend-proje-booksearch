import "./App.css";
import { useState } from "react";
import axios from "axios";


//Kendime Not: Fetch edilen datanın her item'ı için aynı bilgiler bulunmayabiliyor.
//Bu nedenle ternary operatoru ile eğer o bilgi yoksa yerine başka birşey göstermek gerekebiliyor.

function App() {
  const [book, setBook] = useState("");
  const [result, setResult] = useState([]);
  const API_key = "AIzaSyB6l7GKBOZYikokIY2NyNFsOuN20jx6ugg";

  function handleChange(e) {
    const book = e.target.value;
    setBook(book);
  }

  function handleSubmit(e) {
    e.preventDefault();

    axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=${book}&key=${API_key}`
      )
      .then((data) => {
        console.log(data.data.items);
        setResult(data.data.items);
      });
  }

  return (
    <div className="App">
      <div className="header">
        <h1>React Book Search App</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search a book..."
            autoComplete="off"
            onChange={handleChange}
          />
          <button type="submit">Search</button>
        </form>
      </div>
      <div className="books-grid-container">
        {result.map((item, index) => {
          return (
            <div className="card" key={index}>
              <img
                src={
                  item.volumeInfo.imageLinks
                    ? item.volumeInfo.imageLinks.thumbnail
                    : "http://www.clker.com/cliparts/2/9/2/9/12427966971416347889No_photo_available.svg.hi.png"
                }
                alt={item.volumeInfo.title}
              />
              <div className="info">
                <p className="info-title">{item.volumeInfo.title}</p>
                <p className="info-authors">
                  {item.volumeInfo.authors
                    ? item.volumeInfo.authors.join(", ")
                    : "No author info"}
                </p>
                <a className="info-link" href={item.volumeInfo.previewLink}>
                  Details
                </a>
              </div>
            </div>
          );
        })}
      </div>
      <footer>
        <p>Made by Hakan, ReactJS Book Search App</p>
      </footer>
    </div>
  );
}

export default App;
