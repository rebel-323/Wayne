import React, { useState, useEffect } from 'react';

export type ModalType =
  | 'department'
  | 'curriculum'
  | 'skills'
  | 'labs'
  | 'contact'
  | null;

interface ModalProps {
  type: ModalType;
  onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({ type, onClose }) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    level: 'prospective_student',
    message: '',
  });

  useEffect(() => {
    setFormSubmitted(false);
  }, [type]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (type) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [type, onClose]);

  if (!type) return null;

  const handleCopy = (text: string, key: string) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        setCopiedKey(key);
        setTimeout(() => setCopiedKey(null), 2000);
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-lg animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-2xl bg-[#0d0d0d] border border-white/15 rounded-2xl p-6 sm:p-8 text-white shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 text-white/60 hover:text-white transition-colors cursor-pointer w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10"
          aria-label="Close modal"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* 1. DEPARTMENT OVERVIEW */}
        {type === 'department' && (
          <div>
            <div className="flex items-center gap-2 mb-2 text-white/50 text-xs tracking-widest uppercase">
              <span>SUMAS Academic Portal</span>
              <span>·</span>
              <span>Faculty of Engineering</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-medium tracking-tight mb-3">
              Department of Electrical &amp; Electronic Engineering
            </h2>
            <p className="text-white/70 text-sm sm:text-base mb-6 leading-relaxed">
              At the <strong>State University of Medical and Applied Sciences (SUMAS)</strong>, our Department of Electrical and Electronic Engineering is dedicated to pioneering innovation at the nexus of electric energy, high-frequency telecommunications, microelectronics, and intelligent automated systems.
            </p>

            <div className="space-y-4 mb-6">
              <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                <span className="text-xs uppercase tracking-wider text-white/50">Degree Awarded</span>
                <p className="text-base font-medium mt-1 text-white">Bachelor of Engineering (B.Eng.) in Electrical &amp; Electronic Engineering</p>
                <p className="text-xs text-white/50 mt-1">Accredited curriculum with hands-on industrial immersion (SIWES).</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                  <span className="text-xs uppercase tracking-wider text-white/50">Program Duration</span>
                  <p className="text-lg font-semibold text-white mt-1">5 Academic Years</p>
                  <p className="text-xs text-white/50 mt-0.5">10 semesters of foundational theory and workshop practice.</p>
                </div>
                <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                  <span className="text-xs uppercase tracking-wider text-white/50">Institutional Mission</span>
                  <p className="text-lg font-semibold text-white mt-1">Applied Innovation</p>
                  <p className="text-xs text-white/50 mt-0.5">Solving power grid stability, biomedical electronics, and telecommunications challenges.</p>
                </div>
              </div>

              <div className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-2">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-white/80">Department Specialization Streams</h3>
                <ul className="text-xs sm:text-sm text-white/70 space-y-1.5 list-disc list-inside">
                  <li><strong>Power Systems &amp; Renewable Energy:</strong> High-voltage generation, transmission grids, and smart microgrids.</li>
                  <li><strong>Electronic &amp; Embedded Systems:</strong> Microprocessor design, PCB fabrication, and IoT device architecture.</li>
                  <li><strong>Telecommunications &amp; Signal Processing:</strong> RF systems, fiber optics, wireless networks, and DSP algorithms.</li>
                  <li><strong>Control &amp; Automation:</strong> Industrial robotics, SCADA, PLC programming, and adaptive control loops.</li>
                </ul>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-white/10 text-xs text-white/60">
              <span>Department Enquiries: michelleburston19@gmail.com</span>
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2 bg-white text-black font-medium text-xs sm:text-sm rounded-full hover:bg-black hover:text-white border border-white transition-all duration-200 cursor-pointer"
              >
                Close Overview
              </button>
            </div>
          </div>
        )}

        {/* 2. 5-YEAR CURRICULUM PATH */}
        {type === 'curriculum' && (
          <div>
            <div className="flex items-center gap-2 mb-2 text-white/50 text-xs tracking-widest uppercase">
              <span>Academic Progression</span>
              <span>·</span>
              <span>5-Year Degree Roadmap</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-medium tracking-tight mb-3">5-Year Study Structure</h2>
            <p className="text-white/70 text-sm sm:text-base mb-6 leading-relaxed">
              The 5-year B.Eng curriculum at SUMAS systematically transitions students from fundamental engineering sciences to advanced system design, hardware synthesis, and an extensive capstone project.
            </p>

            <div className="space-y-3.5 mb-6">
              {[
                {
                  year: 'Year 1 (100 Level)',
                  title: 'Engineering Foundations & Physical Sciences',
                  desc: 'General Mathematics, Classical Mechanics, Electromagnetism, Engineering Chemistry, Technical Drawing, Basic Workshop Practice, and Computing.',
                },
                {
                  year: 'Year 2 (200 Level)',
                  title: 'Core Circuit Analysis & Materials',
                  desc: 'Electric Circuit Theory I & II, Engineering Materials, Applied Mathematics, Introduction to Electronics, C/C++ Programming, and Fluid Mechanics.',
                },
                {
                  year: 'Year 3 (300 Level)',
                  title: 'Intermediate Electronics & Electromagnetic Fields',
                  desc: 'Analog & Digital Electronics, Electromagnetic Field Theory, Electric Machines I, Signals & Systems, Numerical Methods, and Microprocessor Systems.',
                },
                {
                  year: 'Year 4 (400 Level)',
                  title: 'Advanced Systems & Industrial Internship (SIWES)',
                  desc: 'Control Engineering, Power Systems Engineering, Telecommunication Principles, Digital Signal Processing, plus a 6-Month Intensive Industrial Work Experience Scheme (SIWES).',
                },
                {
                  year: 'Year 5 (500 Level)',
                  title: 'Specialization, Capstone Design & Thesis',
                  desc: 'Power System Protection, VLSI Design, Advanced Control Systems, High Voltage Engineering, Renewable Energy Systems, and an independent B.Eng research thesis and prototype.',
                },
              ].map((lvl) => (
                <div key={lvl.year} className="p-4 bg-white/5 border border-white/10 rounded-xl hover:border-white/25 transition-colors">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-mono text-emerald-400">{lvl.year}</span>
                    <span className="text-[11px] text-white/40 uppercase tracking-widest">SUMAS B.Eng</span>
                  </div>
                  <h3 className="text-sm sm:text-base font-medium text-white">{lvl.title}</h3>
                  <p className="text-xs text-white/60 mt-1.5 leading-relaxed">{lvl.desc}</p>
                </div>
              ))}
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2 bg-white text-black font-medium text-sm rounded-full hover:bg-black hover:text-white border border-white transition-all duration-200 cursor-pointer"
              >
                Close Curriculum
              </button>
            </div>
          </div>
        )}

        {/* 3. REQUIRED SKILLS ACQUIRED */}
        {type === 'skills' && (
          <div>
            <div className="flex items-center gap-2 mb-2 text-white/50 text-xs tracking-widest uppercase">
              <span>Competency Matrix</span>
              <span>·</span>
              <span>Expected Graduate Competencies</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-medium tracking-tight mb-3">Skills Acquired in the Department</h2>
            <p className="text-white/70 text-sm sm:text-base mb-6 leading-relaxed">
              Throughout their 5 years in the SUMAS Electrical/Electronic Engineering department, students cultivate rigorous technical proficiencies, analytical precision, and physical fabrication abilities:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {[
                {
                  category: 'Circuit Analysis & Simulation',
                  skills: 'SPICE, Multisim, Proteus, circuit topology analysis, frequency domain filtering, transient state analysis.',
                },
                {
                  category: 'Embedded Systems & Hardware',
                  skills: 'Microcontroller programming (ARM Cortex, AVR, ESP32), FPGA synthesis (Verilog/VHDL), sensor integration, firmware development.',
                },
                {
                  category: 'Power Systems & High Voltage',
                  skills: 'Power flow studies, fault analysis, grid synchronization, transformer diagnostics, inverter & converter topologies, renewable microgrids.',
                },
                {
                  category: 'PCB Design & Prototyping',
                  skills: 'Altium Designer, KiCAD, schematic capture, multi-layer routing, surface-mount soldering, EMC/EMI shielding standards.',
                },
                {
                  category: 'Telecommunications & RF',
                  skills: 'Antenna design, modulation schemes (QAM, OFDM), spectral analysis, optical fiber transmission, wireless communication protocols.',
                },
                {
                  category: 'Control & Industrial Automation',
                  skills: 'PLC ladder logic, SCADA systems, PID tuning, feedback loop stability, industrial motor drives, robotic actuators.',
                },
                {
                  category: 'Computational Engineering',
                  skills: 'MATLAB / Simulink, Python for data acquisition, LabVIEW virtual instrumentation, numerical computing.',
                },
                {
                  category: 'Professional Ethics & Safety',
                  skills: 'IEEE/COREN safety standards, industrial electrical codes, project cost estimation, technical report documentation.',
                },
              ].map((item) => (
                <div key={item.category} className="p-4 bg-white/5 border border-white/10 rounded-xl">
                  <h3 className="text-sm font-medium text-white flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                    {item.category}
                  </h3>
                  <p className="text-xs text-white/60 mt-1.5 leading-relaxed">{item.skills}</p>
                </div>
              ))}
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2 bg-white text-black font-medium text-sm rounded-full hover:bg-black hover:text-white border border-white transition-all duration-200 cursor-pointer"
              >
                Close Skills
              </button>
            </div>
          </div>
        )}

        {/* 4. LABORATORIES & WORKSHOPS */}
        {type === 'labs' && (
          <div>
            <div className="flex items-center gap-2 mb-2 text-white/50 text-xs tracking-widest uppercase">
              <span>Facility Infrastructure</span>
              <span>·</span>
              <span>SUMAS Research Labs</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-medium tracking-tight mb-3">Laboratories &amp; Workshops</h2>
            <p className="text-white/70 text-sm sm:text-base mb-6 leading-relaxed">
              Hands-on lab sessions complement every semester of coursework. Students gain practical experience in our purpose-built specialized facilities:
            </p>

            <div className="space-y-3 mb-6">
              {[
                {
                  name: 'Electric Machines & Power Systems Lab',
                  desc: 'Equipped with DC/AC motor-generator test benches, synchronous machines, transformer testing bays, and grid simulation modules.',
                },
                {
                  name: 'Electronics & Microprocessor Design Lab',
                  desc: 'Oscilloscopes, digital multimeters, signal generators, logic analyzers, and development kits for embedded systems research.',
                },
                {
                  name: 'Telecommunications & High-Frequency Lab',
                  desc: 'Spectrum analyzers, RF transmission lines, microwave test benches, antenna radiation measuring rigs, and optical fiber trainers.',
                },
                {
                  name: 'Control Systems & Robotics Workshop',
                  desc: 'PLC test stands, robotic manipulators, pneumatic and hydraulic control rigs, and digital feedback workstations.',
                },
              ].map((lab) => (
                <div key={lab.name} className="p-4 bg-white/5 border border-white/10 rounded-xl">
                  <h3 className="font-medium text-white text-sm sm:text-base">{lab.name}</h3>
                  <p className="text-xs text-white/60 mt-1">{lab.desc}</p>
                </div>
              ))}
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2 bg-white text-black font-medium text-sm rounded-full hover:bg-black hover:text-white border border-white transition-all duration-200 cursor-pointer"
              >
                Close Facilities
              </button>
            </div>
          </div>
        )}

        {/* 5. CONTACT & ADMISSIONS */}
        {type === 'contact' && (
          <div>
            <div className="flex items-center gap-2 mb-2 text-white/50 text-xs tracking-widest uppercase">
              <span>Direct Channel</span>
              <span>·</span>
              <span>Department Enquiries</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-medium tracking-tight mb-3">Contact SUMAS Electrical/Electronic Engineering</h2>
            <p className="text-white/70 text-sm sm:text-base mb-6 leading-relaxed">
              For admissions information, academic syllabus questions, research partnerships, or faculty inquiries, reach out through the official contact channels below:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-white/5 border border-white/10 rounded-xl flex flex-col justify-between">
                <div>
                  <span className="text-xs uppercase tracking-wider text-white/50">Official Email</span>
                  <p className="text-base font-mono text-white mt-1 break-all select-all">
                    michelleburston19@gmail.com
                  </p>
                </div>
                <div className="mt-3 flex gap-2">
                  <a
                    href="mailto:michelleburston19@gmail.com"
                    className="px-3 py-1 bg-white text-black text-xs font-medium rounded-full hover:bg-white/80 transition-colors"
                  >
                    Open Mail
                  </a>
                  <button
                    type="button"
                    onClick={() => handleCopy('michelleburston19@gmail.com', 'email')}
                    className="px-3 py-1 border border-white/30 text-white text-xs rounded-full hover:bg-white/10 transition-colors"
                  >
                    {copiedKey === 'email' ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>

              <div className="p-4 bg-white/5 border border-white/10 rounded-xl flex flex-col justify-between">
                <div>
                  <span className="text-xs uppercase tracking-wider text-white/50">Direct Mobile</span>
                  <p className="text-base font-mono text-white mt-1 select-all">
                    +234-9073588658
                  </p>
                </div>
                <div className="mt-3 flex gap-2">
                  <a
                    href="tel:+2349073588658"
                    className="px-3 py-1 bg-white text-black text-xs font-medium rounded-full hover:bg-white/80 transition-colors"
                  >
                    Call Now
                  </a>
                  <button
                    type="button"
                    onClick={() => handleCopy('+234-9073588658', 'phone')}
                    className="px-3 py-1 border border-white/30 text-white text-xs rounded-full hover:bg-white/10 transition-colors"
                  >
                    {copiedKey === 'phone' ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>
            </div>

            {formSubmitted ? (
              <div className="p-6 bg-white/5 border border-white/10 rounded-xl text-center space-y-2">
                <p className="text-lg font-medium text-white">Inquiry Received</p>
                <p className="text-sm text-white/60">
                  Your message has been dispatched to the SUMAS Electrical &amp; Electronic Engineering admissions and academic desk at <strong>michelleburston19@gmail.com</strong>.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-4 px-5 py-2 bg-white text-black text-sm rounded-full hover:bg-white/90 transition-colors"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-xs uppercase tracking-wider text-white/60">Send Direct Message to the Department</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-white/60 mb-1">Your Full Name</label>
                    <input
                      required
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Chinedu Okafor"
                      className="w-full bg-white/5 border border-white/15 rounded-lg px-3.5 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-white/60 mb-1">Your Email</label>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="chinedu@example.com"
                      className="w-full bg-white/5 border border-white/15 rounded-lg px-3.5 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/50 transition-colors"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-white/60 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+234..."
                      className="w-full bg-white/5 border border-white/15 rounded-lg px-3.5 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-white/60 mb-1">Inquiry Purpose</label>
                    <select
                      value={formData.level}
                      onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                      className="w-full bg-[#181818] border border-white/15 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-white/50 transition-colors"
                    >
                      <option value="prospective_student">Prospective Student (5-Year B.Eng)</option>
                      <option value="current_student">Current Department Student</option>
                      <option value="transfer">Direct Entry / Transfer</option>
                      <option value="industry_partner">Industry &amp; SIWES Partnership</option>
                      <option value="general">General Academic Enquiry</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-white/60 mb-1">Message</label>
                  <textarea
                    required
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Enter your questions about admission criteria, course modules, or facilities..."
                    className="w-full bg-white/5 border border-white/15 rounded-lg px-3.5 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/50 transition-colors resize-none"
                  />
                </div>
                <div className="pt-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-sm text-white/60 hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-white text-black font-medium text-sm rounded-full hover:bg-black hover:text-white hover:border-white border border-transparent transition-all duration-200 cursor-pointer"
                  >
                    Submit Inquiry
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
