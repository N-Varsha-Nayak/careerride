import { FileText, Zap, Clock } from 'lucide-react';
import Card, { CardHeader, CardTitle, CardContent, CardFooter } from '../components/ui/Card';

export default function AssessmentsPage() {
  const assessments = [
    { id: 1, title: 'DSA Fundamentals', duration: '60 min', questions: 20, difficulty: 'Easy', status: 'available' },
    { id: 2, title: 'Data Structures Deep Dive', duration: '90 min', questions: 30, difficulty: 'Medium', status: 'available' },
    { id: 3, title: 'Algorithm Mastery', duration: '120 min', questions: 40, difficulty: 'Hard', status: 'available' },
  ];

  return (
    <div className="app-container py-6">
      <div className="mb-6">
        <h1 className="text-4xl font-extrabold tracking-tight mb-2">Assessments</h1>
        <p className="text-lg text-gray-600">Evaluate your readiness with comprehensive, timed assessments</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {assessments.map((assessment) => (
          <Card key={assessment.id} className="hover:shadow-xl transition-shadow">
            <CardHeader className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg flex items-center justify-center">
                  <Zap className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <CardTitle className="!text-base">{assessment.title}</CardTitle>
                  <div className="text-sm text-gray-500">{assessment.questions} questions • {assessment.duration}</div>
                </div>
              </div>
              <div>
                <span className="text-xs font-semibold px-3 py-1 bg-green-100 text-green-700 rounded-full">Available</span>
              </div>
            </CardHeader>

            <CardContent>
              <div className="mt-2">
                <div className="flex items-center gap-3 text-sm text-gray-600 mb-3">
                  <Clock className="w-4 h-4" />
                  <span>{assessment.duration}</span>
                </div>

                <div className="inline-block">
                  <span className={`text-xs font-semibold px-2 py-1 rounded ${assessment.difficulty === 'Hard' ? 'bg-red-100 text-red-700' : assessment.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
                    {assessment.difficulty}
                  </span>
                </div>
              </div>
            </CardContent>

            <CardFooter>
              <div className="flex items-center gap-3">
                <button className="btn btn-primary w-full">Start Assessment</button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
