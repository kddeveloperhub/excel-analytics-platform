import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; // Make sure this provides token
import { toast } from 'react-toastify';

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const { user } = useAuth(); // Assuming context provides user and token

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('/api/users/profile', {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setProfile(res.data.user);
      } catch (err) {
        toast.error('Failed to load profile');
      }
    };

    fetchProfile();
  }, [user.token]);

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6">👤 User Profile</h2>

        {profile ? (
          <div className="space-y-4">
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-600 font-medium">Name:</span>
              <span className="text-gray-800">{profile.name}</span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-600 font-medium">Email:</span>
              <span className="text-gray-800">{profile.email}</span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-600 font-medium">Role:</span>
              <span className="text-gray-800 capitalize">{profile.role || 'user'}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600 font-medium">Joined:</span>
              <span className="text-gray-800">{new Date(profile.createdAt).toLocaleString()}</span>
            </div>
          </div>
        ) : (
          <div className="text-gray-600">Loading profile...</div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
