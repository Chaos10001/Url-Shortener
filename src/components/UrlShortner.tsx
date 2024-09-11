import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const UrlShortner = () => {
  const [url, setUrl] = useState<string>("");
  const [slug, setSlug] = useState<string>("");

  const handleUrlChange = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const response = await fetch("http://localhost:1337/url", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url, slug }),
    });
    const data = await response.json();
    if (response.ok) {
      toast.success(`Shortened URL: http://localhost:1337/${data.slug}`);
    } else {
      toast.error(data.message);
    }
  };

  return (
    <div>
      <ToastContainer />
      <form
        onSubmit={handleUrlChange}
        className="flex flex-col items-center justify-center"
      >
        <h1 className="font-bold text-2xl pt-[11rem]">Url Shortner</h1>
        <input
          type="text"
          placeholder="Enter a URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className=" border-red-700 rounded-md border-2 pl-2 p-1 mt-3"
        />
        <input
          type="text"
          placeholder="Enter a slug alias"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className=" border-red-700 rounded-md border-2 pl-2 p-1 mt-5"
        />
        <div className="pt-4">
          <button className=" bg-red-700 border-2 p-1 px-4 text-white rounded-full">
            Shorten
          </button>
        </div>
      </form>
    </div>
  );
};

export default UrlShortner;
