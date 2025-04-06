import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
const EduContent = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const navigate = useNavigate();
  const cowBreeds = [
    {
      name: "Ongole",
      image: "onogle.png",
      description:
        "A powerful draught breed known for its muscular build and endurance.",
    },
    {
      name: "Gir",
      image: "gir.png",
      description:
        "Renowned dairy breed famous for its high milk yield and disease resistance.",
    },
    {
      name: "Tharparkar",
      image: "Tharparkar.png",
      description:
        "Dual-purpose breed well-adapted to arid climates and drought conditions.",
    },
    {
      name: "Red Sindhi",
      image: "Red Sindhi.png",
      description:
        "Heat-tolerant breed valued for its good milking capacity and hardiness.",
    },
    {
      name: "Sahiwal",
      image: "Sahiwal.png",
      description:
        "One of the best Indian dairy breeds with excellent lactation performance.",
    },
    {
      name: "Deoni",
      image: "Deoni.png",
      description:
        "Strong and calm breed ideal for both milk production and fieldwork.",
    },
    {
      name: "Rathi",
      image: "Rathi.png",
      description:
        "Efficient milch breed from Rajasthan, appreciated for its productivity.",
    },
    {
      name: "Kankrej",
      image: "Kankrej.png",
      description:
        "Hardy and versatile breed used for both milk and heavy draught work.",
    },
  ];


  const scrollToHomeSection = (sectionId) => {
    navigate("/");
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        window.scrollTo({ top: element.offsetTop - 100, behavior: "smooth" });
      }
    }, 500);
  };
  const nextCards = () => {
    setStartIndex((prev) => (prev + 1) % cowBreeds.length);
  };
  const prevCards = () => {
    setStartIndex((prev) => (prev - 1 + cowBreeds.length) % cowBreeds.length);
  };
  const navbarVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
  };
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeInOut" },
    },
  };
  const buttonVariants = {
    hover: { scale: 1.1, transition: { duration: 0.2 } },
  };
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* Navbar */}
      <motion.header
        className="fixed w-full z-50 bg-white shadow-md"
        variants={navbarVariants}
        initial="hidden"
        animate="visible"
      >
        <nav
          className="hidden md:flex container mx-auto px-4 py-4 flex justify-between items
center"
        >
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
                className="text-[#662929] font-medium hover:underline hover:scale-110 transition
transform duration-200"
                variants={buttonVariants}
                whileHover="hover"
              >
                {item}
              </motion.button>
            ))}
            <button
              onClick={() => navigate("/eduContent")}
              className="bg-[#662929] text-white px-4 py-2 rounded-md hover:bg-[#884848]
transition duration-200"
            >
              EduContent
            </button>
            {/* Dashboard Button */}
            <button
              onClick={() => navigate("/Dashboard")}
              className="bg-[#662929] text-white px-4 py-2 rounded-md hover:bg-[#884848]
transition duration-200"
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
        <nav
          className="md:hidden bg-white shadow-md py-4 px-4 flex justify-between items
center"
        >
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
                className="block text-[#662929] font-medium py-2 hover:underline hover:scale-110
transition-transform duration-200"
                variants={buttonVariants}
                whileHover="hover"
              >
                {item}
              </motion.button>
            ))}
            <button
              onClick={() => navigate("/Dashboard")}
              className="bg-[#662929] text-white px-4 py-2 rounded-md hover:bg-[#884848]
transition duration-200 w-full mt-2"
            >
              Dashboard
            </button>
            <button
              onClick={() => navigate("/eduContent")}
              className="bg-[#662929] text-white px-4 py-2 rounded-md hover:bg-[#884848]
transition duration-200 w-full mt-2"
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
      {/* Cow Breeds Section */}
      <motion.section
        className="bg-white shadow-lg rounded-xl p-6 md:p-8 mb-10 mt-24 mx-4 md:mx-8"
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
      >
        <h2 className="text-2xl md:text-3xl font-semibold text-[#662929] mb-6 text-center">
          Indian Cow Breeds
        </h2>
        <div className="relative flex items-center justify-center w-full">
          {/* Previous Button */}
          <motion.button
            onClick={prevCards}
            className="absolute left-2 md:left-0 px-3 py-2 bg-[#662929] text-white rounded-md
