import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// Navbar animation variants
const navbarVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const buttonVariants = {
  hover: { scale: 1.05, transition: { duration: 0.2 } }
};

const CowDiseasePredictor = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // State management for disease predictor
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [predictionResult, setPredictionResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState({});

  // Scroll to section function for navigation
  const scrollToHomeSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Symptom data (from symptomData.js)
  const symptomData = {
    "🧺 General": [
      {
        "id": "fever",
        "label": "Fever",
        "description": "Elevated body temperature, often indicating infection.",
       
      },
      {
        "id": "weight_loss",
        "label": "Weight Loss",
        "description": "Unintended reduction in body weight, possibly due to illness.",
       
      },
      {
        "id": "weakness",
        "label": "Weakness",
        "description": "Reduced physical strength, leading to difficulty in movement.",
       
      },
      {
        "id": "lethargy",
        "label": "Lethargy",
        "description": "Unusual drowsiness or lack of energy.",
       
      },
      {
        "id": "anorexia",
        "label": "Anorexia",
        "description": "Loss of appetite leading to decreased food intake.",
       
      },
      {
        "id": "depression",
        "label": "Depression",
        "description": "Unusual lack of interest in surroundings or activities.",
       
      },
      {
        "id": "dehydration",
        "label": "Dehydration",
        "description": "Insufficient water content in the body, leading to health issues.",
       
      },
      {
        "id": "dull",
        "label": "Dullness",
        "description": "Lack of alertness or responsiveness.",
       
      },
      {
        "id": "emaciation",
        "label": "Emaciation",
        "description": "Severe weight loss resulting in a thin body condition.",
       
      },
      {
        "id": "raised_breathing",
        "label": "Increased Breathing Rate",
        "description": "Faster than normal breathing, possibly indicating respiratory issues.",
       
      },
      {
        "id": "high_temp",
        "label": "High Temperature",
        "description": "Elevated body temperature, often a sign of fever.",
       
      },
      {
        "id": "high_pulse_rate",
        "label": "High Pulse Rate",
        "description": "Faster than normal heartbeat, which may indicate stress or illness.",
       
      },
      {
        "id": "high_proportion",
        "label": "High Proportion",
        "description": "Unusual body condition score, indicating overweight or underweight.",
       
      },
      {
        "id": "isolation_from_herd",
        "label": "Isolation from Herd",
        "description": "Tendency to separate from the group, often a sign of illness.",
       
      }
    ],
    "\ud83c\udf7d Digestive": [
      {
        "id": "bloat",
        "label": "Bloat",
        "description": "Symptom observed in cow.",
       
      },
      {
        "id": "colic",
        "label": "Colic",
        "description": "Symptom observed in cow."
      },
      {
        "id": "rumenstasis",
        "label": "Rumenstasis",
        "description": "Symptom observed in cow.",
       
      },
      {
        "id": "stomach_pain",
        "label": "Stomach Pain",
        "description": "Symptom observed in cow."
      },
      {
        "id": "diarrhoea",
        "label": "Diarrhoea",
        "description": "Symptom observed in cow."
      },
      {
        "id": "mild_diarrhoea",
        "label": "Mild Diarrhoea",
        "description": "Symptom observed in cow."
      },
      {
        "id": "highly_diarrhoea",
        "label": "Highly Diarrhoea",
        "description": "Symptom observed in cow."
      },
      {
        "id": "vomiting",
        "label": "Vomiting",
        "description": "Symptom observed in cow."
      },
      {
        "id": "salivation",
        "label": "Salivation",
        "description": "Symptom observed in cow."
      },
      {
        "id": "drooling",
        "label": "Drooling",
        "description": "Symptom observed in cow."
      },
      {
        "id": "frothing",
        "label": "Frothing",
        "description": "Symptom observed in cow."
      },
      {
        "id": "frothing_of_mouth",
        "label": "Frothing Of Mouth",
        "description": "Symptom observed in cow."
      },
      {
        "id": "nasel_discharges",
        "label": "Nasel Discharges",
        "description": "Symptom observed in cow."
      },
      {
        "id": "gaseous_stomach",
        "label": "Gaseous Stomach",
        "description": "Symptom observed in cow."
      },
      {
        "id": "reduces_feed_intake",
        "label": "Reduces Feed Intake",
        "description": "Symptom observed in cow."
      },
      {
        "id": "reduced_rumination",
        "label": "Reduced Rumination",
        "description": "Symptom observed in cow."
      },
      {
        "id": "reduced_fat",
        "label": "Reduced Fat",
        "description": "Symptom observed in cow."
      }
    ],
    "\ud83e\udec1 Respiratory": [
      {
        "id": "coughing",
        "label": "Coughing",
        "description": "Symptom observed in cow."
      },
      {
        "id": "dyspnea",
        "label": "Dyspnea",
        "description": "Symptom observed in cow."
      },
      {
        "id": "shallow_breathing",
        "label": "Shallow Breathing",
        "description": "Symptom observed in cow."
      },
      {
        "id": "rapid_breathing",
        "label": "Rapid Breathing",
        "description": "Symptom observed in cow."
      },
      {
        "id": "diffculty_breath",
        "label": "Difficulty Breath",
        "description": "Symptom observed in cow."
      },
      {
        "id": "intermittent_fever",
        "label": "Intermittent Fever",
        "description": "Symptom observed in cow."
      }
    ],
    "\ud83e\udde0 Neurological": [
      {
        "id": "torticollis",
        "label": "Torticollis",
        "description": "Symptom observed in cow.",
      },
      {
        "id": "facial_paralysis",
        "label": "Facial Paralysis",
        "description": "Symptom observed in cow."
      },
      {
        "id": "quivering_lips",
        "label": "Quivering Lips",
        "description": "Symptom observed in cow."
      },
      {
        "id": "lack_of-coordination",
        "label": "Lack Of-Coordination",
        "description": "Symptom observed in cow."
      },
      {
        "id": "encephalitis",
        "label": "Encephalitis",
        "description": "Symptom observed in cow."
      },
      {
        "id": "anxiety",
        "label": "Anxiety",
        "description": "Symptom observed in cow."
      },
      {
        "id": "aggression",
        "label": "Aggression",
        "description": "Symptom observed in cow."
      }
    ],
    "\ud83d\udc2e Udder & Milk": [
      {
        "id": "udder_swelling",
        "label": "Udder Swelling",
        "description": "Symptom observed in cow.",
       
      },
      {
        "id": "udder_pain",
        "label": "Udder Pain",
        "description": "Symptom observed in cow."
      },
      {
        "id": "udder_redness",
        "label": "Udder Redness",
        "description": "Symptom observed in cow."
      },
      {
        "id": "udder_heat",
        "label": "Udder Heat",
        "description": "Symptom observed in cow."
      },
      {
        "id": "udder_hardeness",
        "label": "Udder Hardeness",
        "description": "Symptom observed in cow."
      },
      {
        "id": "milk_clots",
        "label": "Milk Clots",
        "description": "Symptom observed in cow."
      },
      {
        "id": "milk_flakes",
        "label": "Milk Flakes",
        "description": "Symptom observed in cow."
      },
      {
        "id": "milk_watery",
        "label": "Milk Watery",
        "description": "Symptom observed in cow."
      },
      {
        "id": "milk_fever",
        "label": "Milk Fever",
        "description": "Symptom observed in cow."
      },
      {
        "id": "reduction_milk_vields",
        "label": "Reduction Milk Vields",
        "description": "Symptom observed in cow."
      }
    ],
    "\ud83e\uddec Reproductive": [
      {
        "id": "abortions",
        "label": "Abortions",
        "description": "Symptom observed in cow."
      },
      {
        "id": "infertility",
        "label": "Infertility",
        "description": "Symptom observed in cow."
      },
      {
        "id": "decreased_fertility",
        "label": "Decreased Fertility",
        "description": "Symptom observed in cow."
      },
      {
        "id": "stillbirths",
        "label": "Stillbirths",
        "description": "Symptom observed in cow."
      }
    ],
    "\ud83e\udda0 Infectious & Other": [
      {
        "id": "blood_poisoning",
        "label": "Blood Poisoning",
        "description": "Symptom observed in cow."
      },
      {
        "id": "painful_tongue",
        "label": "Painful Tongue",
        "description": "Symptom observed in cow."
      },
      {
        "id": "arthrogyposis",
        "label": "Arthrogyposis",
        "description": "Symptom observed in cow."
      },
      {
        "id": "ankylosis",
        "label": "Ankylosis",
        "description": "Symptom observed in cow."
      },
      {
        "id": "abdominal_pain",
        "label": "Abdominal Pain",
        "description": "Symptom observed in cow."
      },
      {
        "id": "lameness",
        "label": "Lameness",
        "description": "Symptom observed in cow."
      },
      {
        "id": "pain",
        "label": "Pain",
        "description": "Symptom observed in cow."
      },
      {
        "id": "swelling",
        "label": "Swelling",
        "description": "Symptom observed in cow."
      },
      {
        "id": "swollen_pharyngeal",
        "label": "Swollen Pharyngeal",
        "description": "Symptom observed in cow."
      },
      {
        "id": "swollen_tongue",
        "label": "Swollen Tongue",
        "description": "Symptom observed in cow."
      },
      {
        "id": "saliva",
        "label": "Saliva",
        "description": "Symptom observed in cow."
      },
      {
        "id": "nausea",
        "label": "Nausea",
        "description": "Symptom observed in cow."
      },
      {
        "id": "nasel_discharges",
        "label": "Nasel Discharges",
        "description": "Symptom observed in cow."
      },
      {
        "id": "lacrimation",
        "label": "Lacrimation",
        "description": "Symptom observed in cow."
      },
      {
        "id": "jaundice",
        "label": "Jaundice",
        "description": "Symptom observed in cow."
      },
      {
        "id": "ketosis",
        "label": "Ketosis",
        "description": "Symptom observed in cow."
      },
      {
        "id": "hydrocephalus",
        "label": "Hydrocephalus",
        "description": "Symptom observed in cow."
      },
      {
        "id": "photo_sensitization",
        "label": "Photo Sensitization",
        "description": "Symptom observed in cow."
      },
      {
        "id": "ulcers",
        "label": "Ulcers",
        "description": "Symptom observed in cow."
      },
      {
        "id": "mucosal_lesions",
        "label": "Mucosal Lesions",
        "description": "Symptom observed in cow."
      },
      {
        "id": "Condemnation_of_livers",
        "label": "Condemnation Of Livers",
        "description": "Symptom observed in cow."
      },
      {
        "id": "blisters",
        "label": "Blisters",
        "description": "Symptom observed in cow."
      },
      {
        "id": "bellowing",
        "label": "Bellowing",
        "description": "Symptom observed in cow."
      },
      {
        "id": "moaning",
        "label": "Moaning",
        "description": "Symptom observed in cow."
      },
      {
        "id": "condemnation_of_livers",
        "label": "Condemnation Of Livers",
        "description": "Symptom observed in cow."
      },
      {
        "id": "blood_loss",
        "label": "Blood Loss",
        "description": "Symptom observed in cow."
      },
      {
        "id": "condemnation_of_livers",
        "label": "Condemnation Of Livers",
        "description": "Symptom observed in cow."
      },
      {
        "id": "condemnation_of_livers",
        "label": "Condemnation Of Livers",
        "description": "Symptom observed in cow."
      },
      {
        "id": "condemnation_of_livers",
        "label": "Condemnation Of Livers",
        "description": "Symptom observed in cow."
      },
      {
        "id": "condemnation_of_livers",
        "label": "Condemnation Of Livers",
        "description": "Symptom observed in cow."
      }
    ]
  };

  // Toggle category expansion
  const toggleCategory = (category) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  // Handle symptom selection
  const handleSymptomChange = (symptomId) => {
    setSelectedSymptoms(prev =>
      prev.includes(symptomId)
        ? prev.filter(id => id !== symptomId)
        : [...prev, symptomId]
    );
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedSymptoms.length === 0) return;
   
    setIsLoading(true);
    setPredictionResult('');

    try {
      const response = await fetch("https://cow-disease-api-18018835632.us-central1.run.app/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symptoms: selectedSymptoms })
      });
     
      if (!response.ok) throw new Error('Prediction failed');
     
      const result = await response.json();
      setPredictionResult(result.disease);
    } catch (error) {
      console.error("Prediction error:", error);
      setPredictionResult("Error predicting disease. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Reset form
  const resetForm = () => {
    setSelectedSymptoms([]);
    setPredictionResult('');
    setExpandedCategories({});
  };

  return (
  <div className="min-h-screen bg-[#f9f1f1] text-[#662929] pt-0.5">
    {/* Header and Navigation */}
    <motion.header
      className="fixed w-full z-50 bg-white shadow-md"
      variants={navbarVariants}
      initial="hidden"
      animate="visible"
    >
      <nav className="hidden md:flex container mx-auto px-4 py-2 flex justify-between items-center">
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
          {["Home", "About", "Breed"].map((item, index) => (
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
          ))}
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

    {/* Disease Predictor Content */}
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 my-10">
      <h1 className="text-3xl font-bold text-[#662929] text-center mb-6">
        🐄 Cow Disease Predictor
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Categories with dropdown */}
        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
          {Object.entries(symptomData).map(([category, symptoms]) => (
            <div key={category} className="border-b border-[#7a3a3a] pb-4">
              <button
                type="button"
                onClick={() => toggleCategory(category)}
                className="flex justify-between items-center w-full p-3 bg-[#662929] text-white rounded-lg hover:bg-[#884848] transition-colors"
              >
                <span className="text-xl font-medium">{category}</span>
                <span className="text-lg">
                  {expandedCategories[category] ? '−' : '+'}
                </span>
              </button>

              {expandedCategories[category] && (
                <div className="mt-3 pl-2">
                  <div className="grid gap-3">
                    {symptoms.map((symptom) => (
                      <div
                        key={symptom.id}
                        className="flex items-center p-3 bg-white rounded-lg shadow hover:bg-[#f5e6e6] transition-colors cursor-pointer relative group"
                        onClick={() => handleSymptomChange(symptom.id)}
                      >
                        <input
                          type="checkbox"
                          id={symptom.id}
                          checked={selectedSymptoms.includes(symptom.id)}
                          onChange={() => {}}
                          className="w-5 h-5 text-[#662929] rounded focus:ring-[#662929] mr-3"
                        />
                        <label htmlFor={symptom.id} className="text-lg cursor-pointer">
                          {symptom.label}
                        </label>
                        {symptom.description && (
                          <div className="absolute hidden group-hover:block left-full ml-2 top-0 bg-[#662929] text-white text-sm p-2 rounded w-64 z-10 shadow-lg">
                            {symptom.description}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <button
            type="submit"
            disabled={isLoading || selectedSymptoms.length === 0}
            className={`px-6 py-3 rounded-lg font-bold transition-colors flex items-center justify-center min-w-48
              ${isLoading
                ? 'bg-[#662929] text-white'
                : selectedSymptoms.length === 0
                  ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                  : 'bg-[#4a6629] text-white hover:bg-[#5a7a39]'}`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Predicting...
              </>
            ) : (
              '🧪 Predict Disease'
            )}
          </button>
         
          <button
            type="button"
            onClick={resetForm}
            className="px-6 py-3 bg-[#662929] text-white rounded-lg hover:bg-[#884848] transition-colors"
          >
            🔄 Reset Form
          </button>
        </div>
      </form>

      {/* Prediction result with animation */}
      {predictionResult && (
        <div className={`mt-8 p-6 bg-white rounded-lg shadow-lg text-center transition-all duration-300 ${predictionResult ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <h2 className="text-2xl font-bold text-[#4a6629] mb-2">
            🩺 Prediction Result:
          </h2>
          <p className="text-3xl font-semibold text-[#662929]">
            {predictionResult}
          </p>
          {!predictionResult.startsWith("Error") && (
            <p className="mt-4 text-gray-600">
              Please consult with a veterinarian for proper diagnosis and treatment.
            </p>
          )}
        </div>
      )}

      {/* Selected symptoms count */}
      <div className="mt-4 text-center text-white">
        {selectedSymptoms.length > 0 && (
          <p>Selected symptoms: {selectedSymptoms.length}</p>
        )}
      </div>
    </div>
  </div>
);

};
export default CowDiseasePredictor;

