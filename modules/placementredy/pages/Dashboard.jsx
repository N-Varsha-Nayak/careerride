import React from 'react';
import { Code2, Video, TrendingUp, Award } from 'lucide-react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from 'recharts';
import CircularProgress from '../components/CircularProgress';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';

/* ---------------- Mock Data ---------------- */

const radarData = [
  { subject: 'DSA', A: 75 },
  { subject: 'System Design', A: 60 },
  { subject: 'Communication', A: 80 },
  { subject: 'Resume', A: 85 },
  { subject: 'Aptitude', A: 70 },
];

/* ---------------- Cards ---------------- */

function ContinuePracticeCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Continue Practice</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="mb-3">
          <p className="font-semibold text-gray-900">
            Dynamic Programming
          </p>
          <p className="text-sm text-gray-600">
            3 of 10 problems completed
          </p>
        </div>

        <div className="w-full bg-gray-100 rounded-full h-3 mb-4">
          <div
            className="bg-gradient-to-r from-indigo-600 to-purple-600 h-3 rounded-full"
            style={{ width: '30%' }}
          />
        </div>

        <div className="flex justify-end">
          <button className="btn btn-primary">
            Continue
          </button>
        </div>
      </CardContent>
    </Card>
  );
}

function WeeklyGoalsCard() {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const active = [true, true, false, true, true, false, false];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Goals</CardTitle>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-gray-600 mb-3">
          Problems Solved:{' '}
          <span className="font-semibold text-gray-900">
            12/20
          </span>
        </p>

        <div className="w-full bg-gray-100 rounded-full h-3 mb-4">
          <div
            className="bg-gradient-to-r from-indigo-600 to-purple-600 h-3 rounded-full"
            style={{ width: '60%' }}
          />
        </div>

        <div className="flex items-center gap-3">
          {days.map((d, i) => (
            <div key={d} className="flex flex-col items-center">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center
                ${
                  active[i]
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                    : 'bg-gray-100 text-gray-500'
                }`}
              >
                <span className="text-xs font-semibold">
                  {d.slice(0, 1)}
                </span>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {d}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function UpcomingAssessmentsCard() {
  const items = [
    { title: 'DSA Mock Test', time: 'Tomorrow, 10:00 AM' },
    { title: 'System Design Review', time: 'Wed, 2:00 PM' },
    { title: 'HR Interview Prep', time: 'Friday, 11:00 AM' },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Assessments</CardTitle>
      </CardHeader>

      <CardContent>
        <ul className="space-y-3">
          {items.map((it) => (
            <li
              key={it.title}
              className="flex items-start justify-between"
            >
              <div>
                <p className="font-semibold text-gray-900">
                  {it.title}
                </p>
                <p className="text-sm text-gray-600">
                  {it.time}
                </p>
              </div>
              <div className="text-sm text-gray-400">
                →
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

/* ---------------- Page ---------------- */

export default function DashboardPage() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-8">

      {/* Header */}
      <div>
        <h1 className="mb-2 text-4xl font-bold tracking-tight text-gray-900">
          Dashboard
        </h1>
        <p className="text-lg text-gray-600">
          Personalized overview of your placement readiness
        </p>
      </div>

      {/* Layout */}
      <div className="grid gap-6 lg:grid-cols-2">

        {/* Left: Big Readiness Card */}
        <div className="grid gap-6">
          <Card className="md:col-span-2">
            <CardContent>
              <div className="flex items-center gap-8">
                <CircularProgress value={72} />

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Overall Readiness
                  </h3>
                  <p className="text-sm text-gray-600 max-w-md">
                    A holistic score based on your practice consistency,
                    mock performance, and activity level.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right: Stack */}
        <div className="space-y-6">
          <ContinuePracticeCard />
          <WeeklyGoalsCard />
          <UpcomingAssessmentsCard />
        </div>

      </div>
    </div>
  );
}
