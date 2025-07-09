import {
    ArrowRight,
    Brain,
    CheckCircle,
    ChevronRight,
    Clock,
    FileText,
    GraduationCap,
    Sparkles,
    Target,
    Users,
    Video
} from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

export default function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute -bottom-8 left-40 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000"></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%239C92AC%22 fill-opacity=%220.1%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>

      <div className="relative z-10">
        {/* Navigation */}
        <nav className="px-6 py-6">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">QuizWise</h1>
                
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-8 text-white/80">
              <a href="#features" className="hover:text-white transition-colors">Features</a>
              <a href="#how-it-works" className="hover:text-white transition-colors">How it Works</a>
              <a href="#benefits" className="hover:text-white transition-colors">Benefits</a>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="px-6 py-20">
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium mb-8">
              <Sparkles className="w-4 h-4 mr-2" />
              AI-Powered Assessment Generation
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Transform Content into
              <span className="block bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                Smart Quizzes
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed">
              Upload documents, paste video links, and let our {/*Gemini-powered*/} AI create comprehensive assessments in seconds. Perfect for educators, trainers, and content creators.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <button
                onClick={onGetStarted}
                className="group bg-white text-gray-900 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-300 flex items-center shadow-2xl hover:shadow-white/20"
              >
                Get Started
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              {/* <button className="text-white border-2 border-white/30 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
                Watch Demo
              </button> */}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">2-5 min</div>
                <div className="text-white/70">Average Processing Time</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">Multiple</div>
                <div className="text-white/70">Export Formats</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">AI-Powered</div>
                <div className="text-white/70">by Gemini</div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div id="features" className="px-6 py-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">Powerful Features</h2>
              <p className="text-xl text-white/70 max-w-2xl mx-auto">
                Everything you need to create engaging assessments from any content
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-6">
                  <FileText className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">Document Processing</h3>
                <p className="text-white/70 mb-4">
                  Upload PDFs, images, or text documents and let AI extract key concepts for quiz generation.
                </p>
                <div className="flex items-center text-blue-400 text-sm font-medium">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  PDF, PNG, JPG, JPEG supported
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-6">
                  <Video className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">Video Analysis(Under Development)</h3>
                <p className="text-white/70 mb-4">
                  Paste YouTube or educational video links to generate quizzes from video content.
                </p>
                <div className="flex items-center text-purple-400 text-sm font-medium">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  YouTube, Vimeo supported
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-6">
                  <Brain className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">AI Generation</h3>
                <p className="text-white/70 mb-4">
                  Advanced Gemini AI creates contextual questions with multiple choice answers and explanations.
                </p>
                <div className="flex items-center text-green-400 text-sm font-medium">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Powered by {/*Google*/} Gemini
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center mb-6">
                  <Target className="w-6 h-6 text-yellow-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">Smart Export</h3>
                <p className="text-white/70 mb-4">
                  Export to CSV for data analysis or Create Google Forms for instant sharing with students.
                </p>
                <div className="flex items-center text-yellow-400 text-sm font-medium">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  CSV & Google Forms
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="w-12 h-12 bg-pink-500/20 rounded-xl flex items-center justify-center mb-6">
                  <Clock className="w-6 h-6 text-pink-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">Fast Processing</h3>
                <p className="text-white/70 mb-4">
                  Generate comprehensive quizzes in 2-5 minutes, saving hours of manual question creation.
                </p>
                <div className="flex items-center text-pink-400 text-sm font-medium">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Lightning fast results
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center mb-6">
                  <Users className="w-6 h-6 text-indigo-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">Educational Focus</h3>
                <p className="text-white/70 mb-4">
                  Designed specifically for educators, trainers, and content creators in educational settings.
                </p>
                <div className="flex items-center text-indigo-400 text-sm font-medium">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Education-optimized
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div id="how-it-works" className="px-6 py-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">How It Works</h2>
              <p className="text-xl text-white/70 max-w-2xl mx-auto">
                Simple 4-step process to transform any content into engaging assessments
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-white font-bold text-xl">1</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">Upload Content</h3>
                <p className="text-white/70">
                  Upload your documents or paste video links from educational platforms
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-white font-bold text-xl">2</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">AI Analysis</h3>
                <p className="text-white/70">
                  {/*Gemini*/} AI processes and understands your content to identify key concepts
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-white font-bold text-xl">3</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">Generate Quiz</h3>
                <p className="text-white/70">
                  AI creates contextual questions with multiple choice answers and explanations
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-green-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-white font-bold text-xl">4</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">Export & Share</h3>
                <p className="text-white/70">
                  Download as CSV or Create Google Forms to share with your students
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="px-6 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-12 border border-white/20">
              <GraduationCap className="w-16 h-16 text-white mx-auto mb-6" />
              <h2 className="text-4xl font-bold text-white mb-6">
                Ready to Transform Your Content?
              </h2>
              <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                Join educators worldwide who are saving time and creating better assessments with AI-powered quiz generation.
              </p>
              <button
                onClick={onGetStarted}
                className="group bg-gradient-to-r from-blue-500 to-purple-500 text-white px-10 py-5 rounded-2xl font-semibold text-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 flex items-center mx-auto shadow-2xl hover:shadow-purple-500/25"
              >
                Start Creating Quizzes
                <ChevronRight className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="px-6 py-12 border-t border-white/10">
          <div className="max-w-7xl mx-auto text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">QuizWise</span>
            </div>
            <p className="text-white/60 mb-4">
              Transforming education through intelligent assessment generation
            </p>
            <div className="max-w-7xl mx-auto text-center">
            <p className="text-white/60 text-sm">
              © {new Date().getFullYear()} QuizWise. All rights reserved.
            </p>
          </div>
          </div>
        </footer>
      </div>
    </div>
  );
}