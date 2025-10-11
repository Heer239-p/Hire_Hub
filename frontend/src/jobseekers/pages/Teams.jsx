import React from "react";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";

const teamMembers = [
  {
    name: "Hiral",
    role: "MernStack Developer",
    image: "./IMG_20220924_205006.jpg",
    linkedin: "#",
    mail: "hiralprajapati2309@gmail.com",
    github: "https://github.com/Heer239-p",
  },
  {
    name: "Dhrumi Soni",
    role: "Python Developer",
    image: "/dhrumipic.jpg",
    linkedin: "#",
    mail: "dhrumi@example.com",
    github: "#",
  },
  {
    name: "Karan Panchamiya",
    role: "UI/UX Designer",
    image: "/karnapic.jpg",
    linkedin: "#",
    mail: "karan@example.com",
    github: "#",
  },
];

const MeetOurTeam = () => {
  // function to confirm before opening Gmail
  const handleMailClick = (email) => {
    const confirmOpen = window.confirm(`Do you want to open Gmail to contact ${email}?`);
    if (confirmOpen) {
      window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${email}`, "_blank");
    }
  };

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
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-blue-600"
                  >
                    <FaLinkedin size={20} />
                  </a>
                )}
                {member.mail && (
                  <button
                    onClick={() => handleMailClick(member.mail)}
                    className="hover:text-red-500"
                    title="Send Email"
                  >
                    <FaEnvelope size={20} />
                  </button>
                )}
                {member.github && (
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-gray-900"
                  >
                    <FaGithub size={20} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MeetOurTeam;
