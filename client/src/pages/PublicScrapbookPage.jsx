import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ArrowLeft, Lock } from 'lucide-react';
import api from '../services/api';

export default function PublicScrapbookPage() {
  const { shareToken } = useParams();
  const navigate = useNavigate();
  const [scrapbook, setScrapbook] = useState(null);
  const [memories, setMemories] = useState([]);
  const [loveLetter, setLoveLetter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [passwordProtected, setPasswordProtected] = useState(false);
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [showLetter, setShowLetter] = useState(false);

  useEffect(() => {
    fetchPublicScrapbook();
  }, [shareToken]);

  const fetchPublicScrapbook = async (pwd = null) => {
    try {
      const response = await api.post(`/scrapbooks/public/${shareToken}`, {
        password: pwd,
      });
      setScrapbook(response.data.scrapbook);
      setMemories(response.data.memories);
      if (response.data.loveLetter) {
        setLoveLetter(response.data.loveLetter);
      }
      setAuthenticated(true);
    } catch (error) {
      if (error.response?.status === 403) {
        setPasswordProtected(true);
      } else {
        console.error('Error fetching scrapbook:', error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    fetchPublicScrapbook(password);
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

  if (passwordProtected && !authenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-100 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md glassmorphism rounded-3xl p-8 card-shadow"
        >
          <div className="text-center mb-6">
            <Lock className="w-12 h-12 text-rose-500 mx-auto mb-4" />
            <h2 className="text-2xl font-serif font-bold text-rose-800 mb-2">
              Protected Scrapbook
            </h2>
            <p className="text-gray-600">This scrapbook is password protected</p>
          </div>

          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg border border-rose-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none"
                placeholder="••••••••"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full px-6 py-3 bg-gradient-to-r from-rose-400 to-rose-500 text-white rounded-lg font-semibold hover:shadow-lg transition"
            >
              Unlock
            </motion.button>
          </form>
        </motion.div>
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-rose-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg border-b border-rose-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Heart className="w-8 h-8 text-rose-500 fill-rose-500" />
            <h1 className="text-2xl font-serif font-bold text-rose-800">{scrapbook.title}</h1>
          </div>
          <p className="text-sm text-gray-600">
            {new Date(scrapbook.anniversaryDate).toLocaleDateString()}
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Opening Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mb-4"
          >
            <Heart className="w-16 h-16 text-rose-500 fill-rose-500 mx-auto" />
          </motion.div>
          <h2 className="text-4xl font-serif font-bold text-rose-800 mb-2">
            Happy Anniversary ❤️
          </h2>
          <p className="text-xl text-rose-600">Here's to the memories we share</p>
        </motion.div>

        {/* Memories Gallery */}
        {memories.length > 0 && (
          <div className="mb-12">
            <h3 className="text-2xl font-serif font-bold text-rose-800 mb-8 text-center">
              Our Beautiful Moments
            </h3>
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
                    <span className="inline-block px-3 py-1 bg-rose-100 text-rose-700 rounded-full text-xs font-semibold">
                      {memory.mood}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Love Letter */}
        {loveLetter && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glassmorphism rounded-2xl p-8 card-shadow max-w-2xl mx-auto mb-12"
          >
            <h3 className="text-2xl font-serif font-bold text-rose-800 mb-6 text-center">
              ❤️ A Love Letter
            </h3>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowLetter(!showLetter)}
              className="w-full px-6 py-3 bg-gradient-to-r from-rose-400 to-rose-500 text-white rounded-lg font-semibold hover:shadow-lg transition mb-4"
            >
              {showLetter ? 'Hide Letter' : 'Read the Letter'}
            </motion.button>

            {showLetter && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="prose prose-sm max-w-none"
              >
                <p className="font-serif text-lg leading-relaxed text-gray-800 whitespace-pre-wrap">
                  {loveLetter.content}
                </p>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Closing Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-8"
        >
          <p className="text-2xl font-serif text-rose-800">
            Forever and Always 💕
          </p>
        </motion.div>
      </main>
    </div>
  );
}
