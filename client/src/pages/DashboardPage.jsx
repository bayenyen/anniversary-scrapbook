import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Plus, LogOut, Settings } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

export default function DashboardPage() {
  const [scrapbooks, setScrapbooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    anniversaryDate: '',
    themeColor: '#FFB6C1',
  });
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchScrapbooks();
  }, []);

  const fetchScrapbooks = async () => {
    try {
      const response = await api.get('/scrapbooks');
      setScrapbooks(response.data.scrapbooks);
    } catch (error) {
      console.error('Error fetching scrapbooks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateScrapbook = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/scrapbooks', formData);
      setScrapbooks([response.data.scrapbook, ...scrapbooks]);
      setFormData({ title: '', anniversaryDate: '', themeColor: '#FFB6C1' });
      setShowCreateForm(false);
    } catch (error) {
      console.error('Error creating scrapbook:', error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleDeleteScrapbook = async (id) => {
    if (window.confirm('Are you sure you want to delete this scrapbook?')) {
      try {
        await api.delete(`/scrapbooks/${id}`);
        setScrapbooks(scrapbooks.filter(s => s._id !== id));
      } catch (error) {
        console.error('Error deleting scrapbook:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-rose-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg border-b border-rose-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Heart className="w-8 h-8 text-rose-500 fill-rose-500" />
            <h1 className="text-2xl font-serif font-bold text-rose-800">Our Love Story</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">{user?.name}</span>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-rose-100 hover:bg-rose-200 text-rose-700 font-medium transition"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </motion.button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="glassmorphism rounded-3xl p-8 card-shadow">
            <h2 className="text-3xl font-serif font-bold text-rose-800 mb-2">
              ❤️ Happy Anniversary!
            </h2>
            <p className="text-gray-600 max-w-2xl">
              Create beautiful digital scrapbooks to celebrate your special moments. Add photos, write love letters, and preserve your memories forever.
            </p>
          </div>
        </motion.div>

        {/* Create New Scrapbook */}
        {!showCreateForm ? (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowCreateForm(true)}
            className="mb-8 flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-rose-400 to-rose-500 text-white rounded-lg font-semibold hover:shadow-lg transition"
          >
            <Plus className="w-5 h-5" />
            Create New Scrapbook
          </motion.button>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 glassmorphism rounded-2xl p-6 card-shadow"
          >
            <form onSubmit={handleCreateScrapbook} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Scrapbook Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                    placeholder="e.g., Our First Year Together"
                    className="w-full px-4 py-3 rounded-lg border border-rose-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Anniversary Date
                  </label>
                  <input
                    type="date"
                    value={formData.anniversaryDate}
                    onChange={(e) => setFormData({ ...formData, anniversaryDate: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-rose-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Theme Color
                </label>
                <div className="flex gap-2">
                  {['#FFB6C1', '#FFB6D9', '#FFC9E3', '#FFE5EC', '#FF69B4'].map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setFormData({ ...formData, themeColor: color })}
                      className={`w-10 h-10 rounded-full border-2 transition ${
                        formData.themeColor === color ? 'border-rose-600' : 'border-transparent'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-rose-400 to-rose-500 text-white rounded-lg font-semibold hover:shadow-lg transition"
                >
                  Create Scrapbook
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition"
                >
                  Cancel
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Scrapbooks Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-rose-300 border-t-rose-500 mx-auto mb-4"></div>
              <p className="text-rose-600">Loading scrapbooks...</p>
            </div>
          </div>
        ) : scrapbooks.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glassmorphism rounded-2xl p-12 text-center card-shadow"
          >
            <Heart className="w-12 h-12 text-rose-300 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">No scrapbooks yet. Create your first one!</p>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {scrapbooks.map((scrapbook, index) => (
              <motion.div
                key={scrapbook._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glassmorphism rounded-2xl overflow-hidden card-shadow hover:shadow-xl transition group"
              >
                <div
                  className="h-40"
                  style={{ backgroundColor: scrapbook.themeColor }}
                />
                <div className="p-6">
                  <h3 className="font-serif text-xl font-bold text-rose-800 mb-2">
                    {scrapbook.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {new Date(scrapbook.anniversaryDate).toLocaleDateString()}
                  </p>
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => navigate(`/scrapbook/${scrapbook._id}`)}
                      className="flex-1 px-4 py-2 bg-gradient-to-r from-rose-400 to-rose-500 text-white rounded-lg font-semibold text-sm hover:shadow-lg transition"
                    >
                      Edit
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDeleteScrapbook(scrapbook._id)}
                      className="px-4 py-2 bg-red-100 text-red-600 rounded-lg font-semibold text-sm hover:bg-red-200 transition"
                    >
                      Delete
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
