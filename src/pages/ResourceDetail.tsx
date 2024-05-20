import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { Card, Container, Loader } from '@mantine/core';
import Navbar from '../components/navbar';

const fetchResource = async (id: string) => {
    const response = await fetch(`https://api.spacexdata.com/v4/launches/${id}`);
    return response.json();
};

const fetchEnrichment = async () => {
    const response = await fetch('https://api.spacexdata.com/v4/rockets');
    return response.json();
};

const ResourceDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { data, error, isLoading } = useQuery(['resource', id], () => fetchResource(id!));
    const { data: enrichmentData } = useQuery('enrichment', fetchEnrichment);

    if (isLoading) return (
        <div className="h-screen flex flex-col items-center justify-center">
          <Loader size="xl" variant="bars" color="blue" />
        </div>
      );
      if (error) return <div>Error fetching data</div>;

    const enrichedData = enrichmentData?.find((rocket: any) => rocket.id === data.rocket);

    return (
        <div className="h-screen flex flex-col">
        <Navbar />
        <Container className="flex-grow">
            <Card className='my-10 p-10 shadow-lg bg-orange-50' padding="lg">
                <h1 className='mb-4 font-bold text-4xl'>{data.name}</h1>
                <p className='mb-6 font-normal text-xl'>{data.details}</p>
                {enrichedData && (
                    <>
                        <h2 className='font-semibold text-3xl mb-3 mt-4'>Rocket Details</h2>
                        <p className='font-medium text-xl'>Name: {enrichedData.name}</p>
                        <p className='font-medium text-xl'>Type: {enrichedData.type}</p>
                    </>
                )}
            </Card>
        </Container>
        </div>
    );
};

export default ResourceDetail;