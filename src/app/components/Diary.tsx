import { useState } from "react";
import { Link } from "react-router";
import { Plus, Search, Calendar, Smile, Frown, Meh, Heart, Filter, SortAsc, X, TrendingUp } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface DiaryEntryType {
  id: string;
  date: string;
  preview: string;
  mood: "happy" | "sad" | "neutral" | "anxious";
  analyzed: boolean;
}

export function Diary() {
  const [entries, setEntries] = useState<DiaryEntryType[]>([
    {
      id: "1",
      date: "2026-03-27",
      preview: "Today I felt really overwhelmed with work. There's so much going on and I'm not sure if I can handle it all...",
      mood: "anxious",
      analyzed: true,
    },
    {
      id: "2",
      date: "2026-03-25",
      preview: "Had a great conversation with a friend today. It made me realize how important it is to stay connected...",
      mood: "happy",
      analyzed: true,
    },
    {
      id: "3",
      date: "2026-03-22",
      preview: "Feeling a bit lost today. Not sure what direction to take with some decisions I need to make...",
      mood: "neutral",
      analyzed: false,
    },
    {
      id: "4",
      date: "2026-03-20",
      preview: "Missing someone special today. It's hard to put into words how much I wish they were here...",
      mood: "sad",
      analyzed: true,
    },
    {
      id: "5",
      date: "2026-03-18",
      preview: "Celebrated a small win at work today! Finally finished that project I've been working on for weeks...",
      mood: "happy",
      analyzed: true,
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"date" | "mood">("date");
  const [showFilters, setShowFilters] = useState(false);

  const moodOptions = [
    { value: "happy", icon: Smile, color: "text-green-500", bg: "bg-green-50", border: "border-green-200" },
    { value: "sad", icon: Frown, color: "text-blue-500", bg: "bg-blue-50", border: "border-blue-200" },
    { value: "neutral", icon: Meh, color: "text-gray-500", bg: "bg-gray-50", border: "border-gray-200" },
    { value: "anxious", icon: Heart, color: "text-orange-500", bg: "bg-orange-50", border: "border-orange-200" },
  ];

  const getMoodIcon = (mood: string) => {
    const option = moodOptions.find(o => o.value === mood);
    if (!option) return null;
    const Icon = option.icon;
    return <Icon className={`w-5 h-5 ${option.color}`} />;
  };

  const getMoodStyle = (mood: string) => {
    return moodOptions.find(o => o.value === mood);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    }
    
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const filteredAndSortedEntries = entries
    .filter((entry) => {
      const matchesSearch = entry.preview.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesMood = !selectedMood || entry.mood === selectedMood;
      return matchesSearch && matchesMood;
    })
    .sort((a, b) => {
      if (sortBy === "date") {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else {
        return a.mood.localeCompare(b.mood);
      }
    });

  const moodStats = entries.reduce((acc, entry) => {
    acc[entry.mood] = (acc[entry.mood] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="p-6 space-y-4 pb-8">
      {/* Header Actions */}
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search entries..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white rounded-xl pl-10 pr-4 py-3 text-sm border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all"
          />
        </div>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowFilters(!showFilters)}
          className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-sm transition-all ${
            showFilters || selectedMood
              ? "bg-pink-500 text-white"
              : "bg-white text-gray-600 border border-pink-200"
          }`}
        >
          <Filter className="w-5 h-5" />
        </motion.button>
        <Link to="/diary/new">
          <motion.div
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-pink-500 to-rose-500 text-white w-12 h-12 rounded-xl flex items-center justify-center shadow-md"
          >
            <Plus className="w-6 h-6" />
          </motion.div>
        </Link>
      </div>

      {/* Filter Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-pink-100 space-y-4">
              {/* Mood Filter */}
              <div>
                <label className="text-xs uppercase tracking-wider text-gray-500 mb-2 block">
                  Filter by Mood
                </label>
                <div className="flex gap-2">
                  {moodOptions.map((option) => {
                    const Icon = option.icon;
                    return (
                      <motion.button
                        key={option.value}
                        whileTap={{ scale: 0.95 }}
                        onClick={() =>
                          setSelectedMood(
                            selectedMood === option.value ? null : option.value
                          )
                        }
                        className={`flex-1 py-3 rounded-xl border-2 transition-all ${
                          selectedMood === option.value
                            ? `${option.bg} ${option.border} ${option.color}`
                            : "bg-gray-50 border-gray-200"
                        }`}
                      >
                        <Icon
                          className={`w-5 h-5 mx-auto ${
                            selectedMood === option.value
                              ? option.color
                              : "text-gray-400"
                          }`}
                        />
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Sort */}
              <div>
                <label className="text-xs uppercase tracking-wider text-gray-500 mb-2 block">
                  Sort By
                </label>
                <div className="flex gap-2">
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSortBy("date")}
                    className={`flex-1 py-2.5 rounded-lg text-sm transition-all ${
                      sortBy === "date"
                        ? "bg-pink-500 text-white"
                        : "bg-gray-50 text-gray-600"
                    }`}
                  >
                    Date
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSortBy("mood")}
                    className={`flex-1 py-2.5 rounded-lg text-sm transition-all ${
                      sortBy === "mood"
                        ? "bg-pink-500 text-white"
                        : "bg-gray-50 text-gray-600"
                    }`}
                  >
                    Mood
                  </motion.button>
                </div>
              </div>

              {/* Clear Filters */}
              {selectedMood && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedMood(null)}
                  className="w-full py-2 text-sm text-pink-500 flex items-center justify-center gap-2"
                >
                  <X className="w-4 h-4" />
                  Clear Filters
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mood Stats */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-pink-100">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="w-4 h-4 text-pink-500" />
          <h3 className="text-xs uppercase tracking-wider text-gray-500">
            Mood Overview
          </h3>
        </div>
        <div className="flex gap-2">
          {moodOptions.map((option) => {
            const Icon = option.icon;
            const count = moodStats[option.value] || 0;
            return (
              <motion.button
                key={option.value}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedMood(selectedMood === option.value ? null : option.value)}
                className={`flex-1 p-3 rounded-xl transition-all ${
                  selectedMood === option.value
                    ? `${option.bg} ${option.border} border-2`
                    : "bg-gray-50 border border-gray-200"
                }`}
              >
                <Icon className={`w-5 h-5 mx-auto mb-1 ${option.color}`} />
                <div className={`text-lg ${selectedMood === option.value ? option.color : "text-gray-700"}`}>
                  {count}
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Entries List */}
      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {filteredAndSortedEntries.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-2xl p-8 text-center border border-pink-100"
            >
              <div className="w-16 h-16 bg-pink-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-pink-400" />
              </div>
              <h3 className="text-lg mb-2">No entries found</h3>
              <p className="text-sm text-gray-500">
                {searchQuery || selectedMood
                  ? "Try adjusting your filters"
                  : "Start your journey by creating your first diary entry"}
              </p>
            </motion.div>
          ) : (
            filteredAndSortedEntries.map((entry, index) => {
              const moodStyle = getMoodStyle(entry.mood);
              return (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ delay: index * 0.05 }}
                  layout
                >
                  <Link to={`/diary/${entry.id}`}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`bg-white rounded-2xl p-4 shadow-sm border-2 transition-all ${
                        selectedMood === entry.mood
                          ? `${moodStyle?.border} shadow-md`
                          : "border-pink-100 hover:border-pink-200 hover:shadow-md"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <motion.div
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                          className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                            moodStyle?.bg
                          } border-2 ${moodStyle?.border}`}
                        >
                          {getMoodIcon(entry.mood)}
                        </motion.div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-gray-500">
                              {formatDate(entry.date)}
                            </span>
                            {entry.analyzed && (
                              <motion.span
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="text-xs bg-pink-100 text-pink-600 px-2 py-1 rounded-full"
                              >
                                ✨ Analyzed
                              </motion.span>
                            )}
                          </div>
                          <p className="text-sm text-gray-700 line-clamp-2">
                            {entry.preview}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>

      {/* Journey Stats */}
      {entries.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl p-5 text-white mt-6 shadow-lg"
        >
          <h3 className="text-sm opacity-90 mb-3">Your Journey</h3>
          <div className="flex gap-6">
            <div>
              <div className="text-3xl">{entries.length}</div>
              <div className="text-xs opacity-90">Total Entries</div>
            </div>
            <div>
              <div className="text-3xl">
                {entries.filter((e) => e.analyzed).length}
              </div>
              <div className="text-xs opacity-90">Analyzed</div>
            </div>
            <div>
              <div className="text-3xl">{Object.keys(moodStats).length}</div>
              <div className="text-xs opacity-90">Unique Moods</div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
