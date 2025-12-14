
import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { FaUserShield } from "react-icons/fa";
// Add this component inside your dashboard file or import it

export default function ContactsManagement() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({});
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    status: "all",
    search: "",
    sortBy: "createdAt",
    order: "desc"
  });
  const [selectedContact, setSelectedContact] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/admin/admincontacts`;

  const getToken = () => localStorage.getItem("token");

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const token = getToken();
      const response = await fetch(`${API_URL}?${new URLSearchParams(filters)}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      
      if (data.ok) {
        setContacts(data.contacts);
        setStats(data.stats);
      }
    } catch (error) {
      console.error("Fetch contacts error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, [filters]);

  const viewContact = async (id) => {
    try {
      const token = getToken();
      const response = await fetch(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      
      if (data.ok) {
        setSelectedContact(data.contact);
        setShowModal(true);
      }
    } catch (error) {
      alert("Failed to load contact");
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const token = getToken();
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });
      
      if (response.ok) {
        alert("Status updated!");
        fetchContacts();
        if (selectedContact?._id === id) {
          const data = await response.json();
          setSelectedContact(data.contact);
        }
      }
    } catch (error) {
      alert("Failed to update");
    }
  };

  const deleteContact = async (id) => {
    if (!confirm("Delete this contact?")) return;

    try {
      const token = getToken();
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.ok) {
        alert("Contact deleted!");
        fetchContacts();
        setShowModal(false);
      }
    } catch (error) {
      alert("Delete failed");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "new": return "bg-blue-500";
      case "read": return "bg-yellow-500";
      case "replied": return "bg-green-500";
      case "archived": return "bg-gray-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white/5 border border-white/10  p-4">
          <p className="text-gray-400 text-sm">Total Contacts</p>
          <p className="text-2xl font-bold text-white">{stats.total || 0}</p>
        </div>
        <div className="bg-white/5 border border-white/10  p-4">
          <p className="text-gray-400 text-sm">New</p>
          <p className="text-2xl font-bold text-white">{stats.new || 0}</p>
        </div>
        <div className="bg-white/5 border border-white/10  p-4">
          <p className="text-gray-400 text-sm">Replied</p>
          <p className="text-2xl font-bold text-white">{stats.replied || 0}</p>
        </div>
        <div className="bg-white/5 border border-white/10  p-4">
          <p className="text-gray-400 text-sm">Archived</p>
          <p className="text-2xl font-bold text-white">{stats.archived || 0}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white/5 border border-white/10  p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search contacts..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value, page: 1 })}
              className="w-full pl-10 pr-4 py-2 bg-black/40 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          
          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value, page: 1 })}
            className="px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="all">All Status</option>
            <option value="new">New</option>
            <option value="read">Read</option>
            <option value="replied">Replied</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      {/* Contacts Table */}
      <div className="bg-white/5 border border-white/10  overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-400">Loading...</div>
        ) : contacts.length === 0 ? (
          <div className="p-8 text-center text-gray-400">No contacts found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/5">
                <tr>
                  <th className="p-4 text-left text-gray-300">Name</th>
                  <th className="p-4 text-left text-gray-300">Email</th>
                  <th className="p-4 text-left text-gray-300">Message</th>
                  <th className="p-4 text-left text-gray-300">Status</th>
                  <th className="p-4 text-left text-gray-300">Date</th>
                  <th className="p-4 text-left text-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((contact) => (
                  <tr key={contact._id} className="border-t border-white/10 hover:bg-white/5">
                    <td className="p-4 text-white">{contact.name}</td>
                    <td className="p-4 text-gray-400">{contact.email}</td>
                    <td className="p-4 text-gray-400">
                      {contact.message.substring(0, 40)}...
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(contact.status)}`}>
                        {contact.status}
                      </span>
                    </td>
                    <td className="p-4 text-gray-400">
                      {new Date(contact.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => viewContact(contact._id)}
                        className="text-blue-400 hover:text-blue-300"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Contact Details Modal */}
      {showModal && selectedContact && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800  max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-white/10">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-white">{selectedContact.name}</h2>
                  <p className="text-gray-400">{selectedContact.email}</p>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-white text-2xl"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-400 mb-2">Message</h3>
                <p className="text-white bg-black/40 p-4 rounded-lg">
                  {selectedContact.message}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-semibold text-gray-400 mb-2">Status</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(selectedContact.status)}`}>
                    {selectedContact.status}
                  </span>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-400 mb-2">Date</h3>
                  <p className="text-white">{new Date(selectedContact.createdAt).toLocaleString()}</p>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-white/10 flex gap-2 flex-wrap">
              <button
                onClick={() => updateStatus(selectedContact._id, "read")}
                className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 rounded-lg text-white transition"
              >
                Mark as Read
              </button>
              <button
                onClick={() => updateStatus(selectedContact._id, "replied")}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white transition"
              >
                Mark as Replied
              </button>
              <button
                onClick={() => updateStatus(selectedContact._id, "archived")}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg text-white transition"
              >
                Archive
              </button>
              <button
                onClick={() => deleteContact(selectedContact._id)}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white transition ml-auto"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};