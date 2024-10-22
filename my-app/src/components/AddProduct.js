import React, { useState } from 'react';
import { supabase } from '../supabaseClient'; // Adjust the path as necessary

const DataInsertForm = () => {
    const [name, setName] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [description, setDescription] = useState('');

    const handleFileChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Upload the image file to Supabase Storage
        if (imageFile) {
            const { data: uploadData, error: uploadError } = await supabase
                .storage
                .from('images') // Ensure this is the correct bucket name
                .upload(`images/${imageFile.name}`, imageFile);

            if (uploadError) {
                console.error('Error uploading file:', uploadError);
                return;
            }

            // Get the public URL of the uploaded image
            const { publicURL, error: urlError } = supabase
                .storage
                .from('images') // Ensure this matches the upload bucket name
                .getPublicUrl(uploadData.path);

            if (urlError) {
                console.error('Error getting public URL:', urlError);
                return;
            }

            // Insert data into the product table
            const { data, error } = await supabase
                .from('product') // Ensure this is the correct table name
                .insert([
                    { name, image: publicURL, description }
                ]);

            if (error) {
                console.error('Error inserting data:', error);
            } else {
                console.log('Data inserted successfully:', data);
                // Optionally reset the form or handle success
                setName('');
                setImageFile(null);
                setDescription('');
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md space-y-4">
            <div className="flex flex-col">
                <label className="mb-2 text-gray-700 font-semibold">Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter product name"
                />
            </div>
            <div className="flex flex-col">
                <label className="mb-2 text-gray-700 font-semibold">Image:</label>
                <input
                    type="file"
                    onChange={handleFileChange}
                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>
            <div className="flex flex-col">
                <label className="mb-2 text-gray-700 font-semibold">Description:</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter product description"
                />
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600">
                Submit
            </button>
        </form>
    );
};

export default DataInsertForm;
