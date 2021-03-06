import { ReactElement } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar/Navbar";
import { Articles } from "./components/Articles/Articles";
import { Login } from "./components/Login/Login";
import { ListOfArticles } from "./admin/ListOfArticles/ListOfArticles";
import { ArticleForm } from "./admin/ArticleDetail/ArticleForm";
import { ArticleCardDetail } from "./components/Articles/ArticleCardDetail";
import { About } from "./components/About/About";

const App = (): ReactElement => {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/recent-articles" element={<Articles />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin-my-articles" element={<ListOfArticles />} />
          <Route path="/admin-article-form" element={<ArticleForm />} />
          <Route path="/recent-articles/:articleId" element={<ArticleCardDetail />} />
          <Route path="/" element={<About />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
