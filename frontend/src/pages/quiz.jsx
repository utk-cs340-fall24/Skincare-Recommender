{ /* This is the quiz page. */ }
import "../../index.css";
import NavBar from "../components/navbar.jsx";
import AuthPrompt from "../components/promptLogin";

function Quiz() {
  return (
    <>
      <NavBar />
      <AuthPrompt />
      <div className="flex flex-col items-center mt-8 px-4">
        {/* Title */}
        <h1 className="text-5xl text-center text-blue-400 font-bold mb-10">
          Skincare Quiz
        </h1>

        {/* Question 1 */}
        <div className="bg-pink-200 p-8 rounded-xl shadow-lg mb-8 w-full md:w-2/3">
          <h2 className="text-3xl font-bold mb-4">1. What’s your skin type?</h2>
          <div className="flex justify-around">
            <button className="bg-blue-200 text-lg py-2 px-4 rounded-full hover:bg-blue-300">
              Normal
            </button>
            <button className="bg-blue-200 text-lg py-2 px-4 rounded-full hover:bg-blue-300">
              Dry
            </button>
            <button className="bg-blue-200 text-lg py-2 px-4 rounded-full hover:bg-blue-300">
              Oily
            </button>
            <button className="bg-blue-200 text-lg py-2 px-4 rounded-full hover:bg-blue-300">
              Combo
            </button>
            <button className="bg-blue-200 text-lg py-2 px-4 rounded-full hover:bg-blue-300">
              Not Sure
            </button>
          </div>
        </div>

        {/* Question 2 */}
        <div className="bg-pink-200 p-8 rounded-xl shadow-lg mb-8 w-full md:w-2/3">
          <h2 className="text-3xl font-bold mb-4">2. What are your skin concerns?</h2>
          <p className="text-sm text-gray-600 mb-4">Select all that apply:</p>
          <div className="flex justify-around">
            <button className="bg-blue-200 text-lg py-2 px-4 rounded-full hover:bg-blue-300">
              Acne
            </button>
            <button className="bg-blue-200 text-lg py-2 px-4 rounded-full hover:bg-blue-300">
              Wrinkles
            </button>
            <button className="bg-blue-200 text-lg py-2 px-4 rounded-full hover:bg-blue-300">
              Dryness
            </button>
            <button className="bg-blue-200 text-lg py-2 px-4 rounded-full hover:bg-blue-300">
              Example
            </button>
          </div>
        </div>

        {/* Question 3 */}
        <div className="bg-pink-200 p-8 rounded-xl shadow-lg mb-8 w-full md:w-2/3">
          <h2 className="text-3xl font-bold mb-4">3. Example Question</h2>
          {/* You can add more buttons here for additional options */}
        </div>
      </div>
    </>
  );
}
export default Quiz;
