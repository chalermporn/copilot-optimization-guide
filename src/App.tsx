import React, { useState, useEffect } from 'react';
import { 
  Code2, MessageSquare, Zap, ShieldCheck, 
  Activity, Gauge, Lightbulb, ChevronRight, 
  ChevronLeft, FileCode2, Files, CheckCircle2,
  TerminalSquare
} from 'lucide-react';

const CopilotGuide = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [completionsCount, setCompletionsCount] = useState(0);
  const [chatQuota, setChatQuota] = useState(300);
  const [isTyping, setIsTyping] = useState(false);

  // Simulate unlimited completions background animation
  useEffect(() => {
    const interval = setInterval(() => {
      setCompletionsCount(prev => (prev >= 9999 ? 0 : prev + 17));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const steps = [
    {
      id: 0,
      title: "1. เข้าใจโควต้า (The Two Core Features)",
      subtitle: "ความแตกต่างระหว่าง Completions และ Premium Requests",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          {/* Unlimited Card */}
          <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 relative overflow-hidden group">
            <div className="absolute top-0 right-0 bg-green-500/20 text-green-400 px-3 py-1 rounded-bl-lg text-xs font-bold flex items-center">
              <Activity className="w-3 h-3 mr-1 animate-pulse" /> UNLIMITED
            </div>
            <div className="flex items-center space-x-4 mb-4">
              <div className="p-3 bg-blue-500/20 rounded-lg text-blue-400">
                <Code2 className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-200">Code Completions</h3>
                <p className="text-sm text-slate-400">Inline Autocomplete (กด Tab)</p>
              </div>
            </div>
            <div className="bg-slate-900 p-4 rounded-lg font-mono text-sm text-slate-300 h-32 relative">
              <span className="text-blue-400">function</span> <span className="text-yellow-300">calculateTotal</span>(items) {'{'}
              <br/>
              <span className="ml-4 text-slate-500 italic relative inline-block group-hover:text-slate-400 transition-colors duration-500">
                return items.reduce((a, b) =&gt; a + b, 0);
                <span className="absolute -right-2 top-0 w-1 h-5 bg-slate-400 animate-ping"></span>
              </span>
              <br/>
              {'}'}
            </div>
            <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
              <span>Usage Count:</span>
              <span className="font-mono text-green-400 flex items-center">
                <Activity className="w-3 h-3 mr-1" /> {completionsCount.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Limited Card */}
          <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 relative">
            <div className="absolute top-0 right-0 bg-red-500/20 text-red-400 px-3 py-1 rounded-bl-lg text-xs font-bold flex items-center">
              <Gauge className="w-3 h-3 mr-1" /> LIMITED (300/mo)
            </div>
            <div className="flex items-center space-x-4 mb-4">
              <div className="p-3 bg-purple-500/20 rounded-lg text-purple-400">
                <MessageSquare className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-200">Premium Requests</h3>
                <p className="text-sm text-slate-400">Chat & Agent Mode (Cmd+I)</p>
              </div>
            </div>
            
            <div className="bg-slate-900 p-4 rounded-lg flex flex-col justify-end h-32 space-y-2">
               <div className="bg-slate-800 p-2 rounded text-xs text-slate-300 self-start max-w-[80%]">
                 Can you refactor this entire service?
               </div>
               <div className="bg-purple-900/50 p-2 rounded text-xs text-slate-200 self-end max-w-[80%]">
                 Thinking... (Consuming 1 Premium Request)
               </div>
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-xs text-slate-400">
                <span>Quota Remaining:</span>
                <span className="text-red-400 font-bold">{chatQuota}</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-red-500 to-purple-500 h-2 transition-all duration-500" 
                  style={{ width: `${(chatQuota/300) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      ),
      tip: "Tech Lead Tip: พึ่งพา Code Completions ให้มากที่สุด เพราะใช้งานได้ไม่จำกัดและเร็วกว่า เก็บ Premium Requests ไว้ใช้กับปัญหาเชิงสถาปัตยกรรม (Architectural Problems) หรือบั๊กที่ซับซ้อน"
    },
    {
      id: 1,
      title: "2. การจัดการ Context (Context Optimization)",
      subtitle: "ลดการส่งข้อมูลที่ไม่จำเป็นให้ AI เพื่อความแม่นยำและประหยัดโควต้า",
      content: (
        <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 mt-4 flex flex-col md:flex-row gap-6 items-center">
          
          {/* Bad Practice */}
          <div className="flex-1 w-full space-y-3">
            <div className="text-red-400 font-bold text-sm flex items-center"><Zap className="w-4 h-4 mr-1"/> Bad Practice (Overload)</div>
            <div className="bg-slate-900 p-3 rounded-lg border border-red-900/50">
              <div className="flex items-center text-xs text-slate-500 mb-2">
                <Files className="w-3 h-3 mr-1"/> 15 Files Open (120k tokens)
              </div>
              <div className="grid grid-cols-4 gap-1 opacity-50">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="h-6 bg-slate-800 rounded animate-pulse" style={{animationDelay: `${i*100}ms`}}></div>
                ))}
              </div>
              <p className="text-[10px] text-red-400 mt-3 text-center">AI สับสน และเสีย Premium Request ฟรีๆ บ่อยครั้ง</p>
            </div>
          </div>

          <div className="hidden md:flex text-slate-500">
            <ChevronRight className="w-8 h-8" />
          </div>

          {/* Good Practice */}
          <div className="flex-1 w-full space-y-3">
            <div className="text-green-400 font-bold text-sm flex items-center"><ShieldCheck className="w-4 h-4 mr-1"/> Good Practice (Focused)</div>
            <div className="bg-slate-900 p-3 rounded-lg border border-green-900/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-green-500/10 blur-xl rounded-full"></div>
              <div className="flex items-center text-xs text-green-400 mb-2">
                <FileCode2 className="w-3 h-3 mr-1"/> 2 Relevant Files Open (5k tokens)
              </div>
              <div className="grid grid-cols-4 gap-2">
                <div className="col-span-2 h-8 bg-blue-900/40 rounded flex items-center justify-center text-[10px] text-blue-300 border border-blue-800/50">auth.service.ts</div>
                <div className="col-span-2 h-8 bg-blue-900/40 rounded flex items-center justify-center text-[10px] text-blue-300 border border-blue-800/50">auth.test.ts</div>
              </div>
              <p className="text-[10px] text-green-400 mt-3 text-center">AI ตอบตรงประเด็น แก้ปัญหาจบใน 1 Request</p>
            </div>
          </div>

        </div>
      ),
      tip: "Tech Lead Tip: ก่อนกดเปิด Copilot Chat ให้ปิด Tab ไฟล์ที่ไม่เกี่ยวข้องให้หมด (Close All Unmodified) การส่ง Context น้อยๆ แต่ตรงจุด ทำให้ AI ฉลาดขึ้นและประหยัดโควต้า"
    },
    {
      id: 2,
      title: "3. การเขียนโค้ดเพื่อ AI (Clean Code & TDD)",
      subtitle: "ใช้โครงสร้างโค้ดที่ดี เพื่อลดภาระการใช้ Chat",
      content: (
        <div className="mt-4 bg-slate-900 rounded-xl overflow-hidden border border-slate-700">
          <div className="flex items-center bg-slate-800 px-4 py-2 border-b border-slate-700">
            <TerminalSquare className="w-4 h-4 text-slate-400 mr-2" />
            <span className="text-xs text-slate-400 font-mono">user_service.test.ts</span>
          </div>
          
          <div className="p-6">
            <div className="space-y-4 font-mono text-sm">
              {/* TDD Step */}
              <div className="bg-slate-800/50 p-3 rounded border-l-4 border-purple-500 relative transition-all">
                <span className="text-slate-500 text-xs absolute right-2 top-2">Step 1: Write Test First</span>
                <div className="text-slate-300">
                  <span className="text-purple-400">test</span>(<span className="text-yellow-300">'should return active users'</span>, () =&gt; {'{'} <br/>
                  &nbsp;&nbsp;const users = [ ... ];<br/>
                  &nbsp;&nbsp;<span className="text-blue-400">expect</span>(filterActive(users)).<span className="text-blue-400">toHaveLength</span>(1);<br/>
                  {'}'});
                </div>
              </div>

              {/* Implementation Step */}
              <div className="bg-slate-800/50 p-3 rounded border-l-4 border-green-500 relative group">
                <span className="text-slate-500 text-xs absolute right-2 top-2 group-hover:opacity-0 transition-opacity">Step 2: Inline Completion kicks in</span>
                <span className="text-green-400 text-xs absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity flex items-center"><CheckCircle2 className="w-3 h-3 mr-1"/> Unlimited Quota Used</span>
                
                <div className="text-slate-300 mt-2">
                  <span className="text-blue-400">function</span> <span className="text-yellow-300">filterActive</span>(users) {'{'} <br/>
                  &nbsp;&nbsp;<span className="text-slate-500 italic group-hover:text-slate-300 transition-colors duration-700">
                    return users.filter(u =&gt; u.status === 'active');
                  </span><br/>
                  {'}'}
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
      tip: "Tech Lead Tip: หากคุณเขียนฟังก์ชันขนาดเล็ก (Small Functions) และใช้ TDD (Test-Driven Development) Copilot Inline จะเดา Logic ได้แม่นยำมากจนคุณแทบไม่ต้องเปิดหน้าต่าง Chat เลย"
    }
  ];

  const handleSimulateChat = () => {
    if (chatQuota > 0) {
      setChatQuota(prev => prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-4 md:p-8 font-sans selection:bg-blue-500/30">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Section */}
        <header className="mb-8 text-center space-y-4">
          <div className="inline-flex items-center justify-center p-3 bg-blue-500/10 rounded-full mb-2 border border-blue-500/20">
            <Zap className="w-6 h-6 text-blue-400" />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400">
            GitHub Copilot $10/Month
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base">
            Technical Lead Guide: วิธีบริหารจัดการโควต้า 300 Premium Requests ให้เพียงพอตลอดทั้งเดือนด้วยแนวทางวิศวกรรมซอฟต์แวร์
          </p>
        </header>

        {/* Main Content Area */}
        <main className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 shadow-2xl">
          
          {/* Navigation Tabs */}
          <div className="flex space-x-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
            {steps.map((step, idx) => (
              <button
                key={step.id}
                onClick={() => setActiveStep(idx)}
                className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeStep === idx 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25' 
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
                }`}
              >
                {step.title.split(' ')[0]} {step.title.split(' ')[1]}
              </button>
            ))}
          </div>

          {/* Active Content */}
          <div className="min-h-[350px]">
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-xl font-bold text-slate-100">{steps[activeStep].title}</h2>
              <p className="text-sm text-slate-400 mb-6">{steps[activeStep].subtitle}</p>
              
              {steps[activeStep].content}
            </div>
          </div>

          {/* Tech Lead Tip Box */}
          <div className="mt-8 bg-blue-950/40 border border-blue-900/50 rounded-xl p-4 flex items-start space-x-4 animate-in fade-in duration-700 delay-200">
            <div className="p-2 bg-blue-900/50 rounded-lg shrink-0">
              <Lightbulb className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-blue-200 leading-relaxed">
                {steps[activeStep].tip}
              </p>
            </div>
          </div>

          {/* Footer Controls */}
          <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between">
            <button 
              onClick={() => setActiveStep(prev => Math.max(0, prev - 1))}
              disabled={activeStep === 0}
              className="flex items-center px-4 py-2 text-sm text-slate-400 disabled:opacity-30 hover:text-slate-200 transition-colors"
            >
              <ChevronLeft className="w-4 h-4 mr-1" /> Back
            </button>
            
            {/* Interactive Button for Step 1 */}
            {activeStep === 0 && (
              <button 
                onClick={handleSimulateChat}
                className="text-xs bg-red-500/10 text-red-400 border border-red-500/30 px-3 py-1.5 rounded hover:bg-red-500/20 transition-colors animate-pulse"
              >
                Simulate Chat (-1 Quota)
              </button>
            )}

            <button 
              onClick={() => setActiveStep(prev => Math.min(steps.length - 1, prev + 1))}
              disabled={activeStep === steps.length - 1}
              className="flex items-center px-4 py-2 text-sm bg-slate-800 rounded-lg hover:bg-slate-700 disabled:opacity-30 transition-colors"
            >
              Next <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>

        </main>
      </div>
    </div>
  );
};

export default CopilotGuide;