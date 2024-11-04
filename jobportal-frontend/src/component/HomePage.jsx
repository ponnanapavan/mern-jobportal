import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import React, { useEffect, useState } from 'react';

const jobs = [
  { id: 1, title: 'Software Engineer', company: 'Company ABC' },
  { id: 2, title: 'Product Designer', company: 'Company XYZ' },
  { id: 3, title: 'Data Scientist', company: 'Company LMN' },
  { id: 4, title: 'Backend Developer', company: 'Company PQR' },
  { id: 5, title: 'Frontend Developer', company: 'Company STU' },
];

const testimonials = [
  {
    text: '"JobFinder helped me land my dream job within weeks. The platform is amazing!"',
    author: 'Alex D.',
  },
  {
    text: '"The job alerts feature is fantastic! I never miss out on opportunities."',
    author: 'Sarah W.',
  },
  {
    text: '"Highly recommend JobFinder! It made my job search so much easier and faster."',
    author: 'Michael B.',
  },
];

const HomePage = () => {
  const [scrollIndex, setScrollIndex] = useState(0);

  // Automatic scrolling effect for featured jobs
  useEffect(() => {
    const intervalId = setInterval(() => {
      setScrollIndex((prevIndex) => (prevIndex + 1) % jobs.length);
    }, 3000); // change job every 3 seconds

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white text-gray-800 font-sans">
      <main className="flex flex-col">
        {/* Hero Section */}
        <section className="hero flex items-center justify-center py-24 bg-cover bg-center relative">
          <img src="/path-to-your-background.jpg" alt="Hero Background" className="absolute w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-800 to-transparent opacity-50"></div>
          <div className="container mx-auto text-center z-10">
            <h2 className="text-6xl font-extrabold text-white drop-shadow-lg">Find Your Dream Job</h2>
            <p className="text-gray-200 mt-5 text-lg max-w-lg mx-auto">Discover thousands of opportunities to advance your career.</p>
            <div className="flex justify-center mt-8">
              <Input type="text" placeholder="Job title, keywords..." className="w-1/3 px-4 py-3 text-gray-700 rounded-l-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600" />
              <Button variant="default" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-r-md transition duration-300">Search</Button>
            </div>
          </div>
        </section>

        {/* Featured Jobs Section */}
        <section className="featured-jobs bg-gray-100 py-20">
          <div className="container mx-auto text-center">
            <h3 className="text-4xl font-semibold text-gray-800 mb-10">Featured Jobs</h3>
            <div className="overflow-hidden relative">
              <div
                className="flex transition-transform duration-500"
                style={{
                  transform: `translateX(-${scrollIndex * 100}%)`,
                }}
              >
                {jobs.map((job) => (
                  <Card key={job.id} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-transform duration-300 transform hover:scale-105 text-left border border-gray-200 w-full min-w-full mx-4">
                    <h4 className="text-2xl font-semibold text-blue-600">{job.title}</h4>
                    <p className="text-gray-600 mt-2">{job.company}</p>
                    <Button className="mt-6 bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg transition duration-300 w-full">Apply Now</Button>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="testimonials bg-gradient-to-b from-white to-gray-100 py-20">
          <div className="container mx-auto text-center">
            <h3 className="text-4xl font-semibold text-gray-800 mb-10">What Our Users Say</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <Card key={testimonial.text} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-transform duration-300 transform hover:scale-105 text-left border border-gray-200">
                  <p className="text-gray-600 italic">{testimonial.text}</p>
                  <h4 className="mt-6 text-blue-600 font-semibold text-lg">{testimonial.author}</h4>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Subscribe Section */}
        <section className="subscribe bg-blue-50 py-20">
          <div className="container mx-auto text-center">
            <h3 className="text-4xl font-semibold text-blue-700">Stay Updated</h3>
            <p className="text-gray-700 mt-4 max-w-xl mx-auto">Subscribe to our newsletter to receive the latest job opportunities directly in your inbox.</p>
            <div className="flex justify-center mt-8">
              <Input type="email" placeholder="Enter your email..." className="w-1/3 px-4 py-3 text-gray-700 rounded-l-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600" />
              <Button variant="default" className="bg-blue-700 hover:bg-blue-600 text-white px-6 py-3 rounded-r-md transition duration-300">Subscribe</Button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-100 py-10 mt-12">
          <div className="container mx-auto text-center text-gray-500">
            <p>&copy; 2024 JobFinder. All rights reserved.</p>
            <div className="space-x-4 mt-5">
              <a href="#privacy" className="hover:text-gray-700 transition duration-300">Privacy Policy</a>
              <a href="#terms" className="hover:text-gray-700 transition duration-300">Terms of Service</a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default HomePage;
