import React, { useState, useEffect } from "react";
import { Edit, Trash2, X } from "lucide-react";
import WeatherWidget from "./components/WeatherWidget";
import { motion } from "framer-motion";

const CattleDashboard = () => {
  const [cattle, setCattle] = useState(
    JSON.parse(localStorage.getItem("cattle")) || [
      {
        id: 1,
        name: "Bella",
        breed: "Holstein",
        age: 5,
        milk: 20,
        weight: 500,
      },
    ]
  );
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

  useEffect(() => {
    localStorage.setItem("cattle", JSON.stringify(cattle));
  }, [cattle]);

  const getHealthRecommendation = (cow) => {
    const { milk, weight, age } = cow;

    // Basic validation
    if (milk == null || weight == null || age == null) {
      return "Incomplete data. Please provide milk yield, weight, and age.";
    }

    // Young cows (under 2 years)
    if (age < 2) {
      if (weight < 250) {
        return "Young and underweight: Ensure calf starter, green fodder, and regular deworming.";
      } else {
        return "Young cow with good weight: Maintain protein-rich diet and growth monitoring.";
      }
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
      if (milk >= 6) {
        return "Older cow still yielding well: Impressive! Maintain good care, but watch for joint stress.";
      }
    }

    return "Condition not clearly defined. Please double-check the data.";
  };

  const handleAddCow = () => {
    if (!newCow.name || !newCow.breed || !newCow.age) return;
    const updatedCattle = [...cattle, { id: Date.now(), ...newCow }];
    setCattle(updatedCattle);
    setNewCow({ name: "", breed: "", age: "", milk: 0, weight: 0 });
  };

  const handleDeleteCow = (id) => {
    setCattle(cattle.filter((cow) => cow.id !== id));
  };

  const handleEditCow = (cow) => {
    setEditData({ ...cow });
    setEditingCow(cow.id);
    setShowEditModal(true);
  };

  const handleUpdateCow = () => {
    const updatedCattle = cattle.map((cow) =>
      cow.id === editingCow ? { ...editData, id: editingCow } : cow
    );
    setCattle(updatedCattle);
    setShowEditModal(false);
  };
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

  return (
    <motion.div
      className="min-h-screen bg-white  relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
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
            {["Home", "About", "Breed", "Contact"].map((item, index) => (
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
            {["Home", "About", "Services", "Testimonials", "Contact"].map(
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
          </motion.div>
        )}
      </motion.header>
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-10"></div>
      )}
      <h1 className="text-5xl font-bold text-[#662929] text-center mb-6 ">
      Navbar
      </h1>
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-10"></div>
      )}
      <h1 className="text-5xl font-bold text-[#662929] text-center mb-6 ">
        🐄 Cattle Management
      </h1>
      <WeatherWidget />

      <motion.div
        className="bg-white shadow-2xl rounded-2xl p-6 max-w-6xl mx-auto"
        whileHover={{ scale: 1.02 }}
      >
        <table className="w-full border-collapse shadow-lg rounded-xl overflow-hidden">
          <thead>
            <tr className="bg-[#662929] text-white text-lg">
              <th className="p-4">Name</th>
              <th className="p-4">Breed</th>
              <th className="p-4">Age</th>
              <th className="p-4">Milk (L/day)</th>
              <th className="p-4">Weight (kg)</th>
              <th className="p-4">Health Recommendation</th>
              <th className="p-4">Actions</th>
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
                <td className="p-4">{cow.name}</td>
                <td className="p-4">{cow.breed}</td>
                <td className="p-4">{cow.age}</td>
                <td className="p-4">{cow.milk}</td>
                <td className="p-4">{cow.weight}</td>
                <td className="p-4">{getHealthRecommendation(cow)}</td>
                <td className="p-4 flex justify-center gap-3">
                  <button
                    onClick={() => handleEditCow(cow)}
                    className="text-yellow-500 hover:text-yellow-600"
                  >
                    <Edit size={22} />
                  </button>
                  <button
                    onClick={() => handleDeleteCow(cow.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 size={22} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      <motion.div
        className="bg-white shadow-xl rounded-2xl p-6 max-w-6xl mx-auto mt-6"
        whileHover={{ scale: 1.02 }}
      >
        <h2 className="text-2xl font-semibold mb-4 text-[#662929]">
          Add Cattle
        </h2>
        <div className="grid grid-cols-3 gap-4">
          {Object.keys(newCow).map((key) => (
            <div key={key}>
              <label className="block text-md font-medium text-gray-800">
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </label>
              <input
                type="text"
                className="border p-3 w-full rounded-lg shadow-sm focus:ring-2 focus:ring-[#662929]"
                value={newCow[key]}
                onChange={(e) =>
                  setNewCow({ ...newCow, [key]: e.target.value })
                }
              />
            </div>
          ))}
        </div>
        <button
          className="bg-[#662929] text-white px-6 py-3 rounded-lg w-full mt-4 hover:bg-[rgb(102,41,41,0.8)] transition"
          onClick={handleAddCow}
        >
          Add Cattle
        </button>
      </motion.div>

      {showEditModal && (
        <div className="fixed inset-0 flex justify-center items-center z-20">
          <motion.div
            className="bg-white p-6 rounded-xl shadow-xl w-1/3 relative"
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
            <h2 className="text-2xl font-semibold mb-4 text-[#662929]">
              Edit Cattle
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {Object.keys(editData || {}).map((key) => (
                <div key={key}>
                  <label className="block text-md font-medium text-gray-800">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </label>
                  <input
                    type="text"
                    className="border p-3 w-full rounded-lg shadow-sm focus:ring-2 focus:ring-[#662929]"
                    value={editData[key]}
                    onChange={(e) =>
                      setEditData({ ...editData, [key]: e.target.value })
                    }
                  />
                </div>
              ))}
            </div>
            <button
              className="bg-[#662929] text-white px-6 py-3 rounded-lg w-full mt-4 hover:bg-[rgb(102,41,41,0.8)] transition"
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
