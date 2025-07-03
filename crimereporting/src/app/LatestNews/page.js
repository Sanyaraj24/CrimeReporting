"use client";
import Head from "next/head";

async function getNewsArticles() {
  // Replace with your News API key
  const apiKey = "ef3ebcc5a7ab49e295165f9cff973987";
  const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.articles;
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
}

export default async function page() {
  const articles = await getNewsArticles();

  return (
    <div className="min-h-screen bg-[#121212] py-8 px-4 sm:px-6 lg:px-8">
      <Head>
        <title>News Headlines</title>
        <meta
          name="description"
          content="Latest news headlines from around the world."
        />
      </Head>

      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-white mb-8 p-5">
          Latest News Headlines
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, index) => (
            <div
              key={index}
              className="bg-[#1E1E1E] rounded-lg shadow-md overflow-hidden border border-[#404040]"
            >
              {article.urlToImage && (
                <img
                  src={article.urlToImage}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <h2 className="text-xl font-semibold text-white mb-2">
                  {article.title}
                </h2>
                <p className="text-[#B0B0B0] mb-4">{article.description}</p>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#E74C3C] hover:underline"
                >
                  Read more →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
