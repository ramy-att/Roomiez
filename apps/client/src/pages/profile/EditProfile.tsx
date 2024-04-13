import React, { useState } from 'react';

interface ProfileState {
  name: string;
  email: string;
  password: string;
  description: string;
  preferences: {
    Drinking: boolean;
    Smoking: boolean;
    GoingOut: boolean;
    Gym: boolean;
    Walking: boolean;
    Football: boolean;
    Reading: boolean;
    Cooking: boolean;
    Gaming: boolean;
    Nature: boolean;
  };
}

export const EditProfile = () => {
  const [profileState, setProfileState] = useState<ProfileState>({
    name: 'John Doe',
    email: 'john@gmail.com',
    password: '*******',
    description: '',
    preferences: {
      Drinking: false,
      Smoking: false,
      GoingOut: false,
      Gym: false,
      Walking: false,
      Football: false,
      Reading: false,
      Cooking: false,
      Gaming: false,
      Nature: false,
    },
  });

  const handleToggle = (preference: keyof ProfileState['preferences']) => {
    setProfileState((prevState) => ({
      ...prevState,
      preferences: {
        ...prevState.preferences,
        [preference]: !prevState.preferences[preference],
      },
    }));
  };

  const handleSubmit = () => {
    console.log(profileState);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-4xl">
        <div className="space-y-4 mb-6">
          <input
            className="block w-full px-4 py-2 border rounded shadow-sm"
            id="name"
            type="text"
            placeholder="John Doe"
            value={profileState.name}
            onChange={(e) => setProfileState({ ...profileState, name: e.target.value })}
          />
          <input
            className="block w-full px-4 py-2 border rounded shadow-sm"
            id="email"
            type="email"
            placeholder="john@gmail.com"
            value={profileState.email}
            onChange={(e) => setProfileState({ ...profileState, email: e.target.value })}
          />
          <input
            className="block w-full px-4 py-2 border rounded shadow-sm"
            id="password"
            type="password"
            placeholder="*******"
            value={profileState.password}
            onChange={(e) => setProfileState({ ...profileState, password: e.target.value })}
          />
          <textarea
            className="block w-full px-4 py-2 border rounded shadow-sm"
            id="description"
            placeholder="Description"
            value={profileState.description}
            onChange={(e) => setProfileState({ ...profileState, description: e.target.value })}
          />
        </div>
        <div className="grid grid-cols-5 gap-4 mb-6">
          {Object.keys(profileState.preferences).map((preference) => {
            const isChecked = profileState.preferences[preference as keyof ProfileState['preferences']];
            return (
              <label key={preference} className="flex flex-col items-center cursor-pointer">
                <span className="text-sm font-medium text-gray-700 mb-1">{preference}</span>
                <div className="relative">
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={isChecked}
                    onChange={() => handleToggle(preference as keyof ProfileState['preferences'])}
                  />
                  <div className="block bg-gray-400 w-14 h-8 rounded-full shadow-inner"></div>
                  <div
                    className={`transform transition-all duration-300 ${
                      isChecked ? 'translate-x-6 bg-blue-600' : 'translate-x-0 bg-white'
                    } absolute left-1 top-1 w-6 h-6 rounded-full shadow`}
                  ></div>
                </div>
              </label>
            );
          })}
        </div>
        <div className="flex justify-end pt-2">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200"
            type="button"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
