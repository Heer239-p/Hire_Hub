import React from "react";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";

const teamMembers = [
  {
    name: "Hiral Prajapati",
    role: "MernStack Developer",
    linkedin: "https://www.linkedin.com/in/hiral-prajapati-17b10434b",
    mail: "hiralprajapati2309@gmail.com",
    github: "https://github.com/Heer239-p",
  },
  {
    name: "Dhrumi Soni",
    role: "Python Developer",
    linkedin: "https://www.linkedin.com/in/dhrumi-soni", // Placeholder - please update with actual link
    mail: "dhrumi@example.com",
    github: "https://github.com/dhrumisoni", // Placeholder - please update with actual link
  },
  {
    name: "Karan Panchamiya",
    role: "UI/UX Designer",
    linkedin: "https://www.linkedin.com/in/karan-panchamiya", // Placeholder - please update with actual link
    mail: "karan@example.com",
    github: "https://github.com/karanpanchamiya", // Placeholder - please update with actual link
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
    <section className="bg-gradient-to-br from-blue-50 to-indigo-50 py-16 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
        <p className="text-gray-600 mb-12 text-lg">
          Our talented team works hard to deliver the best experience.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-100"
            >
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-100 to-indigo-200 mb-6 border-4 border-white shadow-md flex items-center justify-center">
                <span className="text-4xl text-indigo-700 font-bold">
                  {member.name.charAt(0)}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
              <p className="text-indigo-600 mb-6 font-medium">{member.role}</p>
              <div className="flex space-x-4 text-gray-500">
                {member.linkedin && member.linkedin !== "#" && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-blue-600 transition-colors"
                  >
                    <FaLinkedin size={24} />
                  </a>
                )}
                {member.mail && (
                  <button
                    onClick={() => handleMailClick(member.mail)}
                    className="hover:text-red-500 transition-colors"
                    title="Send Email"
                  >
                    <FaEnvelope size={24} />
                  </button>
                )}
                {member.github && member.github !== "#" && (
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-gray-900 transition-colors"
                  >
                    <FaGithub size={24} />
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