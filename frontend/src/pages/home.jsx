import React from "react";
import NavBar from "../components/navbar";
import Button from "../components/button";
import Footer from "../components/footer";
import AuthPrompt from "../components/promptLogin";
import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";

function Home() {
  const navigate = useNavigate();

  const { user, loading, error } = useUser();
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <NavBar user={user} />
      <AuthPrompt />
      <div className="bg-customCream min-h-screen pt-[60px]">
        {/* Hero Section */}
        <div className="container mx-auto px-4 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 items-center gap-12">
            {/* Hero Text */}
            <div className="text-center lg:text-left space-y-4">
              <h1 className="text-4xl lg:text-5xl lg:text-6xl font-bold text-customBlue">
                Your skin deserves the best, and we can recommend the best!
              </h1>
              <p className="text-lg text-customBlue mt-4">
                {user && user.quizTaken ? (
                  <>
                    <span>
                      Get your personalized skincare recommendations!{" "}
                    </span>
                    <br>
                    </br>
                    <Button
                      label="Get Recommendations"
                      color="customLightPink"
                      activeColor="customDarkPink"
                      onClick={() => navigate("/results")}
                      className="mt-6"
                    />
                  </>
                ) : (
                  <>
                    <span>Take our skincare quiz to get started: </span>
                    <br>
                    </br>
                    <Button
                      label="Skincare Quiz"
                      color="customLightPink"
                      activeColor="customDarkPink"
                      onClick={() => navigate("/quiz")}
                      className="mt-6"
                    />
                  </>
                )}
              </p>
            </div>

            {/* Hero Image */}
            <div className="flex justify-center lg:justify-end">
              <img
                src="./src/images/mask.webp"
                alt="Skincare Products"
                loading="lazy"
                className="max-w-full h-auto"
              />
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="container mx-auto px-4 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 items-stretch gap-12">
            {/* Serum Image */}
            <div className="order-2 lg:relative bottom-24 left-20 lg:order-1">
              <img
                src="./src/images/serum.jpeg"
                alt="Skincare Serum"
                loading="lazy"
                className="w-full h-auto rounded-lg shadow-lg max-h-96 lg:max-h-[600px] object-cover"
              />
            </div>

            {/* About Text */}
            <div className="order-1 lg:order-2 bg-customLightPink rounded-lg p-12 text-center flex items-center lg:relative top-40 right-20 shadow-lg">
              <div>
                <h2 className="text-5xl lg:text-6xl font-extrabold text-customCream mb-8">
                  About
                </h2>
                <p className="text-2xl lg:text-3xl text-customCream leading-relaxed tracking-wide">
                  Welcome to the{" "}
                  <span className="font-bold">Skincare Recommender</span>! We
                  provide personalized skincare recommendations tailored to your
                  unique needs.
                  <br />
                  <br />
                  Our mission is to help you find the right products for your
                  skin. Join our community to explore a curated selection of
                  skincare solutions for all skin types and concerns.
                  <br />
                  <br />
                  Let&apos;s simplify your skincare routine and enhance your
                  natural beauty!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="container mx-auto px-4 py-16 lg:py-24">
          <div className="bg-customBlue rounded-3xl p-8 lg:p-12 text-center">
            <h3 className="text-4xl lg:text-6xl font-bold text-customCream mb-12">
              Contact Us
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 justify-center items-center">
              {[
                {
                  name: "Kevin Guo",
                  photo: "https://i.imgur.com/UayXqch.png",
                  linkedin: "https://www.linkedin.com/in/kvn-guo/",
                },
                {
                  name: "Kelly Luong",
                  photo: "https://i.imgur.com/yzterSc.png",
                  linkedin: "https://www.linkedin.com/in/kellyyluongg/",
                },
                {
                  name: "Alan Khalili",
                  photo: "https://i.imgur.com/Vq7xmEb.png",
                  linkedin: "https://www.linkedin.com/in/alankhalili/",
                },
                {
                  name: "Ahmad Tobasei",
                  photo: "https://i.imgur.com/ZMb3SEH.png",
                  linkedin:
                    "https://www.linkedin.com/in/ahmad-tobasei-6745a3263/",
                },
                {
                  name: "Annalise Smith",
                  photo: "https://i.imgur.com/GjohJ8f.png",
                  linkedin:
                    "https://www.linkedin.com/in/annalise-smith-0666b2304/",
                },
              ].map((person, index) => (
                <div key={index} className="flex flex-col items-center">
                  <a
                    href={person.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block mb-2"
                  >
                    <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-customCream hover:scale-105 transition-transform">
                      <img
                        src={person.photo}
                        alt={person.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </a>
                  <p className="text-xl text-customCream mt-2">{person.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}

export default Home;
