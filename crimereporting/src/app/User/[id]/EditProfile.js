"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useAuth } from "../../context/AuthProvider";

export default function EditProfileModal({
  isOpen,
  userInfo,
  setIsOpen,
  onUpdate,
}) {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    phone: "",
    location: "",
    pincode: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  //When the EDIT modal opens, fill in the user's existing data
  useEffect(() => {
    if (userInfo) {
      setFormData({
        phone: userInfo.phone || "",
        location: userInfo.location || "",
        pincode: userInfo.pincode || "",
      });
    }
  }, [userInfo, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const payload = {
        id: user.uid,
        name: user.displayName || "",
        email: user.email,
        phone: formData.phone,
        photo_url: user.photoURL || "",
        location: formData.location,
        pincode: formData.pincode,
      };
      const res = await fetch(
        "https://d1-tutorial.crimereporting.workers.dev/add-user",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.error || "Failed to update profile");
      }

      onUpdate(formData);
      setIsOpen(false);
    } catch (err) {
      console.error("Update error:", err);
      setError(err.message || "Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center">
        <DialogPanel className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg">
          <DialogTitle className="text-xl font-semibold mb-4">
            Edit Profile
          </DialogTitle>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              value={user?.displayName || ""}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full border rounded px-3 py-2"
              required
            />
            <input
              type="number"
              name="phone"
              maxLength={10}
              minLength={10}
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone"
              className="w-full border rounded px-3 py-2"
            />
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Location"
              className="w-full border rounded px-3 py-2"
            />
            <input
              type="number"
              maxLength={6}
              minLength={6}
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              placeholder="Pincode"
              className="w-full border rounded px-3 py-2"
            />
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                className="px-4 py-2 rounded bg-gray-200"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded bg-blue-600 text-white disabled:opacity-50"
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
