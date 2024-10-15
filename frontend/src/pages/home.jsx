{/* This is the homepage. */}
import "../../index.css";
import NavBar from "../components/navbar.jsx";
import Button from "../components/button.jsx";
import Footer from "../components/footer.jsx";
import AuthPrompt from "../components/promptLogin";

function Home() {
  return (
    <>
      <NavBar />
      <AuthPrompt />
      {/* This is the headline of the homepage. */}
      <div className="bg-customCream py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between">
          {/* Text to welcome and introduce the website */}
          <div className="text-center md:text-left space-y-4 -ml-12">
            <h1 className="text-6xl text-customBlue">
              Your skin deserves the best,
            </h1>
            <h2 className="text-6xl text-customBlue">
              and we can recommend the
            </h2>
            <h3 className="text-6xl text-customBlue">best!</h3>
            <p className="text-lg text-customBlue">
              Take our skincare quiz to get started:
            </p>
            {/* Button to take the Skincare Quiz */}
            <Button
              label="Skincare Quiz"
              color="#F6CACB"
              activeColor="#DF9D9D"
              onClick={() => console.log("Another button clicked!")}
            />
          </div>

          {/* Image to take up some white space and represent our website */}
          <div className="mt-8 md:mt-0 -mr-12">
            <img
              src="./src/images/mask.webp"
              alt="Skincare Products"
              loading="lazy"
              className="w-full h-auto"
            ></img>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;