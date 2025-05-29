import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Route, Routes, BrowserRouter, Link } from "react-router-dom";
import "./App.css";
import { Post } from "./post";
import { langs } from "./post";

function App() {
  const [links, setlinks] = useState([]);

  useEffect(() => {
    async function balam() {
      const response = await fetch("http://localhost:3000/home");
      console.log(response);
      const data = await response.json();
      console.log(data);
      setlinks(data);
    }
    balam();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home links={links} />}></Route>
        <Route path="/Posts" element={<Post />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

function Home(props) {
  const links = props.links;

  const [sta, setsta] = useState([]);
  const [bam, setbam] = useState([]);
  useEffect(() => {
    if (links) {
      setsta(links);
      setbam(
        [...links].sort((a, b) => {
          return b.views - a.views;
        })
      );
    }
  }, [props.links]);
  console.log(sta);

  //const linkm = sta.sort((a, b) => b.views - a.views);

  return (
    <>
      <div className="holder">
        <header className="header">
          <h1>hello</h1>
        </header>
        <nav className="sidebar">
          <Link to="/Posts">post your Url</Link>
          <div className="cathcont">
            <div className="cath">categories</div>
            <select
              className="filt"
              onChange={(e) => {
                const selected = e.target.value;

                const tapy = links.filter((lim) => {
                  return lim.categories === selected;
                });
                console.log(tapy);
                setsta(tapy);
                setbam(
                  [...tapy].sort((a, b) => {
                    return b.views - a.views;
                  })
                );
              }}
            >
              {langs.map((lang) => {
                return <option value={lang}>{lang}</option>;
              })}
            </select>
          </div>
        </nav>
        <main className="main">
          <div className="hell">
            <select
              name=""
              id=""
              onChange={(e) => {
                const select = e.target.value;
                const capp =
                  select === "views"
                    ? [...sta].sort((a, b) => {
                        return b.views - a.views;
                      })
                    : [...sta].sort((a, b) => {
                        return b.likes - a.likes;
                      });
                console.log(capp);
                setbam(capp);
              }}
            >
              <option value="views">views</option>
              <option value="likes">likes</option>
            </select>
          </div>
          <div className="contaier">
            {bam.map((link, index) => {
              return (
                <div className="palm" key={index}>
                  <img src={link.thumbnail} alt="" />
                  <p>name:{link.title}</p>

                  <span>likes:{link.likes}</span>
                  <br />
                  <span>views:{link.views}</span>

                  <div>
                    link:<a href={link.link}>here</a>
                  </div>
                </div>
              );
            })}
          </div>
        </main>
        <footer className="footer">
          <div>kidus</div>
        </footer>
      </div>
    </>
  );
}

export default App;
