import "./App.css";
import { useState } from "react";

//AIzaSyCZCK3qK7tgbDsr9-xWhba6-xhJZDwpuSc

export const langs = [
  "JavaScript",
  "Python",
  "Java",
  "C",
  "C++",
  "C#",
  "TypeScript",
  "Go",
  "Rust",
  "PHP",
  "Ruby",
  "Swift",
  "Kotlin",
  "SQL",
  "Bash" / "Shell",
  "R",
  "Perl",
  "HTML/CSS",
  "Assembly",
];
export function Post() {
  return <Las />;
}
function Las(props) {
  const [blam, setblam] = useState({
    url: "",
    category: "JavaScript",
  });

  async function add() {
    await fetch("http://localhost:3000/", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(blam),
    });
    setblam((prev) => ({ ...prev, url: "" }));
  }

  return (
    <div className="holder">
      <header className="header">
        <h1>post your link</h1>
      </header>
      <nav className="sidebar"></nav>
      <main className="main">
        <label htmlFor="poster">link:</label>
        <input
          onChange={(e) => {
            setblam((prev) => ({ ...prev, url: e.target.value }));
          }}
          value={blam.url}
          type="text"
          id="poster"
          placeholder="input your url"
        />
        <br />
        <label htmlFor="cath">category:</label>
        <select
          onChange={(e) => {
            setblam((prev) => ({
              ...prev,
              category: e.target.value,
            }));
          }}
        >
          {langs.map((lan) => {
            return <option value={String(lan)}>{lan}</option>;
          })}
        </select>
        <button onClick={add}>post</button>
      </main>
      <footer className="footer"></footer>
    </div>
  );
}
