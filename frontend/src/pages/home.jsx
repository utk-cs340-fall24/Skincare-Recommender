{ /* This is the homepage. */ }
import "../../index.css";
import NavBar from "../components/navbar.jsx";
import Button from "../components/button.jsx";
import Footer from "../components/footer.jsx";
import AuthPrompt from "../components/promptLogin";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  return (
    <>
      <NavBar />
      <AuthPrompt />
      {/* This is the entire homepage. */}
      <div className="bg-customCream">
        {/* This is the headline of the homepage. */}
        <div className="py-12">
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
                onClick={() => navigate("/quiz")}
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

        {/* Container for Image and About Section */}
        <div className="flex justify-left mr-3 ml-60 mt-2 relative mb-2">
          {/* Image for Serum */}
          <img
            src="./src/images/serum.jpeg"
            alt="Skincare Serum"
            loading="lazy"
            className="w-[500px] h-[520px] rounded-lg opacity-100"
          ></img>

          {/* About Section */}
          <div className="w-[480px] h-auto bg-customLightPink rounded-lg opacity-100 flex flex-col p-4 absolute left-[38%] top-[48%] mb-20">
            <h2 className="text-customCream text-[56px] font-inknut font-bold leading-[64px] text-center mb-4">
              About
            </h2>
            <p className="font-inclusive text-customCream text-[18px] font-normal leading-[36px] text-center px-4 py-2">
              Welcome to the Skincare Recommender! We provide personalized
              skincare recommendations tailored to your unique needs. Our
              mission is to help you find the right products for your skin. Join
              our community to explore a curated selection of skincare solutions
              for all skin types and concerns. Let's simplify your skincare
              routine and enhance your natural beauty!
            </p>
          </div>
        </div>

        <div className="mt-40 bg-customCream"></div>

      <footer className="bg-customCream text-customCream py-8 flex flex-col justify-between">
        {/* Contact Us Section in Rounded Rectangle */}
        <div className="container mx-auto text-center md:text-left">
          <div className="bg-customBlue rounded-[30px] p-8 mx-auto w-[1155px] h-[505px] md:w-[80%] md:h-auto">
            <h3 className="text-[70px] font-inknut font-black text-customCream text-center">
              Contact Us
            </h3>
            <div className="flex justify-center mt-4 space-x-4">
              {/* Placeholder Circles with Names */}
              {[
                "Kevin Guo",
                "Kelly Luong",
                "Alan Khalili",
                "Ahmad Tobasei",
                "Annalise Smith",
              ].map((name, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="w-[155px] h-[144px] rounded-full bg-[#D9D9D9]"></div>{" "}
                  {/* Placeholder for future photos */}
                  <p className="mt-2 font-istok text-customCream text-[24px] font-normal leading-[34.55px] text-center">
                    {name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </footer>

      <Footer />
      </div>
    </>
  );
}

export default Home;
