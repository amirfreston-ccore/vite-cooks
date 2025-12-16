import React from 'react';
import { Home, Calculator, BarChart3, Download, Settings, HelpCircle, Users, FileText, Zap } from 'lucide-react';

const mockNavData = {
  logo: "NumPy Flow",
  sections: [
    {
      title: "Navigation",
      items: [
        { icon: "Home", label: "Dashboard", href: "#", active: false },
        { icon: "Calculator", label: "Functions", href: "#", active: true },
        { icon: "BarChart3", label: "Results", href: "#", active: false },
        { icon: "Download", label: "Export", href: "#", active: false }
      ]
    },
    {
      title: "Tools",
      items: [
        { icon: "Settings", label: "Settings", href: "#", active: false },
        { icon: "HelpCircle", label: "Help", href: "#", active: false },
      ]
    },
    {
      title: "Resources",
      items: [
        { icon: "FileText", label: "Documentation", href: "#", active: false },
        { icon: "Zap", label: "API", href: "#", active: false },
        { icon: "Users", label: "Team", href: "#", active: false }

      ]
    }
  ]
};

const iconMap = {
  Home, Calculator, BarChart3, Download, Settings, HelpCircle, Users, FileText, Zap
};

const NavDrawer = () => {
    return (
        <div className="h-full min-h-screen w-64 bg-white backdrop-blur-[2px] rounded-3xl text-gray-800">
            {/* Header */}
            <div className="flex items-center justify-center p-4 ">
                <h2 className="text-lg font-bold">{mockNavData.logo}</h2>
            </div>

            {/* Navigation Items */}
            <div className="px-3 space-y-1 mt-6">
                {mockNavData.sections.map((section, sectionIndex) => (
                    <div key={sectionIndex} className='p-2'>
                        <div className="text-gray-400/60 text-sm uppercase tracking-wide mb-3">
                            {section.title}
                        </div>
                        <div className="">
                            {section.items.map((item, itemIndex) => {
                                const IconComponent = iconMap[item.icon];
                                return (
                                    <a 
                                        key={itemIndex}
                                        href={item.href} 
                                        className={`flex items-center p-3.5 rounded-2xl transition-colors ${
                                            item.active 
                                                ? 'bg-blue-600 text-white' 
                                                : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                                        }`}
                                    >
                                        <IconComponent size={16} className="mr-3" />
                                        {item.label}
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NavDrawer;