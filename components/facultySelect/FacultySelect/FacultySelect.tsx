import React, { useState, ChangeEvent } from 'react'

function FacultySelect({ faculties }: { faculties: TFaculty[] }) {
  const [selectedFaculty, setSelectedFaculty] = useState<string>('')

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value
    setSelectedFaculty(value)
  }

  return (
    <select value={selectedFaculty} onChange={handleChange}>
      <option value="">Odaberite fakultet</option>
      {faculties.map((faculty: TFaculty) => (
        <option key={faculty.id} value={faculty.slug}>
          {faculty.title}
        </option>
      ))}
    </select>
  )
}

export default FacultySelect
