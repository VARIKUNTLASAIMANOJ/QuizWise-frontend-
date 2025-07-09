// App.tsx

import {
  AlertCircle, BarChart3, Brain, Check, ChevronRight, Clock, Download, ExternalLink,
  FileSpreadsheet, FileText, Globe, GraduationCap, Link, Play, Target, Upload, Video, X
} from 'lucide-react';
import React, { useState } from 'react';
import LandingPage from './components/LandingPage';

interface QuizQuestion {
  question: string;
  options: string[];
  correct_answer: string;
  explanation?: string;
}

interface Quiz {
  title: string;
  questions: QuizQuestion[];
}

interface NotificationState {
  message: string;
  type: 'success' | 'error' | 'info';
  show: boolean;
}

function App() {
  const [filename, setFilename] = useState<string>('');
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [csvLink, setCsvLink] = useState<string>('');
  const [formLink, setFormLink] = useState<string>('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [showLanding, setShowLanding] = useState(true);
  const [notification, setNotification] = useState<NotificationState>({
    message: '',
    type: 'info',
    show: false
  });

  const notify = (message: string, type: 'success' | 'error' | 'info') => {
    setNotification({ message, type, show: true });
    setTimeout(() => {
      setNotification(prev => ({ ...prev, show: false }));
    }, 4000);
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!uploadedFile) {
      notify('Please select a file before uploading.', 'error');
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', uploadedFile);

    try {
      const res = await fetch('https://quizwise-backend.onrender.com/upload/', {
        method: 'POST',
        body: formData
      });

      if (res.ok) {
        const json = await res.json();
        setFilename(json.filename);
        notify('File uploaded successfully!', 'success');
      } else {
        notify('Failed to upload file', 'error');
      }
    } catch (error) {
      notify('Upload failed - check if server is running', 'error');
    } finally {
      setIsUploading(false);
    }
  };

  const generateFromDocument = async () => {
    if (!filename) {
      notify('No uploaded file', 'error');
      return;
    }

    setIsGenerating(true);
    try {
      const res = await fetch('https://quizwise-backend.onrender.com/generate-quiz/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filename })
      });

      if (res.ok) {
        const json = await res.json();
        setQuiz(json.quiz); // ✅ directly set
        notify('Quiz generated from document!', 'success');
      } else {
        notify('Quiz generation failed', 'error');
      }
    } catch (error) {
      notify('Generation failed - check if server is running', 'error');
    } finally {
      setIsGenerating(false);
    }
  };

  const generateFromVideo = async () => {
    if (!videoUrl.trim()) {
      notify('Please enter a video URL', 'error');
      return;
    }

    setIsGenerating(true);
    try {
      const res = await fetch('https://quizwise-backend.onrender.com/generate-video-quiz/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ video_url: videoUrl })
      });

      if (res.ok) {
        const json = await res.json();
        setQuiz(json.quiz); // ✅ directly set
        notify('Quiz generated from video!', 'success');
      } else {
        notify('Video quiz generation failed', 'error');
      }
    } catch (error) {
      notify('Generation failed - check if server is running', 'error');
    } finally {
      setIsGenerating(false);
    }
  };

  const exportToCsv = async () => {
    if (!quiz) return;

    setIsExporting(true);
    try {
      const res = await fetch('https://quizwise-backend.onrender.com/export-csv/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(quiz)
      });

      if (res.ok) {
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        setCsvLink(url);
        notify('CSV export ready!', 'success');
      } else {
        notify('Failed to export CSV', 'error');
      }
    } catch (error) {
      notify('Export failed - check if server is running', 'error');
    } finally {
      setIsExporting(false);
    }
  };
