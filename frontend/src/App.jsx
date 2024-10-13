import '../index.css'
import NavBar from './components/navbar.jsx';
import Button from './components/button.jsx';

function App() {
  return (
    <>
      <NavBar/>

      <div className='bg-customCream py-12'>
        <div class='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between'>

          <div className='text-center md:text-left space-y-4 -ml-12'>
            <h1 className='text-6xl text-customBlue'>Your skin deserves the best,</h1>
            <h2 className='text-6xl text-customBlue'>and we can recommend the</h2>
            <h3 className='text-6xl text-customBlue'>best!</h3>
            <p className='text-lg text-customBlue'>Take our skincare quiz to get started:</p>
            <Button 
              label='Skincare Quiz' 
              color='#F6CACB'
              activeColor='#DF9D9D'
              onClick={() => console.log('Another button clicked!')} 
            />
          </div>

          <div className='mt-8 md:mt-0 -mr-12'>
            <img src="./src/images/mask.webp" alt="Skincare Products" class="w-full h-auto">
            </img>
          </div>

        </div>
      </div>


    </>
  );
}

export default App;