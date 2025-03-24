import React from 'react';

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-[#662929] text-white" data-aos="fade-up">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Contact Us</h2>
          <hr className="w-40 mx-auto border-t-2 border-white" />
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3">
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Our Location</h3>
              <p>Manhattan, New York, NY, United States</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span>999-7777-000</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span>manowarashna@gmail.com</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <span>Mon-Fri - 08:00-19:00</span>
              </div>
            </div>
          </div>

          <div className="md:w-2/3">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <input 
                    type="text" 
                    placeholder="Name" 
                    className="w-full px-4 py-3 rounded bg-white border  focus:outline-none focus:ring-2 focus:ring-[#AF4646] text-[#662929]"
                    required
                  />
                </div>
                <div>
                  <input 
                    type="text" 
                    placeholder="Phone" 
                    className="w-full px-4 py-3 rounded bg-white border  focus:outline-none focus:ring-2 focus:ring-[#AF4646] text-[#662929]"
                  />
                </div>
                <div>
                  <input 
                    type="email" 
                    placeholder="Email address" 
                    className="w-full px-4 py-3 rounded bg-white border  focus:outline-none focus:ring-2 focus:ring-[#AF4646] text-[#662929]"
                    required
                  />
                </div>
              </div>
              <div>
                <textarea 
                  placeholder="Message" 
                  className="w-full px-4 py-3 rounded bg-white border  focus:outline-none focus:ring-2 focus:ring-[#AF4646] min-h-[100px] text-[#662929]"
                ></textarea>
              </div>
              <div className="text-center">
                <button 
                  type="submit" 
                  className="px-8 py-3 bg-[#662929] border border-white border-2 text-white font-bold rounded hover:bg-[#AF4646] transition-colors"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;