hover:bg-opacity-80 transition z-10"
            variants={buttonVariants}
            whileHover="hover"
          >
            ❮
          </motion.button>
          {/* Carousel Cards */}
          <motion.div
            key={startIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex space-x-4 w-full overflow-x-auto md:overflow-hidden justify-start
md:justify-center px-8 md:px-0"
          >
            {cowBreeds
              .slice(
                startIndex,
                startIndex +
                  (window.innerWidth < 768
                    ? 1
                    : window.innerWidth < 1024
                    ? 2
                    : 3)
              )
              .map((breed, index) => (
                <motion.div
                  key={index}
                  className="w-64 md:w-72 lg:w-80 flex-shrink-0 bg-gray-100 p-4 md:p-6 rounded-xl
shadow-md text-center flex flex-col items-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ scale: 1.03 }}
                >
                  <div
                    className="w-full h-40 md:h-48 mb-4 overflow-hidden rounded-lg border-4
border-[#662929]"
                  >
                    <img
                      src={breed.image}
                      alt={breed.name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <h3 className="text-xl md:text-2xl font-semibold text-[#662929]">
                    {breed.name}
                  </h3>
                  <p className="text-gray-700 mt-2 text-sm md:text-base">
                    {breed.description}
                  </p>
                </motion.div>
              ))}
          </motion.div>
          {/* Next Button */}
          <motion.button
            onClick={nextCards}
            className="absolute right-2 md:right-0 px-3 py-2 bg-[#662929] text-white rounded-md
hover:bg-opacity-80 transition z-10"
            variants={buttonVariants}
            whileHover="hover"
          >
            ❯
          </motion.button>
        </div>
      </motion.section>
      {/* Content Sections */}
      <div className="my-12 grid md:grid-cols-2 gap-6 px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="bg-[#dab3b3] rounded-2xl p-6 md:p-8 shadow-lg col-span-full
hover:shadow-xl transition-shadow duration-300"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#662929] mb-4">
            Reviving the Legacy of Indian Cows
          </h2>
          <h3 className="text-xl md:text-2xl font-semibold text-[#662929] mb-4">
            Why is the Conservation of Indian Cows Important?
          </h3>
          <p className="mb-4 text-[#4b2c2c] leading-relaxed">
            The Indian cow has been an integral part of the country's
            agricultural and cultural heritage for centuries. Indigenous breeds
            contribute significantly to sustainable agriculture, traditional
            medicine, and rural livelihoods. However, rapid urbanization and
            industrialization have led to a decline in their population and
            genetic diversity.
          </p>
          <p className="mb-4 text-[#4b2c2c] leading-relaxed">
            This loss has negatively impacted soil fertility, food quality, and
            the economic stability of farmers. Conservation efforts are
            essential to preserve these breeds and leverage their benefits for a
            more sustainable future.
          </p>
          <a
            href="https://dahd.maharashtra.gov.in/en/"
            className="text-[#662929] underline font-semibold hover:text-[#4d1f1f] transition
colors duration-200"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn more about the importance of indigenous cattle
          </a>
        </motion.div>
        {/* Other content sections remain the same with responsive padding */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-gray-200
hover:shadow-xl transition-shadow duration-300"
        >
          <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#662929] mb-4">
            Raising Awareness
          </h3>
          <p className="mb-4 text-gray-700 leading-relaxed">
            Educating farmers, policymakers, and the general public about the
            benefits of indigenous cow breeds is crucial for their conservation.
            Awareness initiatives can include training programs for farmers,
            workshops on organic farming, and the promotion of cow-based
            products.
          </p>
          <p className="mb-4 text-gray-700 leading-relaxed">
            Social media campaigns and educational modules in schools and
            universities can also help spread knowledge about the economic and
            environmental advantages of these breeds. Highlighting success
            stories of farmers who have benefited from indigenous cattle can
            encourage wider adoption.
          </p>
          <a
            href="https://www.india.gov.in/information-schemes-department-animal-husbandry-dairying-and-fisheries"
            className="text-[#662929] underline font-semibold hover:text-[#4d1f1f] transition
colors duration-200"
            target="_blank"
            rel="noopener noreferrer"
          >
            Cow conservation and awareness programs
          </a>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-gray-200
hover:shadow-xl transition-shadow duration-300"
        >
          <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#662929] mb-4">
            Enhancing Breeding Programs
          </h3>
          <p className="mb-4 text-gray-700 leading-relaxed">
            Genetic conservation and selective breeding play a significant role
            in improving the productivity and longevity of indigenous breeds.
            Establishing Gaushalas and dedicated cow sanctuaries can help
            protect and nurture these breeds.
          </p>
          <p className="mb-4 text-gray-700 leading-relaxed">
            The use of artificial insemination and advanced reproductive
            technologies such as in-vitro fertilization (IVF) can enhance
            breeding efficiency and ensure better-quality livestock. Educating
            farmers on proper breeding techniques and providing access to
            veterinary support can further strengthen these efforts.
          </p>
          <div className="space-y-2">
            <a
              href="https://www.djjs.org/kamdhenu/initiatives/kamdhenu-care"
              className="text-[#662929] underline font-semibold hover:text-[#4d1f1f] transition
colors duration-200 block"
              target="_blank"
              rel="noopener noreferrer"
            >
              National Kamdhenu Breeding Program
            </a>
            <a
              href="https://agriculture.vikaspedia.in/viewcontent/agriculture/livestock/cattle-buffalo/breeding-management-1/importance-of-artificial-insemination-in-dairy-farming?lgn=en"
              className="text-[#662929] underline font-semibold hover:text-[#4d1f1f] transition
colors duration-200 block"
              target="_blank"
              rel="noopener noreferrer"
            >
              Artificial insemination and genetic improvement
            </a>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-gray-200 col
span-full hover:shadow-xl transition-shadow duration-300 col-span-full"
        >
          <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#662929] mb-4">
            Promoting the Socio-Economic and Environmental Benefits
          </h3>
          <p className="mb-4 text-gray-700 leading-relaxed">
            Indigenous cows offer multiple socio-economic and environmental
            advantages. Cow-based products such as organic fertilizers,
            Ayurvedic medicines, and biogas fuel contribute to sustainable
            livelihoods.
          </p>
          <p className="mb-4 text-gray-700 leading-relaxed">
            Farmers can benefit from value-added products such as cow dung-based
            fertilizers and cow urine-based medicines, which provide additional
            sources of income.
          </p>
          <p className="mb-4 text-gray-700 leading-relaxed">
            Environmentally, cow dung is an excellent natural fertilizer that
            enhances soil fertility and reduces dependence on chemical
            alternatives. Additionally, cow waste can be utilized for biogas
            production, providing a renewable energy source that supports
            sustainable rural development.
          </p>
          <p className="mb-4 text-gray-700 leading-relaxed">
            Grazing lands for indigenous cattle also contribute to carbon
            sequestration, helping mitigate climate change.
          </p>
          <div className="space-y-2">
            <a
              href="https://dahd.gov.in/schemes-programmes"
              className="text-[#662929] underline font-semibold hover:text-[#4d1f1f] transition
colors duration-200 block"
              target="_blank"
              rel="noopener noreferrer"
            >
              Government schemes for indigenous cow breeders
            </a>
            <a
              href="https://dahd.gov.in/schemes-programmes"
              className="text-[#662929] underline font-semibold hover:text-[#4d1f1f] transition
colors duration-200 block"
              target="_blank"
              rel="noopener noreferrer"
            >
              Role of cows in sustainable agriculture
            </a>
            <a
              href="https://krishnadhamgaushala.org/cow-values-and-importance-in-india/"
              className="text-[#662929] underline font-semibold hover:text-[#4d1f1f] transition
colors duration-200 block"
              target="_blank"
              rel="noopener noreferrer"
            >
              Biogas from cow dung as a renewable energy source
            </a>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
          className="bg-[#dab3b3] rounded-2xl p-6 md:p-8 shadow-lg col-span-full
hover:shadow-xl transition-shadow duration-300"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#662929] mb-4">
            How Can You Contribute?
          </h2>
          <p className="mb-4 text-[#3d2e2e] leading-relaxed">
            Individuals and organizations can play a key role in conserving and
            promoting indigenous cow breeds. Farmers can adopt sustainable
            practices and integrate cow-based solutions into their agricultural
            activities. Businesses and researchers can invest in developing
            innovative products that utilize cow-based resources. Policymakers
            can support initiatives that provide financial and technical
            assistance to farmers.
          </p>
          <p className="mb-4 text-[#3d2e2e] leading-relaxed">
            To make a lasting impact, people can participate in government
            programs, support local Gaushalas, and raise awareness about the
            benefits of indigenous breeds. By working together, it is possible
            to restore the significance of the Indian cow in sustainable
            agriculture and rural development.
          </p>
          <a
            href="https://www.djjs.org/kamdhenu"
            className="text-[#662929] underline font-semibold hover:text-[#4d1f1f] transition
colors duration-200"
            target="_blank"
            rel="noopener noreferrer"
          >
            Join the Kamdhenu Program
          </a>
        </motion.div>
      </div>
      {/* Dataset for Selected Indian Cow Breeds */}
      <motion.section
        className="bg-white shadow-lg rounded-xl p-4 md:p-6 lg:p-8 mt-8 mx-4 md:mx-8"
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
      >
        <h2
          className="text-xl md:text-2xl lg:text-3xl font-semibold text-[#662929] mb-6 text
center"
        >
          Breed Compatibility Overview for selected Indian Cow Breeds
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-[#a75a5a] rounded-lg overflow-hidden">
            <thead className="bg-[#662929] text-white">
              <tr>
                <th className="px-3 py-2 md:px-4 md:py-3 text-left">Breed</th>
                <th className="px-3 py-2 md:px-4 md:py-3">MY</th>
                <th className="px-3 py-2 md:px-4 md:py-3">CA</th>
                <th className="px-3 py-2 md:px-4 md:py-3">F</th>
                <th className="px-3 py-2 md:px-4 md:py-3">DR</th>
                <th className="px-3 py-2 md:px-4 md:py-3">GR</th>
                <th className="px-3 py-2 md:px-4 md:py-3">Avg. Score</th>
              </tr>
            </thead>
            <tbody className="text-[#662929]">
              {[
                { breed: "Ongole", MY: 6, CA: 9, F: 7, DR: 9, GR: 8, avg: 7.8 },
                { breed: "Gir", MY: 7, CA: 9, F: 9, DR: 9, GR: 6, avg: 8.0 },
                {
                  breed: "Tharparkar",
                  MY: 7,
                  CA: 8,
                  F: 9,
                  DR: 8,
                  GR: 6,
                  avg: 7.6,
                },
                {
                  breed: "Red Sindhi",
                  MY: 6,
                  CA: 9,
                  F: 9,
                  DR: 8,
                  GR: 6,
                  avg: 7.6,
                },
                {
                  breed: "Sahiwal",
                  MY: 8,
                  CA: 8,
                  F: 8,
                  DR: 9,
                  GR: 7,
                  avg: 8.0,
                },
                { breed: "Deoni", MY: 6, CA: 8, F: 7, DR: 9, GR: 7, avg: 7.4 },
                { breed: "Rathi", MY: 7, CA: 8, F: 8, DR: 9, GR: 7, avg: 7.8 },
                {
                  breed: "Kankrej",
                  MY: 6,
                  CA: 9,
                  F: 7,
                  DR: 9,
                  GR: 8,
                  avg: 7.8,
                },
              ].map((cow, i) => (
                <motion.tr
                  key={cow.breed}
                  className={`${
                    i % 2 === 0 ? "bg-[#fbeeee]" : "bg-white"
                  } transition-all hover:bg-[#f6dcdc]`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <td className="px-3 py-2 md:px-4 md:py-3 font-medium">
                    {cow.breed}
                  </td>
                  <td className="px-3 py-2 md:px-4 md:py-3 text-center">
                    {cow.MY}
                  </td>
                  <td className="px-3 py-2 md:px-4 md:py-3 text-center">
                    {cow.CA}
                  </td>
                  <td className="px-3 py-2 md:px-4 md:py-3 text-center">
                    {cow.F}
                  </td>
                  <td className="px-3 py-2 md:px-4 md:py-3 text-center">
                    {cow.DR}
                  </td>
                  <td className="px-3 py-2 md:px-4 md:py-3 text-center">
                    {cow.GR}
                  </td>
                  <td className="px-3 py-2 md:px-4 md:py-3 text-center font-semibold">
                    {cow.avg}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.section>
      <p
        className="mt-8 p-4 md:p-6 bg-[#f9f3f3] rounded-xl shadow text-[#662929] text-sm
md:text-base lg:text-lg text-center mx-4 md:mx-8"
      >
        The compatibility score is calculated based on:{" "}
        <strong>Milk Yield (30%)</strong>,{" "}
        <strong>Climate Adaptability (20%)</strong>,{" "}
        <strong>Fertility (20%)</strong>,{" "}
        <strong>Disease Resistance (15%)</strong>,{" "}
        <strong>Growth Rate (15%)</strong>.
      </p>
      {/* Footer */}
      <motion.footer
        className="bg-white text-black py-8 md:py-12 mt-12"
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
      >
        <div
          className="container mx-auto px-4 flex flex-col md:flex-row justify-between items
center"
        >
          <div className="mb-6 md:mb-0">
            <h2 className="text-xl md:text-2xl font-bold text-[#662929] mb-2">
              MooMatch
            </h2>
            <p className="text-xs md:text-sm text-[#662929]">
              Copyright © 2025 All rights reserved
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 lg:gap-8">
            {["Home", "About", "Breed", "Contact"].map((item, index) => (
              <motion.button
                key={index}
                onClick={() =>
                  item === "Home"
                    ? navigate("/")
                    : scrollToHomeSection(item.toLowerCase())
                }
                className="text-[#662929] hover:underline transition-colors text-sm md:text-base"
                variants={buttonVariants}
                whileHover="hover"
              >
                {item}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.footer>
    </div>
  );
};
export default EduContent;



