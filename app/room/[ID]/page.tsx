"use client";


import { Conversation } from "../../components/conversation";
import { useParams } from 'next/navigation'

// Define companies and their associated properties
const companyConfigs: Record<string, { bg1: string; btn_bg_color: string; btn_hover_bg_color: string; text: string; name: string; agentId: string }> = {
  safaricom: {
    bg1: "bg-blue-200",
    btn_bg_color: "bg-green-800",
    btn_hover_bg_color: "hover:bg-green-900",
    text: "text-green-800",
    name: "Safaricom Assistant",
    agentId: "Va5530ZjUUy2Rb8foC2L",
  },
  kcb: {
    bg1: "bg-green-200",
    btn_bg_color: "bg-gray-800",
    btn_hover_bg_color: "hover:bg-gray-900",
    text: "text-gray-800",
    name: "KCB Assistant",
    agentId: "tKV4ocr2WMNefbtadcEr",
  },
  jkuat_hospital: {
    bg1: "bg-yellow-200",
    btn_bg_color: "bg-blue-800",
    btn_hover_bg_color: "hover:bg-blue-900",
    text: "text-blue-800",
    name: "JKUAT hospital Assistant",
    agentId: "FIt2lD89PJC5T2u3nKdd",
  },
  kenya_immigration_center: {
    bg1: "bg-orange-200",
    btn_bg_color: "bg-purple-800",
    btn_hover_bg_color: "hover:bg-purple-900",
    text: "text-purple-800",
    name: "Kenya Immigration Assistant",
    agentId: "YFEwtPcn3yXaUZJ2tQ6o",
  },
};

export default function Home() {
  const params = useParams();
  const companyId = params.ID as string; // Get the dynamic company ID from the URL

  // Get the company config, or fallback to a default
  const company = companyConfigs[companyId] || companyConfigs["safaricom"];

  return (
    <main className="flex min-h-screen w-full items-center justify-center">
      <div className="w-full h-full flex flex-col items-center justify-center p-6 sm:p-12">
        <Conversation
          bg1_color={company.bg1}
          btn_bg_color={company.btn_bg_color}
          btn_hover_bg_color={company.btn_hover_bg_color}
          text_color={company.text}
          assistantName={company.name}
          agentId={company.agentId}
        />
      </div>
    </main>
  );
}
