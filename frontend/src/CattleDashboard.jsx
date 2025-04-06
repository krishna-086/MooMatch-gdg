import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Edit, Trash2, X } from "lucide-react";
import { motion } from "framer-motion";
import { db } from "./firebase"; // Update path to your firebase config
import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
  query,
} from "firebase/firestore";
import WeatherWidget from "./components/WeatherWidget";

const CattleDashboard = () => {
  const [cattle, setCattle] = useState([]);
  const [newCow, setNewCow] = useState({
    name: "",
    breed: "",
    age: "",
    milk: 0,
    weight: 0,
  });
  const [editingCow, setEditingCow] = useState(null);
  const [editData, setEditData] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Firestore real-time data sync
  useEffect(() => {
    const q = query(collection(db, "cattle"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const cattleData = [];
      querySnapshot.forEach((doc) => {
        cattleData.push({ id: doc.id, ...doc.data() });
      });
      setCattle(cattleData);
    });
    return () => unsubscribe();
  }, []);

  const getHealthRecommendation = (cow) => {
    // Convert Firestore data to numbers safely
    const milk = Number(cow.milk);
    const weight = Number(cow.weight);
    const age = Number(cow.age);

    // Validate numerical values
    if (isNaN(milk) || isNaN(weight) || isNaN(age)) {
      return "Invalid data. Please check milk, weight, and age values.";
    }

    // Young cows (under 2 years)
    if (age < 2) {
      if (weight < 250) {
        return "Young and underweight: Ensure calf starter, green fodder, and regular deworming.";
      }
      return "Young cow with good weight: Maintain protein-rich diet and growth monitoring.";
    }

    // Productive age (2–10 years)
    if (age >= 2 && age <= 10) {
      if (milk < 6 && weight < 300) {
        return "Low milk & underweight: Improve diet, add mineral mixture, and check for any illness.";
      }
      if (milk < 6 && weight >= 300) {
        return "Low milk but healthy weight: Focus on lactation feed, check for hormonal or health issues.";
      }
      if (milk >= 6 && milk <= 15 && weight >= 300 && weight <= 500) {
        return "Healthy productive cow. Keep current care routine, ensure seasonal vaccinations.";
      }
      if (milk > 15 && weight > 500) {
        return "High milk yield and heavy cow: Monitor udder health, adjust feed to prevent obesity.";
      }
      if (milk > 15 && weight <= 300) {
        return "High milk but underweight: Cow might be burning body reserves—increase high-energy diet.";
      }
    }

    // Older cows (above 10 years)
    if (age > 10) {
      if (milk < 6) {
        return "Older cow with low yield: Natural decline. Ensure comfort, and soft bedding, avoid overwork.";
      }
      return "Older cow still yielding well: Impressive! Maintain good care, but watch for joint stress.";
    }

    return "Condition not clearly defined. Please double-check the data.";
  };

  const handleAddCow = async () => {
    // Validate required fields with trimmed values
    if (!newCow.name?.trim() || !newCow.breed?.trim() || !newCow.age?.trim()) {
      alert("Please fill in all required fields (Name, Breed, Age)");
      return;
    }

    try {
      // Add new document to Firestore with validated data
      await addDoc(collection(db, "cattle"), {
        name: newCow.name.trim(),
        breed: newCow.breed.trim(),
        age: Math.max(0, Math.abs(Number(newCow.age))) || 0, // Ensure positive number
        milk: Math.max(0, Math.abs(Number(newCow.milk))) || 0,
        weight: Math.max(0, Math.abs(Number(newCow.weight))) || 0,
      });

      // Reset form state
      setNewCow({
        name: "",
        breed: "",
        age: "",
        milk: "",
        weight: "",
      });
    } catch (error) {
      console.error("Firestore operation failed:", error);
      alert("Failed to save cattle data. Please try again.");
    }
  };

  const handleDeleteCow = async (id) => {
    try {
      await deleteDoc(doc(db, "cattle", id));
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  const handleEditCow = (cow) => {
    setEditData({ ...cow });
    setEditingCow(cow.id);
    setShowEditModal(true);
  };

  const handleUpdateCow = async () => {
    try {
      const { id, ...data } = editData;
      await updateDoc(doc(db, "cattle", editingCow), {
        ...data,
        age: Number(data.age),
        milk: Number(data.milk),
        weight: Number(data.weight),
      });
      setShowEditModal(false);
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  // Animation variants
  const navbarVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
  };

  const buttonVariants = {
    hover: { scale: 1.1, transition: { duration: 0.2 } },
  };

  const scrollToHomeSection = (sectionId) => {
    navigate("/");
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        window.scrollTo({ top: element.offsetTop - 100, behavior: "smooth" });
      }
    }, 500);
  };
  return (
    <motion.div
      className="min-h-screen bg-white relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header and Navigation */}
      <motion.header
        className="fixed w-full z-50 bg-white shadow-md"
        variants={navbarVariants}
        initial="hidden"
        animate="visible"
      >
        <nav className="hidden md:flex container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.button
            onClick={() => navigate("/")}
            className="text-2xl font-bold text-[#662929]"
            whileHover={{ scale: 1.05 }}
          >
            MooMatch
          </motion.button>
          <div className="flex space-x-8">
            {["Home", "About", "Breed"].map((item, index) => (
              <motion.button
                key={index}
                onClick={() =>
                  item === "Home"
                    ? navigate("/")
                    : scrollToHomeSection(item.toLowerCase())
                }
                className="text-[#662929] font-medium hover:underline hover:scale-110 transition-transform duration-200"
                variants={buttonVariants}
                whileHover="hover"
              >
                {item}
              </motion.button>
            ))}
            <button
              onClick={() => navigate("/eduContent")}
              className="bg-[#662929] text-white px-4 py-2 rounded-md hover:bg-[#884848] transition duration-200"
            >
              EduContent
            </button>
            {/* Dashboard Button */}
            <button
              onClick={() => navigate("/Dashboard")}
              className="bg-[#662929] text-white px-4 py-2 rounded-md hover:bg-[#884848] transition duration-200"
            >
              Dashboard
            </button>
            <button 
              onClick={() => navigate('/marketplace')} 
              className="bg-[#662929] text-white px-4 py-2 rounded-md hover:bg-[#884848] transition duration-200"
            >
              MooMarket
            </button>
            <button 
              onClick={() => navigate('/diseasepredictor')} 
              className="bg-[#662929] text-white px-4 py-2 rounded-md hover:bg-[#884848] transition duration-200"
            >
              MooHealth
            </button>
          </div>
        </nav>

        {/* Mobile Navbar */}
        <nav className="md:hidden bg-white shadow-md py-4 px-4 flex justify-between items-center">
          <motion.button
            onClick={() => navigate("/")}
            className="text-xl font-bold text-[#662929]"
            whileHover={{ scale: 1.05 }}
          >
            MooMatch
          </motion.button>
          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-[#662929] focus:outline-none"
            variants={buttonVariants}
            whileHover="hover"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </motion.button>
        </nav>

        {/* Mobile Menu */}
{isMenuOpen && (
  <motion.div
    className="md:hidden bg-white shadow-lg py-4 px-4"
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.3 }}
  >
    {["Home", "About", "Breed"].map(
      (item, index) => (
        <motion.button
          key={index}
          onClick={() => {
            setIsMenuOpen(false);
            item === "Home"
              ? navigate("/")
              : scrollToHomeSection(item.toLowerCase());
          }}
          className="block text-[#662929] font-medium py-2 hover:underline hover:scale-110 transition-transform duration-200"
          variants={buttonVariants}
          whileHover="hover"
        >
          {item}
        </motion.button>
      )
    )}
    {/* Dashboard Button */}
    <button
      onClick={() => navigate("/Dashboard")}
      className="bg-[#662929] text-white px-4 py-2 rounded-md hover:bg-[#884848] transition duration-200 w-full mt-2"
    >
      Dashboard
    </button>
    {/* EduContent Button */}
    <button
      onClick={() => navigate("/eduContent")}
      className="bg-[#662929] text-white px-4 py-2 rounded-md hover:bg-[#884848] transition duration-200 w-full mt-2"
    >
      EduContent
    </button>
    <button 
              onClick={() => navigate('/marketplace')} 
              className="bg-[#662929] text-white px-4 py-2 rounded-md hover:bg-[#884848] transition duration-200 w-full mt-2"
            >
              MooMarket
            </button>
            <button 
              onClick={() => navigate('/diseasepredictor')} 
              className="bg-[#662929] text-white px-4 py-2 rounded-md hover:bg-[#884848] transition duration-200 w-full mt-2"
            >
              MooHealth
            </button>
  </motion.div>
)}
        
      </motion.header>

      {/* Edit Modal Backdrop */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-10"></div>
      )}

      <h1 className="text-3xl md:text-5xl font-bold text-[#662929] text-center mb-6 pt-20 px-4">
        🐄 Cattle Management
      </h1>
      <div className="px-4">
        <WeatherWidget />
      </div>

      {/* Main Table */}
      <motion.div
        className="bg-white shadow-2xl rounded-2xl p-4 md:p-6 max-w-6xl mx-auto my-6 overflow-x-auto"
        whileHover={{ scale: 1.02 }}
      >
        <div className="min-w-[800px] md:min-w-0">
          <table className="w-full border-collapse shadow-lg rounded-xl overflow-hidden">
            <thead>
              <tr className="bg-[#662929] text-white text-sm md:text-lg">
                <th className="p-2 md:p-4">Name</th>
                <th className="p-2 md:p-4">Breed</th>
                <th className="p-2 md:p-4">Age</th>
                <th className="p-2 md:p-4">Milk (L/day)</th>
                <th className="p-2 md:p-4">Weight (kg)</th>
                <th className="p-2 md:p-4">Health Recommendation</th>
                <th className="p-2 md:p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cattle.map((cow, index) => (
                <tr
                  key={cow.id}
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-white"
                  } text-center hover:bg-[rgb(168,85,85,0.1)] transition`}
                >
                  <td className="p-2 md:p-4">{cow.name}</td>
                  <td className="p-2 md:p-4">{cow.breed}</td>
                  <td className="p-2 md:p-4">{cow.age}</td>
                  <td className="p-2 md:p-4">{cow.milk}</td>
                  <td className="p-2 md:p-4">{cow.weight}</td>
                  <td className="p-2 md:p-4 text-sm md:text-base">{getHealthRecommendation(cow)}</td>
                  <td className="p-2 md:p-4 flex justify-center gap-3">
                    <button
                      onClick={() => handleEditCow(cow)}
                      className="text-yellow-500 hover:text-yellow-600"
                    >
                      <Edit size={18} className="md:size-[22px]" />
                    </button>
                    <button
                      onClick={() => handleDeleteCow(cow.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 size={18} className="md:size-[22px]" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Add Cattle Form */}
      <motion.div
        className="bg-white shadow-xl rounded-2xl p-4 md:p-6 max-w-6xl mx-auto mt-6 mb-10"
        whileHover={{ scale: 1.02 }}
      >
        <h2 className="text-xl md:text-2xl font-semibold mb-4 text-[#662929]">
          Add Cattle
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.keys(newCow).map((key) => (
            <div key={key}>
              <label className="block text-sm md:text-md font-medium text-gray-800">
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </label>
              <input
                type="text"
                className="border p-2 md:p-3 w-full rounded-lg shadow-sm focus:ring-2 focus:ring-[#662929]"
                value={newCow[key]}
                onChange={(e) =>
                  setNewCow({ ...newCow, [key]: e.target.value })
                }
              />
            </div>
          ))}
        </div>
        <button
          className="bg-[#662929] text-white px-6 py-2 md:py-3 rounded-lg w-full mt-4 hover:bg-[rgb(102,41,41,0.8)] transition"
          onClick={handleAddCow}
        >
          Add Cattle
        </button>
      </motion.div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 flex justify-center items-center z-20 px-4">
          <motion.div
            className="bg-white p-4 md:p-6 rounded-xl shadow-xl w-full md:w-2/3 lg:w-1/3 relative max-h-[90vh] overflow-y-auto"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button
              className="absolute top-2 right-2 text-red-600 hover:text-red-700"
              onClick={() => setShowEditModal(false)}
            >
              <X size={26} />
            </button>
            <h2 className="text-xl md:text-2xl font-semibold mb-4 text-[#662929]">
              Edit Cattle
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.keys(editData || {})
                .filter((key) => key !== "id")
                .map((key) => (
                  <div key={key}>
                    <label className="block text-sm md:text-md font-medium text-gray-800">
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </label>
                    <input
                      type="text"
                      className="border p-2 md:p-3 w-full rounded-lg shadow-sm focus:ring-2 focus:ring-[#662929]"
                      value={editData[key]}
                      onChange={(e) =>
                        setEditData({ ...editData, [key]: e.target.value })
                      }
                    />
                  </div>
                ))}
            </div>
            <button
              className="bg-[#662929] text-white px-6 py-2 md:py-3 rounded-lg w-full mt-4 hover:bg-[rgb(102,41,41,0.8)] transition"
              onClick={handleUpdateCow}
            >
              Update
            </button>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default CattleDashboard;

