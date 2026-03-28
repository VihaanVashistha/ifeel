import { useState } from "react";
import {
  Sparkles,
  Copy,
  Check,
  RefreshCw,
  MessageCircle,
  ThumbsUp,
  Lightbulb,
} from "lucide-react";
import { motion } from "motion/react";

export function TextEditor() {
  const [inputText, setInputText] = useState("");
  const [context, setContext] = useState("");
  const [suggestions, setSuggestions] = useState<any>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleAnalyze = () => {
    if (!inputText.trim()) return;

    setAnalyzing(true);
    // Simulate AI analysis
    setTimeout(() => {
      const mockSuggestions = {
        tone: "Your message comes across as uncertain and apologetic. Consider using more confident language.",
        improvedVersions: [
          {
            title: "More Confident",
            text: "I need to discuss the project timeline with you. I've been working hard on this, but I need some clarity on expectations to deliver my best work. Can we schedule time to talk?",
            improvements: ["Removed apologetic language", "Added assertiveness", "Clear call to action"],
          },
          {
            title: "Empathetic & Clear",
            text: "I wanted to reach out about the project timeline. I'm feeling overwhelmed with the current deadlines and want to ensure I deliver quality work. Could we discuss adjusting the schedule or priorities?",
            improvements: ["Honest about feelings", "Solution-focused", "Collaborative tone"],
          },
          {
            title: "Professional & Direct",
            text: "I'd like to discuss the project timeline. I'm committed to delivering excellent work and need to align on realistic deadlines. When can we meet to review the schedule?",
            improvements: ["Professional tone", "Shows commitment", "Direct request"],
          },
        ],
        emotionalTone: ["Anxious", "Uncertain", "Seeking validation"],
        tips: [
          "Avoid starting with apologies unless you made a mistake",
          "Use 'I' statements to own your feelings confidently",
          "Be specific about what you need",
          "End with a clear question or action item",
        ],
      };

      setSuggestions(mockSuggestions);
      setAnalyzing(false);
    }, 2000);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-6 space-y-4 pb-8">
      {/* Context Input */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-4 shadow-sm border border-pink-100"
      >
        <label className="text-sm text-gray-500 block mb-2">
          What's the situation? (optional)
        </label>
        <input
          type="text"
          value={context}
          onChange={(e) => setContext(e.target.value)}
          placeholder="e.g., Talking to my boss, texting a friend..."
          className="w-full text-sm focus:outline-none"
        />
      </motion.div>

      {/* Text Input */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl p-4 shadow-sm border border-pink-100"
      >
        <label className="text-sm text-gray-500 block mb-2">
          What do you want to say?
        </label>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type or paste your message here. I'll help you express it with more confidence and clarity..."
          className="w-full min-h-[150px] text-sm resize-none focus:outline-none"
        />
        <div className="text-xs text-gray-400 mt-2">
          {inputText.length} characters
        </div>
      </motion.div>

      {/* Analyze Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleAnalyze}
        disabled={analyzing || !inputText.trim()}
        className="w-full bg-gradient-to-r from-pink-500 to-rose-600 text-white py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {analyzing ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span>Analyzing...</span>
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5" />
            <span>Help Me Express This Better</span>
          </>
        )}
      </motion.button>

      {/* Results */}
      {suggestions && (
        <div className="space-y-3 pt-2">
          {/* Emotional Tone */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-5 shadow-sm border border-pink-100"
          >
            <div className="flex items-center gap-2 mb-3">
              <MessageCircle className="w-5 h-5 text-pink-500" />
              <h3 className="text-sm">Current Emotional Tone</h3>
            </div>
            <div className="flex flex-wrap gap-2 mb-3">
              {suggestions.emotionalTone.map((tone: string, index: number) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="px-3 py-1.5 bg-pink-100 text-pink-700 text-sm rounded-full"
                >
                  {tone}
                </motion.span>
              ))}
            </div>
            <p className="text-sm text-gray-700">{suggestions.tone}</p>
          </motion.div>

          {/* Improved Versions */}
          <div className="space-y-3">
            <h3 className="text-sm text-gray-500 px-2">Suggested Versions</h3>
            {suggestions.improvedVersions.map((version: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.1 }}
                className="bg-white rounded-2xl p-5 shadow-sm border border-pink-100"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <ThumbsUp className="w-4 h-4 text-pink-500" />
                    <h4 className="text-sm">{version.title}</h4>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleCopy(version.text)}
                    className="p-2 rounded-lg hover:bg-pink-50 active:scale-95 transition-all"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4 text-gray-400" />
                    )}
                  </motion.button>
                </div>
                <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                  {version.text}
                </p>
                <div className="space-y-1">
                  {version.improvements.map((improvement: string, i: number) => (
                    <div key={i} className="flex gap-2 text-xs text-gray-500">
                      <span className="text-pink-500">✓</span>
                      <span>{improvement}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Tips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-2xl p-5 shadow-sm border border-pink-100"
          >
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="w-5 h-5 text-yellow-500" />
              <h3 className="text-sm">Communication Tips</h3>
            </div>
            <ul className="space-y-2">
              {suggestions.tips.map((tip: string, index: number) => (
                <li key={index} className="flex gap-2 text-sm text-gray-700">
                  <span className="text-yellow-500 flex-shrink-0">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Try Again Button */}
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={handleAnalyze}
            className="w-full bg-pink-100 text-pink-700 py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-pink-200 transition-colors"
          >
            <RefreshCw className="w-5 h-5" />
            <span>Generate New Suggestions</span>
          </motion.button>
        </div>
      )}

      {/* Info Card */}
      {!suggestions && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl p-5 text-white shadow-lg"
        >
          <h3 className="text-sm mb-2">💡 How This Works</h3>
          <p className="text-sm opacity-90 leading-relaxed">
            Share what you want to say, and I'll help you express it with more
            confidence, clarity, and emotional intelligence. You'll get multiple
            versions to choose from, tailored to different communication styles.
          </p>
        </motion.div>
      )}
    </div>
  );
}