import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ArrowLeft, Plus, Share2, Lock } from 'lucide-react';
import api from '../services/api';

export default function ScrapbookEditorPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [scrapbook, setScrapbook] = useState(null);
  const [memories, setMemories] = useState([]);
  const [loveLetter, setLoveLetter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('memories');
  const [showShareModal, setShowShareModal] = useState(false);
  const [letterContent, setLetterContent] = useState('');
  const [sharePassword, setSharePassword] = useState('');

  useEffect(() => {
    fetchScrapbookData();
  }, [id]);

  const fetchScrapbookData = async () => {
    try {
      const response = await api.get(`/scrapbooks/${id}`);
      setScrapbook(response.data.scrapbook);
      setMemories(response.data.memories);
      if (response.data.loveLetter) {
        setLoveLetter(response.data.loveLetter);
        setLetterContent(response.data.loveLetter.content);
      }
    } catch (error) {
      console.error('Error fetching scrapbook:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddMemory = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.append('scrapbookId', id); // Add the scrapbook ID
    try {
      const response = await api.post('/memories', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setMemories([...memories, response.data.memory]);
      e.target.reset();
    } catch (error) {
      console.error('Error adding memory:', error);
      alert('Failed to add memory. Please try again.');
    }
  };

  const handleDeleteMemory = async (memoryId) => {
    if (window.confirm('Delete this memory?')) {
      try {
        await api.delete(`/memories/${memoryId}`);
        setMemories(memories.filter(m => m._id !== memoryId));
      } catch (error) {
        console.error('Error deleting memory:', error);
      }
    }
  };

  const handleSaveLoveLetter = async () => {
    try {
      const response = await api.post('/love-letters', {
        scrapbookId: id,
        content: letterContent,
      });
      setLoveLetter(response.data.loveLetter);
      alert('Love letter saved!');
    } catch (error) {
      console.error('Error saving love letter:', error);
    }
  };

  const handleTogglePublic = async () => {
    try {
      await api.put(`/scrapbooks/${id}`, {
        isPublic: !scrapbook.isPublic,
        accessPassword: sharePassword || null,
      });
      setScrapbook({ ...scrapbook, isPublic: !scrapbook.isPublic });
    } catch (error) {
      console.error('Error updating scrapbook:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-rose-300 border-t-rose-500 mx-auto mb-4"></div>
          <p className="text-rose-600">Loading scrapbook...</p>
        </div>
      </div>
    );
  }

  if (!scrapbook) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-100 flex items-center justify-center">
        <p className="text-rose-600">Scrapbook not found</p>
      </div>
    );
  }

  const shareLink = `${window.location.origin}/public/${scrapbook.shareToken}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-rose-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg border-b border-rose-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/dashboard')}
              className="p-2 hover:bg-rose-100 rounded-lg transition"
            >
              <ArrowLeft className="w-6 h-6 text-rose-600" />
            </motion.button>
            <h1 className="text-2xl font-serif font-bold text-rose-800">{scrapbook.title}</h1>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowShareModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-rose-100 hover:bg-rose-200 text-rose-700 rounded-lg font-medium transition"
          >
            <Share2 className="w-5 h-5" />
            Share
          </motion.button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-rose-200">
          {['memories', 'letter', 'settings'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-semibold transition ${
                activeTab === tab
                  ? 'text-rose-600 border-b-2 border-rose-600'
                  : 'text-gray-600 hover:text-rose-600'
              }`}
            >
              {tab === 'memories' && `Memories (${memories.length})`}
              {tab === 'letter' && 'Love Letter'}
              {tab === 'settings' && 'Settings'}
            </button>
          ))}
        </div>

        {/* Memories Tab */}
        <AnimatePresence>
          {activeTab === 'memories' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {/* Add Memory Form */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glassmorphism rounded-2xl p-6 card-shadow mb-8"
              >
                <h3 className="text-xl font-bold text-rose-800 mb-4 flex items-center gap-2">
                  <Plus className="w-6 h-6" />
                  Add New Memory
                </h3>
                <form onSubmit={handleAddMemory} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Photo
                      </label>
                      <input
                        type="file"
                        name="image"
                        accept="image/*"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-rose-200 focus:border-rose-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Date
                      </label>
                      <input
                        type="date"
                        name="date"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-rose-200 focus:border-rose-500 outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Caption
                    </label>
                    <textarea
                      name="caption"
                      placeholder="Tell the story of this moment..."
                      rows="3"
                      className="w-full px-4 py-3 rounded-lg border border-rose-200 focus:border-rose-500 outline-none resize-none"
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Location (Optional)
                      </label>
                      <input
                        type="text"
                        name="location"
                        placeholder="Where was this taken?"
                        className="w-full px-4 py-3 rounded-lg border border-rose-200 focus:border-rose-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mood
                      </label>
                      <select
                        name="mood"
                        className="w-full px-4 py-3 rounded-lg border border-rose-200 focus:border-rose-500 outline-none"
                      >
                        <option value="romantic">Romantic</option>
                        <option value="happy">Happy</option>
                        <option value="adventurous">Adventurous</option>
                        <option value="nostalgic">Nostalgic</option>
                        <option value="grateful">Grateful</option>
                        <option value="excited">Excited</option>
                      </select>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full px-6 py-3 bg-gradient-to-r from-rose-400 to-rose-500 text-white rounded-lg font-semibold hover:shadow-lg transition"
                  >
                    Add Memory
                  </motion.button>
                </form>
              </motion.div>

              {/* Memories Grid */}
              {memories.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="glassmorphism rounded-2xl p-12 text-center card-shadow"
                >
                  <Heart className="w-12 h-12 text-rose-300 mx-auto mb-4" />
                  <p className="text-gray-600">No memories yet. Add your first one!</p>
                </motion.div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {memories.map((memory, index) => (
                    <motion.div
                      key={memory._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="glassmorphism rounded-2xl overflow-hidden card-shadow hover:shadow-xl transition group"
                    >
                      <div className="h-48 bg-gray-200 overflow-hidden">
                        <img
                          src={`https://anniversary-scrapbook.onrender.com/${memory.image}`}
                          alt={memory.caption}
                          className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                        />
                      </div>
                      <div className="p-4">
                        <p className="text-sm text-gray-600 mb-2">
                          {new Date(memory.date).toLocaleDateString()}
                        </p>
                        <p className="text-gray-800 mb-3">{memory.caption}</p>
                        {memory.location && (
                          <p className="text-sm text-rose-600 mb-3">📍 {memory.location}</p>
                        )}
                        <span className="inline-block px-3 py-1 bg-rose-100 text-rose-700 rounded-full text-xs font-semibold mb-3">
                          {memory.mood}
                        </span>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleDeleteMemory(memory._id)}
                          className="w-full px-4 py-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg font-semibold text-sm transition"
                        >
                          Delete
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* Love Letter Tab */}
          {activeTab === 'letter' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="glassmorphism rounded-2xl p-8 card-shadow"
            >
              <h3 className="text-2xl font-serif font-bold text-rose-800 mb-4">
                ❤️ My Love Letter to You
              </h3>
              <textarea
                value={letterContent}
                onChange={(e) => setLetterContent(e.target.value)}
                placeholder="Write your heartfelt message here..."
                rows="12"
                className="w-full px-6 py-4 rounded-lg border border-rose-200 focus:border-rose-500 outline-none resize-none font-serif text-lg"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSaveLoveLetter}
                className="mt-4 w-full px-6 py-3 bg-gradient-to-r from-rose-400 to-rose-500 text-white rounded-lg font-semibold hover:shadow-lg transition"
              >
                Save Love Letter
              </motion.button>
            </motion.div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="glassmorphism rounded-2xl p-8 card-shadow max-w-2xl"
            >
              <h3 className="text-xl font-bold text-rose-800 mb-6">Settings</h3>
              <div className="space-y-6">
                <div className="pb-6 border-b border-rose-200">
                  <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <Lock className="w-5 h-5" />
                    Public Access
                  </h4>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-700">Allow others to view this scrapbook</p>
                      <p className="text-sm text-gray-600">via a private link</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={scrapbook.isPublic}
                        onChange={handleTogglePublic}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-rose-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-500"></div>
                    </label>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-700 mb-3">Password Protection (Optional)</h4>
                  <p className="text-sm text-gray-600 mb-3">Set a password to require access to your scrapbook</p>
                  <div>
                    <input
                      type="password"
                      value={sharePassword}
                      onChange={(e) => setSharePassword(e.target.value)}
                      placeholder="Enter password (leave blank for no password)"
                      className="w-full px-4 py-2 rounded-lg border border-rose-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-700 mb-3">Share Link</h4>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={shareLink}
                      readOnly
                      className="flex-1 px-4 py-2 rounded-lg border border-rose-200 bg-gray-50 text-sm"
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        navigator.clipboard.writeText(shareLink);
                        alert('Link copied to clipboard!');
                      }}
                      className="px-4 py-2 bg-rose-500 text-white rounded-lg font-semibold hover:shadow-lg transition"
                    >
                      Copy
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glassmorphism rounded-2xl p-8 max-w-md w-full card-shadow"
          >
            <h3 className="text-2xl font-serif font-bold text-rose-800 mb-4">Share Your Story</h3>
            <p className="text-gray-600 mb-4">
              Share this link with your special someone:
            </p>
            <div className="flex gap-2 mb-6">
              <input
                type="text"
                value={shareLink}
                readOnly
                className="flex-1 px-4 py-3 rounded-lg border border-rose-200 bg-gray-50 text-sm"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  navigator.clipboard.writeText(shareLink);
                  alert('Link copied!');
                }}
                className="px-4 py-3 bg-rose-500 text-white rounded-lg font-semibold hover:shadow-lg transition"
              >
                Copy
              </motion.button>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowShareModal(false)}
              className="w-full px-4 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition"
            >
              Close
            </motion.button>
          </motion.div>
        </div>
      )}
    </div>
  );
}
