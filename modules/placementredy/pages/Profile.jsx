import { User, Mail, Building2, BookMarked, Settings } from 'lucide-react';
import { useState } from 'react';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="max-w-5xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Profile</h1>
        <p className="text-lg text-gray-600">Manage your profile and preferences</p>
      </div>

      {/* Profile Header */}
      <div className="bg-white rounded-lg border border-gray-200 p-8 mb-8">
        <div className="flex items-center gap-6 mb-6">
          <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center">
            <User className="w-12 h-12 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-gray-900">John Doe</h2>
            <p className="text-gray-600 mt-1">john@example.com</p>
            <div className="mt-3 flex gap-3">
              <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-semibold rounded-full">Active</span>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full">Verified</span>
            </div>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors"
          >
            {isEditing ? 'Done' : 'Edit Profile'}
          </button>
        </div>
      </div>

      {/* Profile Form & Stats */}
      <div className="grid lg:grid-cols-3 gap-8 mb-8">
        {/* Edit Form */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Personal Information</h3>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </label>
              <input
                type="text"
                disabled={!isEditing}
                defaultValue="John Doe"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-50 disabled:text-gray-600"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email
              </label>
              <input
                type="email"
                disabled={!isEditing}
                defaultValue="john@example.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-50 disabled:text-gray-600"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                Target Companies
              </label>
              <input
                type="text"
                disabled={!isEditing}
                defaultValue="Google, Microsoft, Amazon"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-50 disabled:text-gray-600"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <BookMarked className="w-4 h-4" />
                Current Role
              </label>
              <select
                disabled={!isEditing}
                defaultValue="student"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-50 disabled:text-gray-600"
              >
                <option value="student">Student</option>
                <option value="professional">Professional</option>
                <option value="jobseeker">Job Seeker</option>
              </select>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border border-purple-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Your Stats</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Problems Solved</p>
                <p className="text-2xl font-bold text-purple-600">0</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Current Streak</p>
                <p className="text-2xl font-bold text-purple-600">0 days</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Interviews Done</p>
                <p className="text-2xl font-bold text-purple-600">0</p>
              </div>
            </div>
          </div>

          <button className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-700 font-semibold">
            <Settings className="w-5 h-5" />
            Settings
          </button>
        </div>
      </div>
    </div>
  );
}
