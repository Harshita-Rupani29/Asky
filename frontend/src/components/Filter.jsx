import React, { useState } from "react";
import { FaChevronDown, FaChevronUp, FaFilter } from "react-icons/fa";
import { IoMdCloseCircleOutline } from "react-icons/io";
import BackDrop from "./BackDrop"; 

function FilterOptions({
  levels,
  subjects,
  selectedLevels,
  selectedSubjects,
  onApplyFilters,
  onClearFilters,
}) {
  const [tempSelectedLevels, setTempSelectedLevels] = useState(selectedLevels);
  const [tempSelectedSubjects, setTempSelectedSubjects] = useState(selectedSubjects);
  const [showAllSubjects, setShowAllSubjects] = useState(false);
  const [showLevels, setShowLevels] = useState(false);
  const [showSubjects, setShowSubjects] = useState(false);
  const [isFilterMobile, setIsFilterMobile] = useState(false);

  const handleLevelChange = (e) => {
    const level = e.target.value;
    setTempSelectedLevels((prev) =>
      prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level]
    );
  };

  const handleSubjectChange = (e) => {
    const subject = e.target.value;
    setTempSelectedSubjects((prev) =>
      prev.includes(subject) ? prev.filter((s) => s !== subject) : [...prev, subject]
    );
  };

  const handleApplyFilters = () => {
    onApplyFilters(tempSelectedLevels, tempSelectedSubjects);
  };

  const handleClearFiltersClick = () => {
    setTempSelectedLevels([]);
    setTempSelectedSubjects([]);
    onClearFilters();
  };

  const toggleSection = (section) => {
    if (section === "levels") setShowLevels(!showLevels);
    else if (section === "subjects") setShowSubjects(!showSubjects);
  };

  const showClearFiltersButton = tempSelectedLevels.length > 0 || tempSelectedSubjects.length > 0;

  return (
    <>
      {/* Mobile Filter Button */}
      <div className="md:hidden inline-block mb-4">
        <button onClick={() => setIsFilterMobile(true)} className="text-gray-700 text-xl">
          <FaFilter />
        </button>
      </div>

      {isFilterMobile && <BackDrop onClick={() => setIsFilterMobile(false)} />}

      {/* Filter Panel */}
      <div
        className={`fixed top-0 left-0 h-full w-3/4 sm:w-2/3 bg-white z-50 p-6 overflow-y-auto transition-transform duration-500 transform ${
          isFilterMobile ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 md:w-1/4 md:bg-transparent md:p-0 md:h-auto`}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <FaFilter className="text-2xl text-gray-800" />
            <h2 className="text-xl font-semibold">Filters</h2>
          </div>
          {isFilterMobile && (
            <button
              onClick={() => setIsFilterMobile(false)}
              className="text-3xl text-gray-600"
            >
              <IoMdCloseCircleOutline />
            </button>
          )}
        </div>

        {/* Levels Section */}
        <div className="border-t border-gray-300 py-2">
          <h3
            onClick={() => toggleSection("levels")}
            className="cursor-pointer flex justify-between items-center text-sm font-medium text-gray-800 py-2"
          >
            Level {showLevels ? <FaChevronUp /> : <FaChevronDown />}
          </h3>
          {showLevels && (
            <div className="ml-2 mt-2 space-y-2">
              {levels.map((level) => (
                <label key={level} className="flex items-center gap-2 text-sm text-gray-600">
                  <input
                    type="checkbox"
                    value={level}
                    checked={tempSelectedLevels.includes(level)}
                    onChange={handleLevelChange}
                    className="form-checkbox accent-teal-500 rounded-full w-4 h-4"
                  />
                  {level}
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Subjects Section */}
        <div className="border-t border-gray-300 py-2">
          <h3
            onClick={() => toggleSection("subjects")}
            className="cursor-pointer flex justify-between items-center text-sm font-medium text-gray-800 py-2"
          >
            Subject {showSubjects ? <FaChevronUp /> : <FaChevronDown />}
          </h3>
          {showSubjects && (
            <div className="ml-2 mt-2 space-y-2">
              {subjects.slice(0, showAllSubjects ? subjects.length : 5).map((subject) => (
                <label key={subject} className="flex items-center gap-2 text-sm text-gray-600">
                  <input
                    type="checkbox"
                    value={subject}
                    checked={tempSelectedSubjects.includes(subject)}
                    onChange={handleSubjectChange}
                    className="form-checkbox accent-teal-500 rounded-full w-4 h-4"
                  />
                  {subject}
                </label>
              ))}
              {subjects.length > 8 && (
                <button
                  onClick={() => setShowAllSubjects((prev) => !prev)}
                  className="text-teal-600 text-sm underline mt-1"
                >
                  {showAllSubjects ? "Show Less" : "Show More"}
                </button>
              )}
            </div>
          )}
        </div>

        {/* Apply & Clear Buttons */}
        <div className="text-center mt-6 space-y-3">
          <button
            onClick={handleApplyFilters}
            className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 text-sm"
          >
            Apply Filters
          </button>
          {showClearFiltersButton && (
            <button
              onClick={handleClearFiltersClick}
              className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 text-sm block mx-auto"
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default FilterOptions;
