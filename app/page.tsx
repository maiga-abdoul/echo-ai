"use client"; // Ensures interactivity

import Link from "next/link";
import Image from "next/image";
import { PhoneCall } from "lucide-react"; // Import PhoneCall icon

export default function VoiceAssistants() {
  const assistants = [
    {
      name: "Safaricom",
      buttonText: "Chat with Safaricom Assistant",
      link: "/room/safaricom",
      image: "/images/safaricom.jpeg", // Path to Safaricom logo
    },
    {
      name: "KCB Bank",
      buttonText: "Chat with KCB Bank Assistant",
      link: "/room/kcb",
      image: "/images/kcb.png", // Path to KCB logo
    },
    {
      name: "JKUAT Hospital",
      buttonText: "Ask JKUAT Hospital",
      link: "/room/jkuat_hospital",
      image: "/images/jkuat-hospital.jpg", // Path to JKUAT Hospital logo
    },
    {
      name: "Kenya Immigration",
      buttonText: "Chat with Immigration Assistant",
      link: "/room/kenya_immigration_center",
      image: "/images/kenya-immigration.png", // Path to JKUAT Hospital logo
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-blue-600 text-center">EchoAI Voice Assistants</h1>
      <p className="text-gray-600 mt-2 text-center max-w-md">
        Connect with businesses and institutions through AI-powered voice chat.
      </p>

      {/* Responsive layout: vertical on small screens, horizontal on large screens */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-4xl mx-auto">
  {assistants.map((assistant, index) => (
    <div 
      key={index} 
      className="bg-white p-6 rounded-xl shadow-lg text-center w-full h-full flex flex-col justify-between min-h-[300px]"
    >
      {/* Company Logo (Uniform Size) */}
      <div className="flex justify-center mb-4 w-48 h-24 mx-auto">
        <Image 
          src={assistant.image} 
          alt={assistant.name} 
          width={150} 
          height={3000} 
          className="w-full h-full object-cover rounded-lg" 
        />
      </div>
      {/* Title */}
      <h2 className="text-xl font-semibold text-black flex-1">{assistant.name}</h2>
      {/* Button */}
      <Link href={assistant.link} passHref>
        <span className="mt-4 inline-flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 cursor-pointer">
          <PhoneCall className="text-white" size={20} /> {/* Icon */}
          {assistant.buttonText} {/* Button Text */}
        </span>
      </Link>
    </div>
  ))}
</div>

    </div>
  );
}
