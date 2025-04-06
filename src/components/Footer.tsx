
import React from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Column */}
          <div>
            <Logo />
            <p className="mt-4 text-gray-600">
              HealHub is dedicated to providing exceptional healthcare services with a focus on patient comfort 
              and well-being. Our team of expert doctors and staff are committed to delivering the highest 
              standard of medical care.
            </p>
            <div className="flex mt-4 space-x-4">
              <a href="#" className="text-gray-600 hover:text-purple-600">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-purple-600">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-purple-600">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-purple-600">Home</Link>
              </li>
              <li>
                <Link to="/doctors" className="text-gray-600 hover:text-purple-600">Our Doctors</Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-600 hover:text-purple-600">Services</Link>
              </li>
              <li>
                <Link to="/appointments" className="text-gray-600 hover:text-purple-600">Book Appointment</Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li className="text-gray-600 hover:text-purple-600">General Checkups</li>
              <li className="text-gray-600 hover:text-purple-600">Specialized Consultations</li>
              <li className="text-gray-600 hover:text-purple-600">Preventive Care</li>
              <li className="text-gray-600 hover:text-purple-600">Emergency Services</li>
              <li className="text-gray-600 hover:text-purple-600">Telemedicine</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-purple-600 mr-2 mt-0.5" />
                <span className="text-gray-600">123 Healthcare Avenue, Medical District, City, Country</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-purple-600 mr-2" />
                <span className="text-gray-600">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-purple-600 mr-2" />
                <span className="text-gray-600">info@healhub.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-300 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm">
              © {new Date().getFullYear()} HealHub. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0">
              <ul className="flex space-x-6">
                <li>
                  <a href="#" className="text-gray-600 hover:text-purple-600 text-sm">Privacy Policy</a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-purple-600 text-sm">Terms of Service</a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-purple-600 text-sm">Cookie Policy</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
