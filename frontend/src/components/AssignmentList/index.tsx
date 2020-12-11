import React from 'react'
// Note how we can use the generated query and types directly
import { useAssignmentsQuery } from '../../interfaces/schema-typings'

const AssignmentList = () => {
  // Note: This is a typed wrapper to Apollo useQuery() method
  const { loading, error, data } = useAssignmentsQuery({})

  if (loading) {
    return <div>Loading...</div>
  }
  if (error) {
    console.error(error)
    return <div>Error: { JSON.stringify(error)}</div>
  }

  return <ul>
    {data?.assignments.map(assignment =>
      <li>Name: {assignment.name}, starts: {assignment.starts.toLocaleString()}</li>
    )}
  </ul>
}

export default AssignmentList