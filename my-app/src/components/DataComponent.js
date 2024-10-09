import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient'; 

const DataComponent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from Supabase on component mount
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('product') 
        .select('*');
      
      if (error) {
        console.error('Error fetching data:', error);
      } else {
        setData(data);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Fetched Data</h2>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.name}</li> // Modify based on your data structure
        ))}
      </ul>
    </div>
  );
};

export default DataComponent;
