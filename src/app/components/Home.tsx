import { Link } from "react-router";
import { BookHeart, PenLine, Heart, Sparkles } from "lucide-react";

export function Home() {
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Card */}
      <div className="bg-gradient-to-br from-pink-500 to-rose-600 rounded-3xl p-6 text-white shadow-lg">
        <div className="flex items-center gap-2 mb-2">
          <Heart className="w-5 h-5 fill-white" />
          <span className="text-sm opacity-90">{currentDate}</span>
        </div>
        <h2 className="text-2xl mb-2">How are you feeling today?</h2>
        <p className="text-sm opacity-90">
          Let's explore your emotions together and find the right words to express them.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="space-y-3">
        <h3 className="text-sm uppercase tracking-wider text-gray-500 px-2">
          Quick Start
        </h3>
        
        <Link to="/diary">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-pink-100 active:scale-[0.98] transition-transform hover:shadow-md hover:border-pink-200">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
                <BookHeart className="w-6 h-6 text-pink-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg mb-1">Therapy Diary</h3>
                <p className="text-sm text-gray-500">
                  Record your thoughts and feelings in a safe, private space
                </p>
              </div>
            </div>
          </div>
        </Link>

        <Link to="/editor">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-pink-100 active:scale-[0.98] transition-transform hover:shadow-md hover:border-pink-200">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center flex-shrink-0">
                <PenLine className="w-6 h-6 text-rose-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg mb-1">Text Editor</h3>
                <p className="text-sm text-gray-500">
                  Get help expressing your feelings with confidence
                </p>
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* Features */}
      <div className="space-y-3 pt-4">
        <h3 className="text-sm uppercase tracking-wider text-gray-500 px-2">
          What We Offer
        </h3>
        
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-pink-100">
          <div className="space-y-4">
            <div className="flex gap-3">
              <Sparkles className="w-5 h-5 text-pink-500 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm mb-1">Emotional Understanding</h4>
                <p className="text-xs text-gray-500">
                  AI-powered insights to help identify and name your emotions
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Heart className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm mb-1">Safe Space</h4>
                <p className="text-xs text-gray-500">
                  Your private journal to express yourself freely
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <PenLine className="w-5 h-5 text-pink-500 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm mb-1">Better Communication</h4>
                <p className="text-xs text-gray-500">
                  Learn to articulate your feelings with clarity and confidence
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}