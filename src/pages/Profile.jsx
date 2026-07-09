import { useEffect, useState } from "react";

import useAuth from "../hooks/useAuth";

import {
  getUserProfile,
  updateUserProfile,
} from "../services/userService";

import { uploadSingleImage } from "../services/uploadService";

import {
  successToast,
  errorToast,
} from "../components/ui/Toast";

import Button from "../components/ui/Button";

export default function Profile() {
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [photoURL, setPhotoURL] = useState("");
  const [photoFile, setPhotoFile] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const profile = await getUserProfile(user.uid);

        if (profile) {
          setName(profile.name || "");
          setPhone(profile.phone || "");
          setAddress(profile.address || "");
          setPhotoURL(profile.photoURL || "");
        }
      } catch (err) {
        console.error(err);
        errorToast("Failed to load profile.");
      }

      setLoading(false);
    };

    loadProfile();
  }, [user]);

  const handleSave = async () => {
    if (!user) return;

    try {
      setSaving(true);

      let imageUrl = photoURL;

      if (photoFile) {
        const uploaded =
          await uploadSingleImage(photoFile);

        imageUrl = uploaded.imageUrl;
      }

      await updateUserProfile(user.uid, {
        name,
        phone,
        address,
        photoURL: imageUrl,
      });

      setPhotoURL(imageUrl);

      successToast(
        "Profile updated successfully."
      );
    } catch (err) {
      console.error(err);
      errorToast(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (!user) {
    return (
      <div className="max-w-6xl mx-auto py-20 text-center">
        Please login first.
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto py-20 text-center">
        Loading Profile...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">

      <h1 className="text-4xl font-bold mb-8">
        My Profile
      </h1>

      <div className="grid lg:grid-cols-3 gap-8">

        {/* Left Profile Card */}

        <div className="bg-white rounded-3xl shadow-xl p-8 text-center">

          <img
            src={
              photoURL ||
              "https://via.placeholder.com/200?text=Profile"
            }
            alt="Profile"
            className="w-40 h-40 rounded-full object-cover border-4 border-indigo-100 mx-auto"
          />

          <input
            type="file"
            accept="image/*"
            className="mt-5 w-full"
            onChange={(e) =>
              setPhotoFile(e.target.files[0])
            }
          />

          <h2 className="text-2xl font-bold mt-6">
            {name || "Dream Mode User"}
          </h2>

          <p className="text-gray-500 mt-2">
            {user.email}
          </p>

          <div className="mt-4">
            {user.emailVerified ? (
              <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
                ✅ Email Verified
              </span>
            ) : (
              <span className="bg-red-100 text-red-600 px-4 py-2 rounded-full text-sm font-medium">
                ❌ Email Not Verified
              </span>
            )}
          </div>

        </div>

        {/* Right Side */}

        <div className="lg:col-span-2 space-y-8">

                    {/* Edit Profile Card */}

          <div className="bg-white rounded-3xl shadow-xl p-8">

            <h2 className="text-2xl font-bold mb-6">
              Edit Profile
            </h2>

            <div className="grid md:grid-cols-2 gap-6">

              <div>
                <label className="block font-medium mb-2">
                  Full Name
                </label>

                <input
                  className="w-full border rounded-xl p-3"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                />
              </div>

              <div>
                <label className="block font-medium mb-2">
                  Email
                </label>

                <input
                  className="w-full border rounded-xl p-3 bg-gray-100"
                  value={user.email}
                  readOnly
                />
              </div>

              <div>
                <label className="block font-medium mb-2">
                  Phone Number
                </label>

                <input
                  className="w-full border rounded-xl p-3"
                  value={phone}
                  onChange={(e) =>
                    setPhone(e.target.value)
                  }
                />
              </div>

              <div>
                <label className="block font-medium mb-2">
                  Address
                </label>

                <input
                  className="w-full border rounded-xl p-3"
                  value={address}
                  onChange={(e) =>
                    setAddress(e.target.value)
                  }
                />
              </div>

            </div>

            <Button
              onClick={handleSave}
              disabled={saving}
              className="w-full mt-8"
            >
              {saving
                ? "Saving..."
                : "Save Changes"}
            </Button>

          </div>

          {/* Account Information */}

          <div className="bg-white rounded-3xl shadow-xl p-8">

            <h2 className="text-2xl font-bold mb-6">
              Account Information
            </h2>

            <div className="space-y-4">

              <div className="flex justify-between items-center border-b pb-3">
                <span className="font-medium">
                  User ID
                </span>

                <span className="text-gray-600 text-sm break-all">
                  {user.uid}
                </span>
              </div>

              <div className="flex justify-between items-center border-b pb-3">
                <span className="font-medium">
                  Email
                </span>

                <span className="text-gray-600">
                  {user.email}
                </span>
              </div>

              <div className="flex justify-between items-center border-b pb-3">
                <span className="font-medium">
                  Verification
                </span>

                <span
                  className={
                    user.emailVerified
                      ? "text-green-600 font-semibold"
                      : "text-red-600 font-semibold"
                  }
                >
                  {user.emailVerified
                    ? "Verified"
                    : "Not Verified"}
                </span>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
