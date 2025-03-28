import { useState, useEffect, useRef } from 'react';
import * as tmImage from '@teachablemachine/image';
import * as tf from '@tensorflow/tfjs';
import { FiUpload, FiInfo, FiAlertTriangle, FiCheck, FiHeart } from 'react-icons/fi';

const BREED_INFO = {
  'Gir': 'Renowned dairy breed famous for its high milk yield and disease resistance.',
  'Ongole': 'A powerful draught breed known for its muscular build and endurance.',
  'Tharparkar': 'Dual-purpose breed well-adapted to arid climates and drought conditions.',
  'Red Sindhi': 'Heat-tolerant breed valued for its good milking capacity and hardiness.',
  'Sahiwal': 'One of the best Indian dairy breeds with excellent lactation performance.',
  'Deoni': 'Strong and calm breed ideal for both milk production and fieldwork.',
  'Rathi': 'Efficient milch breed from Rajasthan, appreciated for its productivity.',
  'Kankrej': 'Hardy and versatile breed used for both milk and heavy draught work.'
};

const BREED_DATA = {
  'Ongole': { my: 6, ca: 9, f: 7, dr: 9, gr: 8, avg: 7.8 },
  'Gir': { my: 7, ca: 9, f: 9, dr: 9, gr: 6, avg: 8 },
  'Tharparkar': { my: 7, ca: 8, f: 9, dr: 8, gr: 6, avg: 7.6 },
  'Red Sindhi': { my: 6, ca: 9, f: 9, dr: 8, gr: 6, avg: 7.6 },
  'Sahiwal': { my: 8, ca: 8, f: 8, dr: 9, gr: 7, avg: 8 },
  'Deoni': { my: 6, ca: 8, f: 7, dr: 9, gr: 7, avg: 7.4 },
  'Rathi': { my: 7, ca: 8, f: 8, dr: 9, gr: 7, avg: 7.8 },
  'Kankrej': { my: 6, ca: 9, f: 7, dr: 9, gr: 8, avg: 7.8 }
};

const COMPATIBILITY_SCORES = [
  { breed1: 'Ongole', breed2: 'Gir', score: 7.9 },
  { breed1: 'Ongole', breed2: 'Tharparkar', score: 7.7 },
  { breed1: 'Ongole', breed2: 'Red Sindhi', score: 7.7 },
  { breed1: 'Ongole', breed2: 'Sahiwal', score: 7.9 },
  { breed1: 'Ongole', breed2: 'Deoni', score: 7.6 },
  { breed1: 'Ongole', breed2: 'Rathi', score: 7.8 },
  { breed1: 'Ongole', breed2: 'Kankrej', score: 7.8 },
  { breed1: 'Gir', breed2: 'Tharparkar', score: 8 },
  { breed1: 'Gir', breed2: 'Red Sindhi', score: 8.1 },
  { breed1: 'Gir', breed2: 'Sahiwal', score: 8.2 },
  { breed1: 'Gir', breed2: 'Deoni', score: 7.9 },
  { breed1: 'Gir', breed2: 'Rathi', score: 8 },
  { breed1: 'Gir', breed2: 'Kankrej', score: 8.1 },
  { breed1: 'Tharparkar', breed2: 'Red Sindhi', score: 7.8 },
  { breed1: 'Tharparkar', breed2: 'Sahiwal', score: 7.9 },
  { breed1: 'Tharparkar', breed2: 'Deoni', score: 7.7 },
  { breed1: 'Tharparkar', breed2: 'Rathi', score: 7.8 },
  { breed1: 'Tharparkar', breed2: 'Kankrej', score: 7.8 },
  { breed1: 'Red Sindhi', breed2: 'Sahiwal', score: 7.9 },
  { breed1: 'Red Sindhi', breed2: 'Deoni', score: 7.6 },
  { breed1: 'Red Sindhi', breed2: 'Rathi', score: 7.7 },
  { breed1: 'Red Sindhi', breed2: 'Kankrej', score: 7.7 },
  { breed1: 'Sahiwal', breed2: 'Deoni', score: 7.8 },
  { breed1: 'Sahiwal', breed2: 'Rathi', score: 7.9 },
  { breed1: 'Sahiwal', breed2: 'Kankrej', score: 7.9 },
  { breed1: 'Deoni', breed2: 'Rathi', score: 7.6 },
  { breed1: 'Deoni', breed2: 'Kankrej', score: 7.7 },
  { breed1: 'Rathi', breed2: 'Kankrej', score: 7.8 }
];

