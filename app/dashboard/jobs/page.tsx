export default function JobsPage() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-200">
        <h1 className="text-xl font-semibold text-slate-900">Job Notify</h1>
        <p className="text-sm text-slate-600">Embedded original app under `/dashboard/jobs`.</p>
      </div>
      <iframe
        title="Job Notify"
        src="/jobnotify/index.html"
        className="w-full h-[calc(100vh-12rem)] border-0"
      />
    </div>
  );
}