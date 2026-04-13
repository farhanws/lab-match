import { useState } from 'react';
import { GraduationCap, Mail, BookOpen, FlaskConical, ChevronDown, ChevronUp, Search, FileText, XCircle, Clock } from 'lucide-react';
import Navbar from '../components/Navbar';
import { useApp } from '../context/AppContext';

function ApplicationCard({ app }) {
  const [expanded, setExpanded] = useState(false);
  const { updateApplicationStatus } = useApp();
  const snap = app.studentSnapshot;

  const gradeColor = (grade) => {
    if (grade === 'A') return 'text-green-700 bg-green-50';
    if (grade === 'AB') return 'text-teal-700 bg-teal-50';
    if (grade === 'B') return 'text-blue-700 bg-blue-50';
    if (grade === 'BC') return 'text-indigo-700 bg-indigo-50';
    if (grade === 'C') return 'text-yellow-700 bg-yellow-50';
    return 'text-red-700 bg-red-50';
  };

  return (
    <div className="card overflow-hidden">
      <div className="p-5">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
            {snap.name.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-semibold text-gray-900">{snap.name}</h3>
                <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    <Mail size={11} /> {snap.email}
                  </span>
                  <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-medium">{snap.year}</span>
                  <span className="text-xs bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full font-medium">{snap.major}</span>
                  {snap.gpa && <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full font-medium">GPA: {snap.gpa}</span>}
                </div>
              </div>
              <div className="flex flex-col items-end gap-2 flex-shrink-0">
                <span className="text-xs text-gray-400 whitespace-nowrap">
                  {new Date(app.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </span>
                {app.status === 'declined' ? (
                  <span className="flex items-center gap-1 text-xs font-semibold text-red-600 bg-red-50 px-2.5 py-1 rounded-full">
                    <XCircle size={12} /> Declined
                  </span>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1 text-xs font-semibold text-yellow-700 bg-yellow-50 px-2.5 py-1 rounded-full">
                      <Clock size={12} /> Under Review
                    </span>
                    <button
                      onClick={() => updateApplicationStatus(app.id, 'declined')}
                      className="flex items-center gap-1 text-xs font-semibold text-white bg-red-500 hover:bg-red-600 px-2.5 py-1 rounded-full transition-colors"
                    >
                      <XCircle size={12} /> Decline
                    </button>
                  </div>
                )}
              </div>
            </div>

            {snap.bio && (
              <p className="text-sm text-gray-500 mt-2 italic">"{snap.bio}"</p>
            )}

            <div className="mt-3 bg-gray-50 rounded-xl p-3">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Message</p>
              <p className={`text-sm text-gray-700 leading-relaxed ${!expanded ? 'line-clamp-3' : ''}`}>
                {app.message}
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-4 w-full flex items-center justify-center gap-1.5 text-xs text-gray-500 hover:text-uw-red transition-colors py-1"
        >
          {expanded ? <><ChevronUp size={14} /> Hide details</> : <><ChevronDown size={14} /> View full profile</>}
        </button>
      </div>

      {expanded && (
        <div className="border-t border-gray-100 bg-gray-50 p-5 space-y-4">
          {/* Documents */}
          {(snap.resumeFile || snap.transcriptFile) && (
            <div>
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide flex items-center gap-1.5 mb-2">
                <FileText size={12} /> Documents
              </h4>
              <div className="flex flex-wrap gap-2">
                {snap.resumeFile && (
                  <div className="flex items-center gap-1.5 bg-white rounded-lg px-3 py-1.5 border border-blue-200 text-blue-700 text-sm font-medium">
                    <FileText size={13} /> {snap.resumeFile.name}
                  </div>
                )}
                {snap.transcriptFile && (
                  <div className="flex items-center gap-1.5 bg-white rounded-lg px-3 py-1.5 border border-purple-200 text-purple-700 text-sm font-medium">
                    <FileText size={13} /> {snap.transcriptFile.name}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Classes */}
          {snap.classes?.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide flex items-center gap-1.5 mb-2">
                <BookOpen size={12} /> Relevant Coursework
              </h4>
              <div className="flex flex-wrap gap-2">
                {snap.classes.map((c, i) => (
                  <div key={i} className="flex items-center gap-1.5 bg-white rounded-lg px-3 py-1.5 border border-gray-200">
                    <span className="text-sm text-gray-700">{c.name}</span>
                    <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${gradeColor(c.grade)}`}>{c.grade}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Research Experience */}
          {snap.researchExperience?.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide flex items-center gap-1.5 mb-2">
                <FlaskConical size={12} /> Research Experience
              </h4>
              <div className="space-y-2">
                {snap.researchExperience.map((exp, i) => (
                  <div key={i} className="bg-white rounded-xl p-3 border border-gray-200">
                    <p className="text-sm font-semibold text-gray-800">{exp.title}</p>
                    <p className="text-xs text-gray-500">{exp.lab}{exp.duration ? ` · ${exp.duration}` : ''}</p>
                    {exp.description && <p className="text-sm text-gray-600 mt-1">{exp.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function ProfessorDashboard() {
  const { currentUser, getProfessorApplications } = useApp();
  const [search, setSearch] = useState('');
  const applications = getProfessorApplications(currentUser.id);

  const filtered = applications.filter(app => {
    const q = search.toLowerCase();
    return !q || app.studentSnapshot.name.toLowerCase().includes(q)
      || app.studentSnapshot.major?.toLowerCase().includes(q)
      || app.message.toLowerCase().includes(q);
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-5">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-1">
              <h1 className="text-xl font-bold text-gray-900">Student Applications</h1>
              <p className="text-sm text-gray-500 mt-0.5">{filtered.length} application{filtered.length !== 1 ? 's' : ''} received</p>
            </div>
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="input-field pl-9"
                placeholder="Search applicants..."
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <GraduationCap className="mx-auto text-gray-300 mb-3" size={48} />
            <p className="text-gray-500 font-medium">
              {applications.length === 0 ? 'No applications yet' : 'No applications match your search'}
            </p>
            <p className="text-sm text-gray-400 mt-1">
              {applications.length === 0 ? 'Students who message you will appear here' : 'Try different search terms'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map(app => <ApplicationCard key={app.id} app={app} />)}
          </div>
        )}
      </div>
    </div>
  );
}
