import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Phone, MapPin, Heart, Package, Settings, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/AuthContext';

export const Profile = () => {
  const { user, logout, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.FirstName || '',
    lastName: user?.LastName || '',
    email: user?.Email || '',
    phone: user?.Number || '',
  });
  const [message, setMessage] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setMessage('');
    const result = await updateProfile({
      documentId: user?.documentId,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
    });
    
    if (result.success) {
      setMessage('Profile updated successfully!');
      setIsEditing(false);
      setTimeout(() => setMessage(''), 3000);
    } else {
      setMessage('Failed to update profile');
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'orders', label: 'Orders', icon: Package },
    { id: 'favorites', label: 'Favorites', icon: Heart },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-stone-50 py-8 sm:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12">
        <Link to="/" className="inline-flex items-center text-stone-600 hover:text-stone-900 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          <span className="text-sm tracking-wide">BACK TO HOME</span>
        </Link>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Profile Header */}
          <div className="bg-stone-900 text-white p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="w-20 h-20 bg-stone-700 rounded-full flex items-center justify-center">
                <User className="w-10 h-10" />
              </div>
              <div className="text-center sm:text-left">
                <h1 className="text-2xl sm:text-3xl font-light tracking-tight">
                  {user?.FirstName} {user?.LastName}
                </h1>
                <p className="text-stone-300 mt-1">{user?.Email}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row">
            {/* Sidebar */}
            <div className="lg:w-64 border-b lg:border-b-0 lg:border-r border-stone-200">
              <nav className="p-4 sm:p-6">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg transition-colors mb-2 ${
                        activeTab === tab.id
                          ? 'bg-stone-100 text-stone-900'
                          : 'text-stone-600 hover:bg-stone-50'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-sm tracking-wide">{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Content */}
            <div className="flex-1 p-4 sm:p-6 lg:p-8">
              {activeTab === 'profile' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl tracking-tight">Profile Information</h2>
                    <Button
                      onClick={() => setIsEditing(!isEditing)}
                      variant="outline"
                      className="text-xs tracking-widest"
                    >
                      {isEditing ? 'CANCEL' : 'EDIT'}
                    </Button>
                  </div>

                  {message && (
                    <div className="mb-4 p-3 bg-green-100 border border-green-300 text-green-700 rounded text-sm">
                      {message}
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="firstName" className="text-xs tracking-widest">FIRST NAME</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="mt-2 h-12"
                      />
                    </div>

                    <div>
                      <Label htmlFor="lastName" className="text-xs tracking-widest">LAST NAME</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="mt-2 h-12"
                      />
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-xs tracking-widest">EMAIL</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="mt-2 h-12"
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone" className="text-xs tracking-widest">PHONE</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="mt-2 h-12"
                      />
                    </div>
                  </div>

                  {isEditing && (
                    <div className="mt-8 flex gap-4">
                      <Button
                        onClick={handleSave}
                        className="bg-stone-900 hover:bg-stone-800 text-white px-8 py-3 text-xs tracking-widest"
                      >
                        SAVE CHANGES
                      </Button>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'orders' && (
                <div>
                  <h2 className="text-2xl tracking-tight mb-6">Order History</h2>
                  <div className="text-center py-12">
                    <Package className="w-16 h-16 text-stone-300 mx-auto mb-4" />
                    <p className="text-stone-500">No orders found</p>
                    <Link to="/shop">
                      <Button className="mt-4 bg-stone-900 hover:bg-stone-800 text-white px-8 py-3 text-xs tracking-widest">
                        START SHOPPING
                      </Button>
                    </Link>
                  </div>
                </div>
              )}

              {activeTab === 'favorites' && (
                <div>
                  <h2 className="text-2xl tracking-tight mb-6">Favorite Products</h2>
                  <div className="text-center py-12">
                    <Heart className="w-16 h-16 text-stone-300 mx-auto mb-4" />
                    <p className="text-stone-500">No favorites yet</p>
                    <Link to="/shop">
                      <Button className="mt-4 bg-stone-900 hover:bg-stone-800 text-white px-8 py-3 text-xs tracking-widest">
                        BROWSE PRODUCTS
                      </Button>
                    </Link>
                  </div>
                </div>
              )}

              {activeTab === 'settings' && (
                <div>
                  <h2 className="text-2xl tracking-tight mb-6">Account Settings</h2>
                  <div className="space-y-6">
                    <div className="border border-stone-200 rounded-lg p-6">
                      <h3 className="text-lg tracking-tight mb-4">Security</h3>
                      <Link to="/forgot-password">
                        <Button
                          variant="outline"
                          className="text-xs tracking-widest"
                        >
                          CHANGE PASSWORD
                        </Button>
                      </Link>
                    </div>

                    <div className="border border-stone-200 rounded-lg p-6">
                      <h3 className="text-lg tracking-tight mb-4">Notifications</h3>
                      <div className="space-y-3">
                        <label className="flex items-center gap-3">
                          <input type="checkbox" defaultChecked />
                          <span className="text-sm">Email notifications</span>
                        </label>
                        <label className="flex items-center gap-3">
                          <input type="checkbox" defaultChecked />
                          <span className="text-sm">Order updates</span>
                        </label>
                        <label className="flex items-center gap-3">
                          <input type="checkbox" />
                          <span className="text-sm">Marketing emails</span>
                        </label>
                      </div>
                    </div>

                    <div className="border border-red-200 rounded-lg p-6">
                      <h3 className="text-lg tracking-tight mb-4 text-red-600">Danger Zone</h3>
                      <Button
                        onClick={handleLogout}
                        variant="outline"
                        className="text-xs tracking-widest border-red-300 text-red-600 hover:bg-red-50"
                      >
                        LOGOUT
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};