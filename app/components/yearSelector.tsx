"use client";
import React, { useState } from "react";

export default function YearSelector({
  year,
  setYear,
}: {
  year: string;
  setYear: (value: string) => void;
}) {
  const currentYear = new Date().getFullYear();
  const startYear = currentYear - 50; // Adjust range as needed

  // Generate a list of years from currentYear down to startYear
  const years = Array.from(
    { length: currentYear - startYear + 1 },
    (_, index) => currentYear - index,
  );

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setYear(event.target.value);
  };

  return (
    <div className='w-full mt-10'>
      <div className='relative w-full'>
        <select
          id='year-select'
          value={year}
          onChange={handleChange}
          className='block w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 bg-[var(--bg-primary)] text-[var(--text-primary)]'
        >
          <option value='' disabled className='text-sm text-gray-500'>
            year when you started your college/work
          </option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>

        {/* Custom Dropdown Arrow SVG Icon */}
        <div className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'>
          <svg
            className='w-5 h-5 text-gray-400'
            xmlns='http://w3.org'
            viewBox='0 0 20 20'
            fill='currentColor'
          >
            <path
              fillRule='evenodd'
              d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
              clipRule='evenodd'
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
