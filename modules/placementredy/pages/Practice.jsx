import { Code2, Star, Clock } from 'lucide-react';

export default function PracticePage() {
  const problems = [
    { id: 1, title: 'Two Sum', difficulty: 'Easy', acceptance: 92, time: '5-10 min' },
    { id: 2, title: 'Reverse String', difficulty: 'Easy', acceptance: 88, time: '5-10 min' },
    { id: 3, title: 'Merge Sorted Array', difficulty: 'Easy', acceptance: 85, time: '10-15 min' },
    { id: 4, title: 'Binary Search', difficulty: 'Medium', acceptance: 75, time: '15-20 min' },
    { id: 5, title: 'Longest Substring', difficulty: 'Medium', acceptance: 68, time: '20-30 min' },
    { id: 6, title: 'Word Ladder', difficulty: 'Hard', acceptance: 45, time: '30-45 min' },
  ];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-100 text-green-700';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-700';
      case 'Hard':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="max-w-7xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Practice Problems</h1>
        <p className="text-lg text-gray-600">Solve coding problems to improve your skills</p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Problem</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Difficulty</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Acceptance</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Time</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Action</th>
              </tr>
            </thead>
            <tbody>
              {problems.map((problem, i) => (
                <tr key={problem.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Code2 className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{problem.title}</p>
                        <p className="text-sm text-gray-600">Problem #{problem.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getDifficultyColor(problem.difficulty)}`}>
                      {problem.difficulty}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-12 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${problem.acceptance}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900">{problem.acceptance}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-gray-600 text-sm">
                      <Clock className="w-4 h-4" />
                      {problem.time}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors">
                      Solve
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

