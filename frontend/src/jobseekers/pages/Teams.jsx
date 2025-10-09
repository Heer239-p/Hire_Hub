import React from "react";
import { FaLinkedin, FaTwitter, FaGithub } from "react-icons/fa";

const teamMembers = [
  {
    name: "Hiral",
    role: "MernStack Developer",
    image: "./IMG_20220924_205006.jpg",
    linkedin: "#",
    twitter: "#",
    github: "#",
  },
  {
    name: "Dhrumi Soni",
    role: "Backend Developer",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    linkedin: "#",
    twitter: "#",
    github: "#",
  },
  {
    name: "Priya Shah",
    role: "UI/UX Designer",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    linkedin: "#",
    twitter: "#",
    github: "#",
  }
];

const MeetOurTeam = () => {
  return (
    <section className="bg-gray-50 py-8 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Meet Our Team</h2>
        <p className="text-gray-600 mb-12">
          Our talented team works hard to deliver the best experience.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl shadow-lg p-6 flex flex-col items-center transition transform hover:-translate-y-2 hover:shadow-2xl"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-blue-400"
              />
              <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
              <p className="text-gray-500 mb-4">{member.role}</p>
              <div className="flex space-x-4 text-gray-500">
                <a href={member.linkedin} target="_blank" rel="noreferrer" className="hover:text-blue-600">
                  <FaLinkedin size={20} />
                </a>
                <a href={member.twitter} target="_blank" rel="noreferrer" className="hover:text-blue-400">
                  <FaTwitter size={20} />
                </a>
                <a href={member.github} target="_blank" rel="noreferrer" className="hover:text-gray-900">
                  <FaGithub size={20} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MeetOurTeam;