const ImageModel = () => {
  const [model, setModel] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [imageSrc, setImageSrc] = useState('');
  const [error, setError] = useState('');
  const [showCompatibility, setShowCompatibility] = useState(false);
  const [compatibleBreed, setCompatibleBreed] = useState(null);
  const imageContainerRef = useRef(null);
  const URL = "https://teachablemachine.withgoogle.com/models/IboezDK--/";

  useEffect(() => {
    const loadModel = async () => {
      try {
        const modelURL = URL + "model.json";
        const metadataURL = URL + "metadata.json";
        const loadedModel = await tmImage.load(modelURL, metadataURL);
        setModel(loadedModel);
      } catch (err) {
        setError('Failed to load model. Please try again later.');
      }
    };
    loadModel();
  }, []);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setImageSrc(e.target.result);
      setError('');
    };
    reader.readAsDataURL(file);
  };

  const findCompatibleBreed = (currentBreed) => {
    const matches = COMPATIBILITY_SCORES.filter(pair => 
      pair.breed1 === currentBreed || pair.breed2 === currentBreed
    );
    
    if (matches.length === 0) return null;
    
    const bestMatch = matches.reduce((max, current) => 
      current.score > max.score ? current : max
    );
    
    return {
      breed: bestMatch.breed1 === currentBreed ? bestMatch.breed2 : bestMatch.breed1,
      score: bestMatch.score
    };
  };

  useEffect(() => {
    const predict = async () => {
      if (!imageSrc || !model) return;

      try {
        const img = new Image();
        img.src = imageSrc;
        img.onload = async () => {
          if (imageContainerRef.current) {
            imageContainerRef.current.innerHTML = '';
          }
          
          const imgElement = document.createElement('img');
          imgElement.src = imageSrc;
          imgElement.className = 'max-w-full h-64 object-contain rounded-lg';
          imageContainerRef.current?.appendChild(imgElement);

          const prediction = await model.predict(imgElement);
          const sortedPredictions = prediction.sort((a, b) => b.probability - a.probability);
          setPredictions(sortedPredictions);
          
          if (sortedPredictions.length > 0) {
            const match = findCompatibleBreed(sortedPredictions[0].className);
            setCompatibleBreed(match);
          }
        };
      } catch (err) {
        setError('Error processing image. Please try another one.');
      }
    };
    predict();
  }, [imageSrc, model]);

  const highestPrediction = predictions[0];
  const confidence = highestPrediction ? (highestPrediction.probability * 100).toFixed(1) : 0;
  const breedInfo = highestPrediction ? BREED_INFO[highestPrediction.className] : '';

  return (
    <section id="breed" className="mx-auto px-6 py-20 bg-white rounded-xl" data-aos="fade-up">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold mb-2 flex items-center justify-center gap-2 text-[#662929]">
          <FiInfo className="text-[#662929]" />
          Cow Breed Identification & Breeding Advisor
        </h1>
        <p className="text-gray-600">Upload an image to identify breed and get breeding recommendations</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Side - Image Upload */}
        <div className="w-full lg:w-1/2">
          <div className="mb-6">
            <label className="flex flex-col items-center px-4 py-6 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 cursor-pointer hover:border-blue-500 transition-colors h-64 justify-center">
              <FiUpload className="w-8 h-8 text-gray-500 mb-2" />
              <span className="text-gray-600 font-medium">Click to upload image</span>
              <span className="text-sm text-gray-500">PNG, JPG, JPEG (max 5MB)</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
            {error && (
              <div className="mt-2 flex items-center gap-2 text-red-500">
                <FiAlertTriangle />
                <span>{error}</span>
              </div>
            )}
          </div>

          {imageSrc && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Image Preview</h3>
              <div 
                ref={imageContainerRef} 
                className="flex justify-center items-center bg-white p-4 rounded-lg border border-gray-200"
              ></div>
            </div>
          )}
        </div>

        {/* Right Side - Results */}
        <div className="w-full lg:w-1/2">
          {predictions.length > 0 ? (
            <div className="bg-gray-50 p-6 rounded-lg h-full">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                Analysis Results
                {!model ? (
                  <span className="text-sm text-gray-500 animate-pulse">Loading model...</span>
                ) : (
                  <span className="text-sm text-[#662929] flex items-center gap-1">
                    <FiCheck /> Ready
                  </span>
                )}
              </h3>

              <div className="space-y-4">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-xl font-bold text-gray-800">
                      {highestPrediction.className}
                    </h4>
                    <span className="text-[#662929] font-bold text-lg">
                      {confidence}% Confidence
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-4">
                    {breedInfo}
                  </p>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-[#994d4d] to-[#662929] rounded-full transition-all duration-500"
                        style={{ width: `${confidence}%` }}
                      ></div>
                    </div>
                    <div className="mt-2 text-sm text-gray-500">
                      Prediction confidence level
                    </div>
                  </div>
                </div>

                {compatibleBreed && (
                  <div className="mt-4">
                    <button
                      onClick={() => setShowCompatibility(!showCompatibility)}
                      className="w-full bg-[#662929] text-white py-2 rounded-lg hover:bg-[#884848] transition-colors flex items-center justify-center gap-2"
                    >
                      <FiHeart className="w-5 h-5" />
                      {showCompatibility ? 'Hide' : 'Show'} Breeding Recommendation
                    </button>

                    {showCompatibility && (
                      <div className="mt-4 bg-white p-4 rounded-lg shadow-sm">
                        <h4 className="text-lg font-semibold mb-2">
                          Recommended Pair: {compatibleBreed.breed}
                        </h4>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-gray-600">Compatibility Score</span>
                          <span className="text-[#662929] font-bold">
                            {(compatibleBreed.score * 10).toFixed(1)}%
                          </span>
                        </div>
                        
                        <div className="bg-green-50 p-3 rounded-lg">
                          <div className="h-2 bg-gray-200 rounded-full">
                            <div 
                              className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full"
                              style={{ width: `${compatibleBreed.score * 10}%` }}
                            ></div>
                          </div>
                        </div>

                        <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                          <div className="bg-blue-50 p-2 rounded">
                            <span className="font-medium">Milk Yield:</span> 
                            {BREED_DATA[compatibleBreed.breed].my}/10
                          </div>
                          <div className="bg-orange-50 p-2 rounded">
                            <span className="font-medium">Climate Adapt:</span>
                            {BREED_DATA[compatibleBreed.breed].ca}/10
                          </div>
                          <div className="bg-purple-50 p-2 rounded">
                            <span className="font-medium">Fertility:</span>
                            {BREED_DATA[compatibleBreed.breed].f}/10
                          </div>
                          <div className="bg-red-50 p-2 rounded">
                            <span className="font-medium">Disease Res:</span>
                            {BREED_DATA[compatibleBreed.breed].dr}/10
                          </div>
                        </div>

                        <p className="mt-4 text-gray-600 text-sm">
                          {BREED_INFO[compatibleBreed.breed]}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 p-6 rounded-lg h-full flex items-center justify-center text-gray-500">
              <div className="text-center">
                <FiInfo className="w-12 h-12 mx-auto mb-4" />
                <p>Upload an image to see breed analysis</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ImageModel;