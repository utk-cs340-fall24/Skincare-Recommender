const Footer = () => {
    return (
        <footer className="bg-customCream text-customCream py-8 flex flex-col justify-between">
        {/* Contact Us Section in Rounded Rectangle */}
        <div className="container mx-auto text-center md:text-left">
          <div className="bg-customBlue rounded-[30px] p-8 mx-auto w-[1155px] h-[505px] md:w-[80%] md:h-auto">
            <h3 className="text-[70px] font-inknut font-black text-customCream text-center">Contact Us</h3>
            <div className="flex justify-center mt-4 space-x-4">
              {/* Placeholder Circles with Names */}
              {["Kevin Guo", "Kelly Luong", "Alan Khalili", "Ahmad Tobasei", "Annalise Smith"].map((name, index) => (
                <div key={index} className="flex flex-col items-center">
                <div className="w-[155px] h-[144px] rounded-full bg-[#D9D9D9]"></div> {/* Placeholder for future photos */}
                <p className="mt-2 font-istok text-customCream text-[24px] font-normal leading-[34.55px] text-center">{name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="bg-customLightPink text-customCream py-4 mt-8 text-center">
        <p>&copy; 2024 Skincare Recommender. All rights reserved.</p>
      </div>
    </footer>
  );
}; 
    export default Footer;
  