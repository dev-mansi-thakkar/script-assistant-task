import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Table, Container, Card, TextInput, Loader } from '@mantine/core';
import { Link } from 'react-router-dom';
import Navbar from '../components/navbar';

const fetchResources = async () => {
  const response = await fetch('https://api.spacexdata.com/v4/launches');
  return response.json();
};

const ResourceList: React.FC = () => {
  const { data, error, isLoading } = useQuery('resources', fetchResources);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const itemsPerPage = 10;

  if (isLoading) return (
    <div className="h-screen flex flex-col items-center justify-center">
      <Loader size="xl" variant="bars" color="blue" />
    </div>
  );
  if (error) return <div>Error fetching data</div>;

  const filteredData = data.filter((resource: any) =>
    resource.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <Container className="flex-grow">
        <Card shadow="lg" padding="md" radius="md" className="my-6">
          <div className="flex items-center mb-6">
            <h1 className='font-bold flex-1 text-2xl'>Resource List</h1>
            <TextInput
              className='flex-1'
              placeholder="Search with name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.currentTarget.value)}
            />
          </div>
          <Table className='py-5'>
            <thead className="bg-cyan-50 border-dotted">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentData.map((resource: any) => (
                <tr key={resource.id}>
                  <td className="px-6 py-4">
                    <Link to={`/resources/${resource.id}`} className="text-blue-600 hover:text-blue-900">{resource.name}</Link>
                  </td>
                  <td className="px-6 py-4">{resource.date_local}</td>
                  <td className="px-6 py-4 break-words">{resource.details}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>

        <div className="flex justify-between items-center py-4">
          <button
            className={`px-4 py-2 bg-gray-300 rounded ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button
            className={`px-4 py-2 bg-gray-300 rounded ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </Container>
    </div>
  );
};

export default ResourceList;
