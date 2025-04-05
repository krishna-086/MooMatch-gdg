import React, { useState } from 'react';
import { FaShoppingCart, FaPlus, FaMinus, FaTrash } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Marketplace = () => {
  const [activeTab, setActiveTab] = useState('fodder');
  const [cartVisible, setCartVisible] = useState(false);
  const [products, setProducts] = useState([
    { id: 1, name: 'Dry Fodder', description: 'High-quality nutritious dry fodder for cattle', price: 150, inStock: true, category: 'fodder', image: '/Fodder.png' },
    { id: 2, name: 'Green Grass', description: 'Fresh organic grass for optimal cow health', price: 80, inStock: true, category: 'fodder', image: '/grass.png' },
    { id: 3, name: 'Gir Cow', description: 'Premium Indian Gir breed with high milk yield', price: 35000, inStock: true, category: 'cow', image: '/gir1.png' },
    { id: 4, name: 'Sahiwal Cow', description: 'Pure Sahiwal breed known for milk quality', price: 40000, inStock: true, category: 'cow', image: '/sahiwal1.png' },
  ]);
  const [cart, setCart] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: 'fodder',
    inStock: true,
    image: ''
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleCart = () => setCartVisible(!cartVisible);

  const filteredProducts = activeTab === 'all'
    ? products
    : products.filter(p => p.category === activeTab);

  const addToCart = (product) => {
    const exist = cart.find(item => item.id === product.id);
    if (exist) {
      setCart(cart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    const product = {
      id: products.length + 1,
      ...newProduct,
      price: Number(newProduct.price),
    };
    setProducts([...products, product]);
    setNewProduct({
      name: '',
      description: '',
      price: '',
      category: 'fodder',
      inStock: true,
      image: ''
    });
    setShowAddForm(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewProduct(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const updateQuantity = (id, delta) => {
    setCart(cart.map(item =>
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const scrollToHomeSection = (sectionId) => {
    navigate("/");
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        window.scrollTo({ top: element.offsetTop - 100, behavior: "smooth" });
      }
    }, 500);
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
    hover: { scale: 1.05, transition: { duration: 0.2 } },
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Fixed Navbar - Original Color Scheme */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md"
        variants={navbarVariants}
        initial="hidden"
        animate="visible"
      >
        <nav className="hidden md:flex container mx-auto px-4 py-4 justify-between items-center">
          <motion.button
            onClick={() => navigate("/")}
            className="text-2xl font-bold text-[#662929]"
            whileHover={{ scale: 1.05 }}
          >
            MooMarket
          </motion.button>
          <div className="flex space-x-8 items-center">
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
            <button
              onClick={() => navigate("/Dashboard")}
              className="bg-[#662929] text-white px-4 py-2 rounded-md hover:bg-[#884848] transition duration-200"
            >
              Dashboard
            </button>
            <button
              onClick={toggleCart}
              className="text-[#662929] text-xl relative ml-4"
            >
              <FaShoppingCart />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#662929] text-white rounded-full text-xs px-1.5 py-0.5 font-bold">
                  {cart.length}
                </span>
              )}
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
            MooMarket
          </motion.button>
          <div className="flex items-center">
            <button
              onClick={toggleCart}
              className="text-[#662929] text-xl relative mr-4"
            >
              <FaShoppingCart />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#662929] text-white rounded-full text-xs px-1.5 py-0.5 font-bold">
                  {cart.length}
                </span>
              )}
            </button>
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
          </div>
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
            {["Home", "About", "Breed", "Contact"].map(
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
              onClick={() => {
                setIsMenuOpen(false);
                navigate("/Dashboard");
              }}
              className="bg-[#662929] text-white px-4 py-2 rounded-md hover:bg-[#884848] transition duration-200 w-full mt-2"
            >
              Dashboard
            </button>
            <button
              onClick={() => {
                setIsMenuOpen(false);
                navigate("/eduContent");
              }}
              className="bg-[#662929] text-white px-4 py-2 rounded-md hover:bg-[#884848] transition duration-200 w-full mt-2"
            >
              EduContent
            </button>
          </motion.div>
        )}
      </motion.header>

      {/* Main Content */}
      <div className="mt-12 pb-12">
        {/* Header Section */}
        <div className="bg-[#662929] text-white py-12 px-6 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">MooMarket</h1>
          <p className="text-xl opacity-90">Premium cattle feed and livestock marketplace</p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center my-8">
          {['fodder', 'cow', 'all'].map(tab => (
            <motion.button
              key={tab}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 mx-2 rounded-lg font-semibold ${
                activeTab === tab
                  ? 'bg-[#662929] text-white shadow-md'
                  : 'bg-white text-[#662929] border border-[#662929]'
              } transition-all`}
            >
              {tab === 'fodder' ? 'Fodder' : tab === 'cow' ? 'Cows' : 'All Products'}
            </motion.button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map(product => (
              <motion.div
                key={product.id}
                whileHover={{ y: -5 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow"
              >
                <div className="h-48 bg-gray-100 overflow-hidden">
                  {product.image ? (
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <span>No Image</span>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-[#662929] mb-1">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <p className="text-xl font-bold text-[#662929]">₹{product.price.toLocaleString()}</p>
                    <button
                      onClick={() => addToCart(product)}
                      className="bg-[#662929] text-white px-4 py-2 rounded-lg hover:bg-[#884848] transition"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Full-width Add Product Form */}
        <div className="w-full px-6 mt-12">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-[#662929]">
                {showAddForm ? 'Add New Product' : 'Manage Products'}
              </h2>
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className={`px-4 py-2 rounded-lg font-medium ${
                  showAddForm 
                    ? 'bg-gray-200 text-[#662929] hover:bg-gray-300'
                    : 'bg-[#662929] text-white hover:bg-[#884848]'
                } transition`}
              >
                {showAddForm ? 'Cancel' : 'Add Product'}
              </button>
            </div>

            <AnimatePresence>
              {showAddForm && (
                <motion.form
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  onSubmit={handleAddProduct}
                  className="overflow-hidden"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-[#662929] mb-1">Product Name</label>
                      <input
                        type="text"
                        name="name"
                        value={newProduct.name}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#662929] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#662929] mb-1">Price (₹)</label>
                      <input
                        type="number"
                        name="price"
                        value={newProduct.price}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#662929] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#662929] mb-1">Category</label>
                      <select
                        name="category"
                        value={newProduct.category}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#662929] focus:border-transparent"
                      >
                        <option value="fodder">Fodder</option>
                        <option value="cow">Cow</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#662929] mb-1">Image URL</label>
                      <input
                        type="text"
                        name="image"
                        value={newProduct.image}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#662929] focus:border-transparent"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-[#662929] mb-1">Description</label>
                      <textarea
                        name="description"
                        value={newProduct.description}
                        onChange={handleChange}
                        required
                        rows={3}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#662929] focus:border-transparent"
                      />
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        name="inStock"
                        checked={newProduct.inStock}
                        onChange={handleChange}
                        className="h-5 w-5 text-[#662929] rounded focus:ring-[#662929]"
                      />
                      <label className="ml-2 text-sm text-[#662929]">In Stock</label>
                    </div>
                  </div>
                  <div className="mt-6">
                    <button
                      type="submit"
                      className="w-full bg-[#662929] text-white py-3 rounded-lg font-medium hover:bg-[#884848] transition"
                    >
                      Add Product
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {cartVisible && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="fixed top-20 right-0 h-[calc(100vh-5rem)] w-full md:w-96 bg-white shadow-xl z-40 overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-[#662929]">Your Cart</h2>
                <button 
                  onClick={toggleCart}
                  className="text-gray-500 hover:text-[#884848]"
                >
                  ✕
                </button>
              </div>
              
              {cart.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">Your cart is empty</p>
                  <button
                    onClick={toggleCart}
                    className="bg-[#662929] text-white px-6 py-2 rounded-lg hover:bg-[#884848] transition"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <>
                  <div className="space-y-4">
                    {cart.map(item => (
                      <div key={item.id} className="flex justify-between items-start border-b pb-4">
                        <div className="flex-1">
                          <h3 className="font-semibold text-[#662929]">{item.name}</h3>
                          <p className="text-sm text-gray-600">₹{item.price.toLocaleString()}</p>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center border rounded-lg">
                            <button 
                              onClick={() => updateQuantity(item.id, -1)}
                              className="px-3 py-1 text-[#662929] hover:bg-gray-100"
                            >
                              <FaMinus size={12} />
                            </button>
                            <span className="px-2">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, 1)}
                              className="px-3 py-1 text-[#662929] hover:bg-gray-100"
                            >
                              <FaPlus size={12} />
                            </button>
                          </div>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 pt-4 border-t">
                    <div className="flex justify-between text-lg font-bold text-[#662929]">
                      <span>Total:</span>
                      <span>₹{total.toLocaleString()}</span>
                    </div>
                    <button
                      className="w-full bg-[#662929] text-white py-3 rounded-lg font-medium hover:bg-[#662929] transition mt-6"
                    >
                      Proceed to Checkout
                    </button>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Marketplace;