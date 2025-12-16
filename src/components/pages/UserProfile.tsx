import { useState } from 'react';
import { User, Lock, Save } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { PageType } from '../../App';
import { toast } from 'sonner@2.0.3';

interface UserProfileProps {
  onNavigate: (page: PageType) => void;
}

export function UserProfile({ onNavigate }: UserProfileProps) {
  const [profileData, setProfileData] = useState({
    fullName: 'Admin User',
    email: 'admin@globaltours.com',
    phone: '+91 98765 43210',
    company: 'Global Tours & Travels',
    address: '123 Travel Street, Mumbai',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleProfileChange = (field: string, value: string) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePasswordChange = (field: string, value: string) => {
    setPasswordData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveProfile = () => {
    toast.success('Profile updated successfully!');
  };

  const handleChangePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }
    toast.success('Password changed successfully!');
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-[#8B1538] mb-2">User Profile</h1>
        <p className="text-gray-600">Manage your account settings and preferences</p>
      </div>

      <div className="max-w-4xl">
        <Tabs defaultValue="profile">
          <TabsList className="mb-6">
            <TabsTrigger value="profile">Profile Details</TabsTrigger>
            <TabsTrigger value="password">Change Password</TabsTrigger>
          </TabsList>

          {/* Profile Details Tab */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Profile Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex justify-center mb-6">
                  <div className="w-24 h-24 bg-[#8B1538] rounded-full flex items-center justify-center text-white text-3xl">
                    {profileData.fullName.charAt(0)}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      value={profileData.fullName}
                      onChange={(e) => handleProfileChange('fullName', e.target.value)}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => handleProfileChange('email', e.target.value)}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => handleProfileChange('phone', e.target.value)}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="company">Company Name</Label>
                    <Input
                      id="company"
                      value={profileData.company}
                      onChange={(e) => handleProfileChange('company', e.target.value)}
                      className="mt-2"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={profileData.address}
                      onChange={(e) => handleProfileChange('address', e.target.value)}
                      className="mt-2"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button
                    onClick={handleSaveProfile}
                    className="bg-[#8B1538] hover:bg-[#6B0F28]"
                  >
                    <Save className="w-5 h-5 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Change Password Tab */}
          <TabsContent value="password">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="w-5 h-5" />
                  Change Password
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
                    placeholder="Enter current password"
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                    placeholder="Enter new password"
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                    placeholder="Confirm new password"
                    className="mt-2"
                  />
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-900">
                    <strong>Password Requirements:</strong>
                  </p>
                  <ul className="text-sm text-blue-800 mt-2 space-y-1 list-disc list-inside">
                    <li>Minimum 8 characters</li>
                    <li>At least one uppercase letter</li>
                    <li>At least one number</li>
                    <li>At least one special character</li>
                  </ul>
                </div>

                <div className="flex justify-end pt-4">
                  <Button
                    onClick={handleChangePassword}
                    className="bg-[#8B1538] hover:bg-[#6B0F28]"
                  >
                    <Lock className="w-5 h-5 mr-2" />
                    Change Password
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
