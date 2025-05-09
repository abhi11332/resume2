import React from 'react';

function ResumePreview({ data }) {
    const handlePrint = () => {
        window.print();
      };
  return (
    <div className="mt-10 bg-white p-8 shadow-lg rounded-lg max-w-3xl mx-auto text-gray-800">
      {/* Header */}
      <div className="mb-6 border-b pb-4">
        <h2 className="text-3xl font-bold text-blue-800">{data.name}</h2>
        <p className="mt-1"><strong>Contact:</strong> {data.contact}</p>
        <p><strong>Address:</strong> {data.address}</p>
      </div>

      {/* Social Links */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2 text-blue-600">Social Profiles</h3>
        <ul className="space-y-1">
          {data.facebook && (
            <li>
              <strong>Facebook:</strong>{' '}
              <a href={data.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                {data.facebook}
              </a>
            </li>
          )}
          {data.instagram && (
            <li>
              <strong>Instagram:</strong>{' '}
              <a href={data.instagram} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                {data.instagram}
              </a>
            </li>
          )}
          {data.linkedin && (
            <li>
              <strong>LinkedIn:</strong>{' '}
              <a href={data.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                {data.linkedin}
              </a>
            </li>
          )}
        </ul>
      </div>

      {/* Objective */}
      {data.objective && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2 text-blue-600">Objective</h3>
          <p className="text-gray-700">{data.objective}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && data.experience.some(exp => exp.trim() !== '') && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2 text-blue-600">Experience</h3>
          <ul className="list-disc ml-5 space-y-1 text-gray-700">
            {data.experience.map((exp, i) => exp && <li key={i}>{exp}</li>)}
          </ul>
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && data.education.some(edu => edu.trim() !== '') && (
        <div className="mb-2">
          <h3 className="text-xl font-semibold mb-2 text-blue-600">Education</h3>
          <ul className="list-disc ml-5 space-y-1 text-gray-700">
            {data.education.map((edu, i) => edu && <li key={i}>{edu}</li>)}
          </ul>
        </div>
      )}
       <button
        onClick={handlePrint}
        className="mt-4 px-6 py-2 bg-green-600 text-white rounded-md"
      >
        Print CV
      </button>
    </div>
  );
}

export default ResumePreview;
