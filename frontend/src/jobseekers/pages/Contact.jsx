import React, { useState } from "react";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    rating: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message || !formData.rating) {
      toast.error("Please fill all fields!");
      return;
    }

    // Get existing reviews from localStorage
    const existingReviews = JSON.parse(localStorage.getItem("userReviews")) || [];

    // Add new review
    const newReview = {
      name: formData.name,
      role: "User", // you can make dynamic if needed
      rating: parseInt(formData.rating),
      comment: formData.message,
    };

    localStorage.setItem("userReviews", JSON.stringify([...existingReviews, newReview]));
    toast.success("Your review has been submitted!");

    // Reset form
    setFormData({ name: "", email: "", message: "", rating: "" });
  };

  return (
    <section className="bg-gray-50 py-20 px-6 md:px-0 flex justify-center items-center">
      <ToastContainer />
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-lg border border-gray-100 p-10">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-[#0b132b] mb-3">Get in Touch</h2>
          <p className="text-gray-600 text-lg">
            Have questions? We'd love to hear from you! Fill out the form or reach us below.
          </p>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="flex items-start space-x-3">
            <MapPin className="w-6 h-6 text-blue-500" />
            <p className="text-gray-700">
              <strong>Address:</strong><br />
              40- Nita Park Society Jogheshwari Road Amraiwadi  Ahmedabad, India
            </p>
          </div>

          <div className="flex items-start space-x-3">
            <Phone className="w-6 h-6 text-blue-500" />
            <p className="text-gray-700">
              <strong>Phone:</strong><br />
              +91 8799257940
            </p>
          </div>

          <div className="flex items-start space-x-3">
            <Mail className="w-6 h-6 text-blue-500" />
            <p className="text-gray-700">
              <strong>Email:</strong><br />
              heerprajapati173@gmail.com
            </p>
          </div>

          <div className="flex items-start space-x-3">
            <Clock className="w-6 h-6 text-blue-500" />
            <p className="text-gray-700">
              <strong>Working Hours:</strong><br />
              Mon - Fri: 10:00 AM – 7:00 PM
            </p>
          </div>
        </div>

        {/* Form Section */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Message</label>
            <textarea
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              placeholder="Write your message..."
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            ></textarea>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Your Rating</label>
            <select
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            >
              <option value="" disabled>Select rating</option>
              <option value="5">★★★★★ - Excellent</option>
              <option value="4">★★★★ - Very Good</option>
              <option value="3">★★★ - Good</option>
              <option value="2">★★ - Fair</option>
              <option value="1">★ - Poor</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-200"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
