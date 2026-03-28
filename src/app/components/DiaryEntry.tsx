import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router";
import {
  ArrowLeft,
  Save,
  Sparkles,
  Brain,
  MessageCircle,
  Calendar,
  Smile,
  Frown,
  Meh,
  Heart,
  Lightbulb,
} from "lucide-react";
import { motion } from "motion/react";

export function DiaryEntry() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = id === "new";

  const [entry, setEntry] = useState(
    isNew
      ? ""
      : "Today I felt really overwhelmed with work. There's so much going on and I'm not sure if I can handle it all. I keep thinking about all the deadlines and responsibilities, and it makes my chest feel tight. Sometimes I wonder if I'm good enough to handle everything that's being asked of me."
  );
  const [mood, setMood] = useState<string>(isNew ? "" : "anxious");
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<any>(
    isNew
      ? null
      : {
          emotions: ["Overwhelmed", "Anxious", "Self-doubt", "Stressed"],
          insights:
            "You're experiencing work-related stress that's manifesting physically. The self-questioning suggests imposter syndrome.",
          suggestions: [
            "Break tasks into smaller, manageable steps",
            "Practice self-compassion - acknowledge you're doing your best",
            "Consider discussing workload with your manager",
            "Try box breathing when you feel chest tightness",
          ],
        }
  );

  const handleAnalyze = () => {
    if (!entry.trim()) return;

    setAnalyzing(true);
    // Simulate AI analysis
    setTimeout(() => {
      const mockEmotions = [
        "Overwhelmed",
        "Anxious",
        "Uncertain",
        "Self-doubt",
      ];
      const mockInsights =
        "Based on your entry, you're experiencing a common stress response to high demands. Your awareness of these feelings is the first step toward managing them.";
      const mockSuggestions = [
        "Try the 5-4-3-2-1 grounding technique when feeling overwhelmed",
        "Write down specific concerns and evaluate each one objectively",
        "Remember past challenges you've successfully overcome",
        "Consider setting boundaries around work hours",
      ];

      setAnalysis({
        emotions: mockEmotions,
        insights: mockInsights,
        suggestions: mockSuggestions,
      });
      setAnalyzing(false);
    }, 2000);
  };

  const moodOptions = [
    {
      value: "happy",
      icon: Smile,
      color: "text-green-500",
      bg: "bg-green-100",
      activeBg: "bg-green-50",
      border: "border-green-400",
    },
    {
      value: "sad",
      icon: Frown,
      color: "text-blue-500",
      bg: "bg-blue-100",
      activeBg: "bg-blue-50",
      border: "border-blue-400",
    },
    {
      value: "neutral",
      icon: Meh,
      color: "text-gray-500",
      bg: "bg-gray-100",
      activeBg: "bg-gray-50",
      border: "border-gray-400",
    },
    {
      value: "anxious",
      icon: Heart,
      color: "text-orange-500",
      bg: "bg-orange-100",
      activeBg: "bg-orange-50",
      border: "border-orange-400",
    },
  ];

  return (
    <div className="min-h-full bg-gradient-to-br from-pink-50 via-white to-pink-50">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-xl border-b border-pink-100 px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/diary")}
            className="p-2 -ml-2"
          >
            <ArrowLeft className="w-6 h-6" />
          </motion.button>
          <span className="text-sm text-gray-500">
            {isNew ? "New Entry" : "March 27, 2026"}
          </span>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="p-2 -mr-2 text-pink-500"
          >
            <Save className="w-6 h-6" />
          </motion.button>
        </div>
      </div>

      <div className="p-6 space-y-4">
        {/* Mood Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-4 shadow-sm border border-pink-100"
        >
          <label className="text-sm text-gray-500 block mb-3">
            How are you feeling?
          </label>
          <div className="flex gap-2">
            {moodOptions.map((option) => {
              const Icon = option.icon;
              return (
                <motion.button
                  key={option.value}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setMood(option.value)}
                  className={`flex-1 py-3 rounded-xl border-2 transition-all ${
                    mood === option.value
                      ? `${option.activeBg} ${option.border} ${option.color}`
                      : "bg-gray-50 border-gray-200"
                  }`}
                >
                  <Icon
                    className={`w-6 h-6 mx-auto ${
                      mood === option.value ? option.color : "text-gray-400"
                    }`}
                  />
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Entry Text Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-4 shadow-sm border border-pink-100"
        >
          <textarea
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
            placeholder="What's on your mind? Express your thoughts and feelings freely..."
            className="w-full min-h-[200px] text-sm resize-none focus:outline-none"
          />
        </motion.div>

        {/* Analyze Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleAnalyze}
          disabled={analyzing || !entry.trim()}
          className="w-full bg-gradient-to-r from-pink-500 to-rose-600 text-white py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg active:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {analyzing ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Analyzing...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              <span>Analyze My Feelings</span>
            </>
          )}
        </motion.button>

        {/* Analysis Results */}
        {analysis && (
          <div className="space-y-3">
            {/* Detected Emotions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-5 shadow-sm border border-pink-100"
            >
              <div className="flex items-center gap-2 mb-3">
                <Brain className="w-5 h-5 text-pink-500" />
                <h3 className="text-sm">Detected Emotions</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {analysis.emotions.map((emotion: string, index: number) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="px-3 py-1.5 bg-pink-100 text-pink-700 text-sm rounded-full"
                  >
                    {emotion}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Insights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-5 shadow-sm border border-pink-100"
            >
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="w-5 h-5 text-yellow-500" />
                <h3 className="text-sm">Insights</h3>
              </div>
              <p className="text-sm text-gray-700">{analysis.insights}</p>
            </motion.div>

            {/* Suggestions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl p-5 shadow-sm border border-pink-100"
            >
              <div className="flex items-center gap-2 mb-3">
                <MessageCircle className="w-5 h-5 text-pink-500" />
                <h3 className="text-sm">Helpful Suggestions</h3>
              </div>
              <ul className="space-y-2">
                {analysis.suggestions.map((suggestion: string, index: number) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="flex gap-2 text-sm text-gray-700"
                  >
                    <span className="text-pink-500 flex-shrink-0">•</span>
                    <span>{suggestion}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}