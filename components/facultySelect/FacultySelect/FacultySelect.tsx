import React, { useState, ChangeEvent } from 'react'
import styles from './FacultySelect.module.css'
import { useRouter } from 'next/router'

function FacultySelect({ faculties }: { faculties: TFaculty[] }) {
  const [selectedFaculty, setSelectedFaculty] = useState<string>('')
  const router = useRouter()

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value
    setSelectedFaculty(value)
    router.push(`/${value}`)
  }

  return (
    <select
      className={styles.select}
      value={selectedFaculty}
      onChange={handleChange}
    >
      <option value="">Одаберите факултет</option>
      {faculties.map((faculty: TFaculty) => (
        <option key={faculty.id} value={faculty.slug}>
          {faculty.title}
        </option>
      ))}
    </select>
  )
}

export default FacultySelect
