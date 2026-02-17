import { Code, Video, BarChart3 } from "lucide-react";

const features = [
  {
    icon: Code,
    title: "Practice Problems",
    description:
      "Solve curated coding challenges across data structures, algorithms, and more.",
  },
  {
    icon: Video,
    title: "Mock Interviews",
    description:
      "Simulate real interview scenarios with timed sessions and feedback.",
  },
  {
    icon: BarChart3,
    title: "Track Progress",
    description:
      "Monitor your strengths, weaknesses, and readiness with detailed analytics.",
  },
];

const Landing = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      
      <section className="hero-gradient min-h-[70vh] flex items-center justify-center text-white px-6">
  <div className="text-center">
    <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
      Ace Your Placement
    </h1>
    <p className="text-lg opacity-90 mb-8">
      Practice, assess, and prepare for your dream job
    </p>
    <button
      onClick={() => {
        window.location.href = "/dashboard/prep";
      }}
      className="bg-white text-purple-700 font-semibold px-8 py-3 rounded-lg shadow hover:shadow-lg transition"
    >
      Get Started
    </button>
  </div>
</section>


      {/* Features */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-14 text-gray-900">
            Everything you need to get placed
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="bg-white rounded-xl border border-gray-200 p-8 text-center shadow-sm hover:shadow-md transition"
                >
                  <div className="w-14 h-14 rounded-xl bg-purple-100 flex items-center justify-center mx-auto mb-5">
                    <Icon className="w-7 h-7 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8 px-6 bg-white">
        <p className="text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Placement Prep. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Landing;
