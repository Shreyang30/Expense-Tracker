import { motion } from "framer-motion";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 text-white flex flex-col items-center justify-center">

      <header className="absolute top-0 w-full p-5 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Expense Tracker</h1>
        <div>
          <button className="p-2 border rounded-xl mr-4" onClick={() => window.location.href='/signin'}>Sign In</button>
          <button className="p-2 border rounded-xl mr-4" onClick={() => window.location.href='/signup'}>Sign Up</button>
        </div>
      </header>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <h2 className="text-5xl font-extrabold mb-4">Track Your Expenses, <br /> Secure Your Future!</h2>
        <p className="text-lg opacity-90 max-w-lg mx-auto">
          Take control of your finances with our easy-to-use tracker. Save smart, spend wisely, and achieve financial freedom.
        </p>
        <div className="mt-6">
          <button className=" border rounded-xl mb-10 px-6 py-3 text-lg " onClick={() => window.location.href='/signup'}>Get Started</button>
        </div>
      </motion.div>
      
      <motion.img 
        src="https://newportllc.com/wp-content/uploads/2023/05/Finance-the-Growth-of-Your-Business-in-a-Challenging-Financial-World.jpg" 
        alt="Finance Background"
        className="bottom-0 w-1/4 h-1/3 object-cover opacity-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
    </div>
  );
}