const exportToGoogleForm = async () => {
  if (!quiz) return;

  setIsExporting(true);
  try {
    const res = await fetch('https://quizwise-backend.onrender.com/export-google-forms/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quiz })  // ✅ FIXED: Removed wrapping `title` manually
    });

    if (res.ok) {
      const json = await res.json();
      setFormLink(json.url || 'Error: No form URL returned');
      notify('Google Form created!', 'success');
    } else {
      const errorJson = await res.json();
      notify(errorJson.error || 'Failed to export to Google Form', 'error');
    }
  } catch (error) {
    notify('Export failed - check if server is running', 'error');
  } finally {
    setIsExporting(false);
  }
};



  if (showLanding) {
    return <LandingPage onGetStarted={() => setShowLanding(false)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Notification */}
      {notification.show && (
        <div className={`fixed top-4 right-4 z-50 max-w-md w-full transform transition-all duration-300 ${
          notification.show ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        }`}>
          <div className={`p-4 rounded-lg shadow-lg border ${
            notification.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' :
            notification.type === 'error' ? 'bg-red-50 border-red-200 text-red-800' :
            'bg-blue-50 border-blue-200 text-blue-800'
          }`}>
            <div className="flex items-center">
              {notification.type === 'success' && <Check className="w-5 h-5 mr-3 text-green-600" />}
              {notification.type === 'error' && <X className="w-5 h-5 mr-3 text-red-600" />}
              {notification.type === 'info' && <AlertCircle className="w-5 h-5 mr-3 text-blue-600" />}
              <span className="font-medium">{notification.message}</span>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button 
                onClick={() => setShowLanding(true)}
                className="flex items-center hover:opacity-80 transition-opacity"
              >
                <Brain className="w-8 h-8 text-indigo-600 mr-3" />
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">QuizWise</h1>
                  <p className="text-sm text-gray-500">Intelligent Assessment Generator</p>
                </div>
              </button>
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center">
                <GraduationCap className="w-4 h-4 mr-2" />
                <span>Educational Platform</span>
              </div>
              <div className="flex items-center">
                <Target className="w-4 h-4 mr-2" />
                <span>AI-Powered</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Section */}
        <div className="mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold text-gray-900">Assessment Generation Workflow</h2>
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="w-4 h-4 mr-2" />
                <span>Typical processing: 2-5 minutes</span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-indigo-600 font-semibold text-sm">1</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Upload Content</p>
                  <p className="text-sm text-gray-600">Documents or video links</p>
                </div>
              </div>
              <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-indigo-600 font-semibold text-sm">2</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">AI Analysis</p>
                  <p className="text-sm text-gray-600">Content processing</p>
                </div>
              </div>
              <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-indigo-600 font-semibold text-sm">3</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Generate Quiz</p>
                  <p className="text-sm text-gray-600">Question creation</p>
                </div>
              </div>
              <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-indigo-600 font-semibold text-sm">4</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Export & Share</p>
                  <p className="text-sm text-gray-600">Multiple formats</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Input Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Document Upload */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center">
                <FileText className="w-6 h-6 text-gray-700 mr-3" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Document Processing</h3>
                  <p className="text-sm text-gray-600">Upload PDFs, images, or text documents</p>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                  <input
                    type="file"
                    id="fileInput"
                    accept=".pdf,.png,.jpg,.jpeg"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  <label htmlFor="fileInput" className="cursor-pointer">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-lg font-medium text-gray-900 mb-2">
                      {uploadedFile ? uploadedFile.name : 'Select Document'}
                    </p>
                    <p className="text-sm text-gray-600">
                      PDF, PNG, JPG, JPEG up to 10MB
                    </p>
                  </label>
                </div>
                
                <button
                  onClick={handleUpload}
                  disabled={!uploadedFile || isUploading}
                  className="w-full bg-indigo-600 text-white font-medium py-3 px-4 rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                >
                  {isUploading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <Upload className="w-5 h-5 mr-2" />
                      Upload Document
                    </>
                  )}
                </button>

                {filename && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center">
                    <Check className="w-5 h-5 text-green-600 mr-3" />
                    <div>
                      <p className="font-medium text-green-800">Document Ready</p>
                      <p className="text-sm text-green-700">{filename}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Video URL Input */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center">
                <Video className="w-6 h-6 text-gray-700 mr-3" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Video Content(Still Under Development)</h3>
                  <p className="text-sm text-gray-600">Process educational videos from URLs</p>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Video URL
                  </label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="url"
                      value={videoUrl}
                      onChange={(e) => setVideoUrl(e.target.value)}
                      placeholder="https://www.youtube.com/watch?v=..."
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <Play className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-blue-800">Supported Platforms</p>
                      <p className="text-sm text-blue-700">YouTube, Vimeo, educational platforms</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Generation Section */}
        {(filename || videoUrl.trim()) && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center">
                <Brain className="w-6 h-6 text-gray-700 mr-3" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">AI Quiz Generation</h3>
                  <p className="text-sm text-gray-600">Generate assessment questions from your content</p>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filename && (
                  <button
                    onClick={generateFromDocument}
                    disabled={isGenerating}
                    className="bg-indigo-600 text-white font-medium py-4 px-6 rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                  >
                    {isGenerating ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Analyzing Document...
                      </>
                    ) : (
                      <>
                        <FileText className="w-5 h-5 mr-2" />
                        Generate from Document
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </button>
                )}

                {videoUrl.trim() && (
                  <button
                    onClick={generateFromVideo}
                    disabled={isGenerating}
                    className="bg-purple-600 text-white font-medium py-4 px-6 rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                  >
                    {isGenerating ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Processing Video...
                      </>
                    ) : (
                      <>
                        <Video className="w-5 h-5 mr-2" />
                        Generate from Video(Coming Soon)
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Quiz Preview */}
        {quiz && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <BarChart3 className="w-6 h-6 text-gray-700 mr-3" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Generated Assessment</h3>
                    <p className="text-sm text-gray-600">{quiz.title}</p>
                  </div>
                </div>
                <div className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
                  {quiz.questions.length} Questions
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="max-h-96 overflow-y-auto space-y-6">
                {quiz.questions.map((question, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-3">
                      {index + 1}. {question.question}
                    </h4>
                    <div className="space-y-2">
                      {question.options.map((option, optIndex) => (
                        <div
                          key={optIndex}
                          className={`p-3 rounded-lg text-sm ${
                            option === question.correct_answer
                              ? 'bg-green-50 text-green-800 border border-green-200'
                              : 'bg-gray-50 text-gray-700'
                          }`}
                        >
                          <span className="font-medium mr-2">{String.fromCharCode(65 + optIndex)}.</span>
                          {option}
                        </div>
                      ))}
                    </div>
                    {question.explanation && (
                      <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <p className="text-sm text-blue-800">
                          <span className="font-medium">Explanation: </span>
                          {question.explanation}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Export Section */}
        {quiz && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center">
                <Download className="w-6 h-6 text-gray-700 mr-3" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Export Options</h3>
                  <p className="text-sm text-gray-600">Download or share your assessment</p>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <button
                  onClick={exportToCsv}
                  disabled={isExporting}
                  className="bg-green-600 text-white font-medium py-3 px-4 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                >
                  {isExporting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Preparing...
                    </>
                  ) : (
                    <>
                      <FileSpreadsheet className="w-5 h-5 mr-2" />
                      Export to CSV(Coming Soon)
                    </>
                  )}
                </button>

                <button
                  onClick={exportToGoogleForm}
                  disabled={isExporting}
                  className="bg-blue-600 text-white font-medium py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                >
                  {isExporting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Creating...
                    </>
                  ) : (
                    <>
                      <ExternalLink className="w-5 h-5 mr-2" />
                      Create Google Form
                    </>
                  )}
                </button>
              </div>

              {/* Export Results */}
              <div className="space-y-4">
                {csvLink && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center justify-between">
                    <div className="flex items-center">
                      <Check className="w-5 h-5 text-green-600 mr-3" />
                      <div>
                        <p className="font-medium text-green-800">CSV Export Ready</p>
                        <p className="text-sm text-green-700">Download your quiz data</p>
                      </div>
                    </div>
                    <a
                      href={csvLink}
                      download="quiz.csv"
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center font-medium"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </a>
                  </div>
                )}

                {formLink && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center justify-between">
                    <div className="flex items-center">
                      <Check className="w-5 h-5 text-blue-600 mr-3" />
                      <div>
                        <p className="font-medium text-blue-800">Google Form Created</p>
                        <p className="text-sm text-blue-700">Share with students or colleagues</p>
                      </div>
                    </div>
                    <a
                      href={formLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center font-medium"
                    >
                      <Link className="w-4 h-4 mr-2" />
                      Open Form
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} QuizWise. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;