import React, { useState } from 'react';

interface TabPanelProps {
  tabs: Array<{
    label: string;
    content: React.ReactNode;
  }>;
}

export const TabPanel: React.FC<TabPanelProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="mb-8">
      {/* Tab Buttons */}
      <div className="flex border-b border-gray-300 mb-6">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`px-6 py-3 font-semibold transition ${
              activeTab === index
                ? 'text-indigo-600 border-b-2 border-indigo-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="tab-content">{tabs[activeTab].content}</div>
    </div>
  );
};
