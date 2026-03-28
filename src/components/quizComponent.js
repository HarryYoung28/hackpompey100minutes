'use client'

import { useState } from 'react';
import data from '../lib/database.json'

export default function HobbyQuiz() {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    category: '',
    spoons: 0,
    intent: '',
    place: '',
    social: ''
  });
  const [results, setResults] = useState([]);

  // 1. Setup allowed categories
  const allowedCategories = ["Physical and Sports", "Outdoor and Nature", "Making and Crafting"];
  const categories = data.categories.filter(c => allowedCategories.includes(c.category));

  const handleAnswer = (key, value) => {
    const newAnswers = { ...answers, [key]: value };
    setAnswers(newAnswers);

    if (step < 5) {
      setStep(step + 1);
    } else {
      calculateResults(newAnswers);
    }
  };

  const calculateResults = (finalAnswers) => {
    const selectedCategory = data.categories.find(c => c.category === finalAnswers.category);
    
    // Calculate scores just like the CLI version
    const scoredHobbies = selectedCategory.hobbies.map(hobby => {
      let matchCount = 0;
      if (hobby.spoons <= finalAnswers.spoons) matchCount++;
      if (hobby.intent === finalAnswers.intent) matchCount++;
      if (hobby.place === finalAnswers.place || hobby.place === 'both') matchCount++;
      if (hobby.social === finalAnswers.social || hobby.social === 'both' || finalAnswers.social === 'both') matchCount++;
      
      return { ...hobby, score: matchCount };
    });

    // Filter for >= 2 matches, then sort so perfect fits (score 4) are at the top
    const filteredResults = scoredHobbies
      .filter(h => h.score >= 2)
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);

    setResults(filteredResults);
    setStep(6);
  };

  const resetQuiz = () => {
    setStep(1);
    setAnswers({ category: '', spoons: 0, intent: '', place: '', social: '' });
    setResults([]);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-xl border border-gray-100 mt-20">
      <h2 className="text-2xl font-bold text-sage-special mb-6 text-center border-b pb-4">
        Hobby Finder
      </h2>

      {/* Step 1: Category */}
      {step === 1 && (
        <div className="space-y-4 animate-fadeIn">
          <h3 className="text-lg font-medium text-gray-800 mb-4">What category are you interested in?</h3>
          {categories.map((cat, i) => (
            <button 
              key={i} 
              onClick={() => handleAnswer('category', cat.category)}
              className="w-full text-left px-6 py-4 rounded-lg border-2 border-sage-special/20 hover:border-sage-special hover:bg-sage-special/5 text-gray-700 transition-colors duration-200 font-medium"
            >
              {cat.category}
            </button>
          ))}
        </div>
      )}

      {/* Step 2: Spoons */}
      {step === 2 && (
        <div className="space-y-4 animate-fadeIn">
          <h3 className="text-lg font-medium text-gray-800 mb-2">How much effort (spoons) can you give?</h3>
          <p className="text-sm text-gray-500 mb-4">1 = Very easy / low energy, 5 = High effort / high energy</p>
          {[1, 2, 3, 4, 5].map((num) => (
            <button 
              key={num} 
              onClick={() => handleAnswer('spoons', num)}
              className="w-full text-left px-6 py-4 rounded-lg border-2 border-sage-special/20 hover:border-sage-special hover:bg-sage-special/5 text-gray-700 transition-colors duration-200"
            >
              {num} {num === 1 ? 'Spoon' : 'Spoons'}
            </button>
          ))}
        </div>
      )}

      {/* Step 3: Intent */}
      {step === 3 && (
        <div className="space-y-4 animate-fadeIn">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Are you looking to relax or learn?</h3>
          <button onClick={() => handleAnswer('intent', 'relax')} className="w-full text-left px-6 py-4 rounded-lg border-2 border-sage-special/20 hover:border-sage-special hover:bg-sage-special/5 text-gray-700 transition-colors duration-200">
            I want to relax
          </button>
          <button onClick={() => handleAnswer('intent', 'learn something')} className="w-full text-left px-6 py-4 rounded-lg border-2 border-sage-special/20 hover:border-sage-special hover:bg-sage-special/5 text-gray-700 transition-colors duration-200">
            I want to learn something new
          </button>
        </div>
      )}

      {/* Step 4: Place */}
      {step === 4 && (
        <div className="space-y-4 animate-fadeIn">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Indoor or outdoor?</h3>
          {['Indoor', 'Outdoor', 'Both'].map((place) => (
            <button 
              key={place}
              onClick={() => handleAnswer('place', place.toLowerCase())} 
              className="w-full text-left px-6 py-4 rounded-lg border-2 border-sage-special/20 hover:border-sage-special hover:bg-sage-special/5 text-gray-700 transition-colors duration-200"
            >
              {place}
            </button>
          ))}
        </div>
      )}

      {/* Step 5: Social */}
      {step === 5 && (
        <div className="space-y-4 animate-fadeIn">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Social Preference?</h3>
          {['Solo', 'Group', 'Both'].map((social) => (
            <button 
              key={social}
              onClick={() => handleAnswer('social', social.toLowerCase())} 
              className="w-full text-left px-6 py-4 rounded-lg border-2 border-sage-special/20 hover:border-sage-special hover:bg-sage-special/5 text-gray-700 transition-colors duration-200"
            >
              {social === 'Both' ? "I don't mind" : social}
            </button>
          ))}
        </div>
      )}

      {/* Step 6: Results */}
      {step === 6 && (
        <div className="animate-fadeIn">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Your Best Fits:</h3>
          
          {results.length === 0 ? (
            <p className="text-gray-600 bg-gray-50 p-4 rounded-lg">No hobbies matched enough of your criteria. Try being more flexible!</p>
          ) : (
            <div className="space-y-6">
              {results.map((h, i) => (
                <div key={i} className="bg-sage-special/5 border-l-4 border-sage-special p-5 rounded-r-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-lg font-bold text-gray-900">{h.hobby.toUpperCase()}</h4>
                    <span className="text-xs font-bold px-2 py-1 bg-sage-special text-white rounded-full">
                      {h.score}/4 Match
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3 leading-relaxed">{h.description}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-700 mt-4 pt-4 border-t border-sage-special/10">
                    <div><span className="font-semibold text-sage-special">Where:</span> {h.local_places.join(', ')}</div>
                    <div><span className="font-semibold text-sage-special">Cost:</span> {h.cost}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <button 
            onClick={resetQuiz} 
            className="mt-8 w-full py-3 bg-sage-special text-white font-bold rounded-lg hover:opacity-90 transition-opacity"
          >
            Start Over
          </button>
        </div>
      )}
    </div>
  );
}