(() => {
  const pages = ['start','instructions','ask','check','provided','rewrite','review'];
  let current = 'start';
  let scenario = null;
  let previousScenarioId = null;
  let usedProvided = false;
  const defaultRewrite = 'Write a complete revised prompt. Add any relevant facts from the provided check card that the first answer missed. Tell the tool to say when information is missing and to avoid inventing details. Run the revised prompt in the same approved AI tool and capture the second answer.';
  const providedRewrite = 'Write a complete revised prompt based on the faults you found in the provided AI output. Add any relevant facts from the check card that the provided answer missed. Tell the tool to say when information is missing and to avoid inventing details. Run the revised prompt in the same approved AI tool and capture the second answer.';
  const scenarios = [
    {
        "id": "case-1",
        "prompt": "A household wiring workshop is being conducted. Give me a detailed list of the items required for the workshop.",
        "check": "Workshop materials and equipment:\nSafety glasses; rubber-soled footwear; insulated screwdriver set, 1000 volt rated; needle nose pliers; measuring tape; spirit level; non-contact voltage tester; digital multimeter.\nSingle pole and two-way switches; dimmers; LED bulbs; practice wiring boards; wire strippers for 1 to 4 square mm wire.\nPVC insulated copper wire, FR or FRLS; ISI marked wire: 1.5 sq mm (lighting) and 2.5 sq mm (sockets); red, black and green for phase, neutral and earth; connector strips; PVC or polycline; lugs and ferrules with a crimping tool.\nPVC conduit with saddles, bends and junction boxes, or casing capping with screws and rawl plugs for brick walls.\nIndian modular sockets, 6 ampere 5 pin and 16 ampere 3 pin; RCCB 30 milliampere on the distribution board; MCBs 6 ampere, 10 ampere, 16 ampere B and C curve in an SPN distribution board.\nNeon tester screwdriver; drill machine; hacksaw for cutting conduit; bending spring for PVC conduit; earth tester; ceiling roses; pendant holders; fan regulator and ceiling rose for a fan point; batten holders.",
        "checkGroups": [
          {"title":"Safety","icon":"safety","items":["Safety glasses","Rubber-soled footwear"]},
          {"title":"Tools","icon":"tools","items":["Insulated screwdriver set (1000 V rated)","Needle nose pliers","Measuring tape","Spirit level","Wire strippers for 1–4 sq mm wire","Neon tester screwdriver","Drill machine","Hacksaw for cutting conduit","Bending spring for PVC conduit","Crimping tool"]},
          {"title":"Testing","icon":"testing","items":["Non-contact voltage tester","Digital multimeter","Earth tester"]},
          {"title":"Wiring & Installation","icon":"wiring","items":["Single-pole and two-way switches","Dimmers","LED bulbs","Practice wiring boards","PVC-insulated copper wire, FR or FRLS","ISI-marked wire: 1.5 sq mm (lighting) and 2.5 sq mm (sockets)","Red, black, and green wire for phase, neutral, and earth","Connector strips","PVC or polycline","Lugs and ferrules","PVC conduit with saddles, bends, and junction boxes, or casing capping with screws and rawl plugs for brick walls","Ceiling roses","Pendant holders","Fan regulator and ceiling rose for a fan point","Batten holders"]},
          {"title":"Sockets & Protection","icon":"protection","items":["Indian modular sockets: 6 ampere, 5 pin and 16 ampere, 3 pin","RCCB 30 milliampere on the distribution board","MCBs: 6 ampere, 10 ampere, and 16 ampere, B and C curve, in an SPN distribution board"]}
        ],
        "providedOutput": `Master Inventory List for a Household Wiring Workshop

1. Personal Protective Equipment (PPE) & Safety Gear

- Safety Glasses / Goggles: Protects eyes from flying copper clippings and insulation debris during wire cutting and stripping.
- Insulated Work Gloves: Provides grip and protects hands against sharp wire ends and sheet metal box edges.
- Non-Conductive Footwear: Rubber-soled shoes for instructors and participants to minimize grounding risks.

2. Essential Hand Tools (Per Workstation)

- Wire Strippers / Cutters: Form-matched strippers rated for 10–14 AWG solid and stranded copper wire.
- Linesman Pliers & Needle-Nose Pliers: For twisting copper conductors together cleanly and bending loop terminals around screw posts.
- Insulated Screwdriver Set: Flathead and Phillips (#2) screwdrivers with 1,000V rated insulation handles.
- Utility Knife / Cable Ripper: Used to score and strip the outer non-metallic (NM-B / Romex) cable sheath without nicking internal insulation.
- Measuring Tape & Level: For precise box mounting height and wire length measurements.

3. Testing & Measurement Equipment

- Non-Contact Voltage Tester (Voltage Pen): Essential safety device to verify circuits are de-energized before touching wires.
- Digital Multimeter (DMM): Used to test continuity, measure AC voltage, and check for short circuits across connections.
- Receptacle / Outlet Tester: Plugs directly into installed 3-prong outlets to quickly identify wiring errors (e.g., reversed hot/neutral, open ground).

4. Wiring Consumables & Fasteners

- Building Wire / Romex Cable:
  - 14/2 NM-B Cable: Rated for 15A lighting and standard outlet circuits (White jacket).
  - 12/2 NM-B Cable: Rated for 20A small appliance and heavy receptacle circuits (Yellow jacket).
- Wire Nuts / Twist-on Connectors: Standard orange, yellow, and red insulated twist connectors.
- Push-In Connectors (Wago Connectors): Modern lever/push connectors for quick, safe spliced connections.
- Electrical Tape: Flame-retardant PVC electrical tape (UL listed) for insulating connections.
- Cable Staples & Conduit Straps: For securing cable runs to wooden studs or conduit boards within 12 inches of boxes.

5. Fixtures, Boxes & Hardware

- Electrical Boxes: Single-gang and double-gang plastic ("old work" or "new work") and metal junction boxes.
- Switches: Single-pole switches, 3-way switches (for multi-location lighting), and dimmer switches.
- Receptacles / Outlets: Standard duplex outlets (15A/20A) and GFCI (Ground Fault Circuit Interrupter) outlets.
- Lighting Fixtures & Holders: Keyless lamp holders / ceiling roses and LED bulbs to demonstrate functional lighting circuits.
- Circuit Breakers & Mini Distribution Board: Single-pole 15A and 20A Miniature Circuit Breakers (MCBs) mounted on a mock board to demonstrate panel wiring.

6. Demonstration Workstations (Training Boards)

- Practice Wiring Boards: Plywood/framing boards mounted vertically with pre-installed junction boxes, light sockets, and breaker panels to simulate room walls safely without live mains voltage during setup.`
    },
    {
        "id": "case-2",
        "prompt": "Write a notice for a workshop being conducted by the Mechanical Engineering Department during the second half of the upcoming weekend.",
        "check": "Workshop: Role of mechanical engineering in driving sustainability.\nDate and time: Sunday 11 October, 3 pm.\nVenue: Online mode.\nEligibility: Open to all.",
        "providedOutput": `[Name of Institution / College]

NOTICE

Date: September 24, 2026

Ref No: ME/WS/2026/09-02

SUBJECT: HANDS-ON WORKSHOP ON ADVANCED MANUFACTURING TECHNIQUES

All students and faculty members are hereby informed that the Department of Mechanical Engineering is organizing a practical hands-on workshop this coming weekend.

The session aims to provide practical exposure and live demonstrations on modern machining, fabrication tools, and CAD/CAM integration.

Workshop Schedule & Details

- Topic: Advanced Fabrication & Hands-on Machining Workshop
- Date: Saturday, September 26, 2026
- Time: 02:00 PM to 05:00 PM (Second Half)
- Venue: Central Mechanical Workshop / Seminar Hall B
- Target Audience: Open to all Mechanical Engineering students (Priority for 2nd & 3rd-year students)

Key Highlights

1. Live demonstrations of CNC machining and precision fitting tools.
2. Safety protocols and hands-on operational practice.
3. Interactive Q&A and skill certification for registered participants.

Important Instructions

- Attendance will be marked at the beginning of the second-half session (02:00 PM sharp).
- All participants must strictly adhere to workshop safety rules (wear lab coats and closed-toe shoes).
- Interested students must register via the department portal by Friday, September 25, 2026, before 05:00 PM.

For any queries or registration assistance, contact student coordinators [Student Name / Mobile No.] or the undersigned.

(Signature)

[Name of Head of Department]

Head of Department, Mechanical Engineering

[College / Institute Name]`
    },
    {
        "id": "case-3",
        "prompt": "Write a report for the placement drive conducted recently on campus.",
        "check": "Annual Campus Placement Drive — Check Card\n\nSubmitted to: Placement Coordinator, JKS College.\nPlacement Drive Period: 1 September to 10 September 2026.\n\nParticipation and Placement Results:\nMore than 18 companies participated.\nParticipating companies represented the IT, consulting, finance, education/EdTech, and core engineering sectors.\nRegistered candidates: 520.\nStudents who secured offers: 400.\nOverall placement rate: 76.9%.\nTotal offers issued: 425.\n\nSalary Package:\nHighest package: ₹18 LPA.\nAverage package: ₹7 LPA.\nLowest package: ₹4 LPA.\n\nSector-wise Recruitment Breakdown:\nIT firms: 40%.\nConsulting firms: 25%.\nEdTech firms: 10%.\nCore engineering firms: 25%.",
        "providedOutput": `REPORT ON ANNUAL CAMPUS PLACEMENT DRIVE 2026
Submitted To: Office of the Dean / Head of Department
Submitted By: Training and Placement Cell (TPC)
Date of Submission: September 24, 2026

1. Executive Summary

The Training and Placement Cell organized the annual Campus Placement Drive for the graduating batch of 2026 from September 15 to September 22, 2026. Over 25 leading companies across core engineering, IT, consulting, and finance sectors participated. Out of 450 eligible candidates registered for the drive, 380 students secured job offers, achieving an overall placement rate of 84.4%.

2. Objectives

- Provide career opportunities to final-year students in diverse industry sectors.
- Bridge the gap between academic training and industry expectations.
- Evaluate student performance across technical and soft-skill domain areas.

3. Key Highlights & Performance Indicators

Total Registered Candidates: 450
Total Companies Participated: 28
Total Offers Issued: 412 (Including multiple offers)
Students Placed: 380
Highest Package Offered: ₹24.0 LPA (Software Engineering)
Average Package Offered: ₹7.2 LPA
Lowest Package Offered: ₹4.5 LPA

4. Sector-Wise Recruitment Breakdown

- Information Technology & Software (42%): Companies like TCS, Infosys, and Tech Mahindra recruited heavily for roles in software development, data analytics, and cloud engineering.
- Core Engineering (Mechanical, Civil, Electrical) (30%): Major recruiters included Tata Motors, L&T, Siemens, and Ashok Leyland, offering roles in design, production, and quality control.
- Consulting & Finance (18%): Firms offered positions in business analysis, operations, and technical consulting.
- Startups & Emerging Sectors (10%): Niche roles in AI/ML solutions and automation design.

5. Drive Execution Procedure

The drive followed a standardized multi-stage selection process:
1. Pre-Placement Talks (PPT): Companies presented their work culture, job roles, and growth prospects.
2. Online Aptitude & Technical Assessment: Screened candidates on quantitative, logical reasoning, and domain knowledge.
3. Technical Interviews: Assessed core subject knowledge, problem-solving skills, and project experience.
4. HR Interviews: Evaluated communication skills, cultural fit, and willingness to relocate.

6. Student & Recruiter Feedback

- Recruiter Feedback: Representatives commended the technical foundation, practical exposure, and professionalism of the students. They highlighted a need for further strengthening hands-on experience with modern software tools (e.g., Python, CAD/CAM integration).
- Student Feedback: Candidates expressed high satisfaction with the organization and diversity of companies, but requested longer preparation windows for pre-placement assessments.

7. Recommendations for Next Drive

- Aptitude Bootcamps: Conduct mandatory 2-week aptitude and coding bootcamps prior to the onset of the drive.
- Mock Interviews: Expand alumni-led mock interview sessions to boost student confidence during HR rounds.
- Core Industry Ties: Increase outreach to mid-tier core manufacturing firms to ensure equal distribution across all engineering branches.

Report Prepared By:
(Signature)
Student Student Coordinator
Training & Placement Cell`
    },
    {
        "id": "case-4",
        "prompt": "The lab project must be submitted by Friday, 16 October 2026, the third Friday of the month. The presentation will be on Monday, 19 October 2026. Everyone is requested to bring their project report and other necessary items. Prepare a notice stating the submission deadline, presentation time and place, eligible candidates, and what they should bring.",
        "check": "Project submission: Friday, 16 October 2026 (the third Friday of the month). Presentation: Monday, 19 October 2026. Everyone must bring their projects and prepare their presentations.",
        "providedOutput": `NOTICE
Date: September 24, 2026
To: All Eligible Students / Course Participants
Subject: Lab Project Submission and Presentation Guidelines

This is to notify all eligible students regarding the final submission and presentation schedule for the Laboratory Project.

1. Eligibility

- Eligible Candidates: All students currently enrolled in the course who have completed the required lab sessions and continuous assessment submissions.

2. Lab Project Submission Deadline

- Date: Friday, September 25, 2026
- Time: By 5:00 PM (or end of class hours)
- Details: Final project deliverables and initial draft copies must be ready and submitted by this date.

3. Presentation Details

- Date: Friday, October 2, 2026
- Time: Immediately following the regular class session
- Venue / Place: Main Project Laboratory (Lab 302) / Designated Seminar Room

4. Required Items to Bring

All eligible candidates must come fully prepared and bring the following:
- Lab Project Model / Code Base: Working hardware model, simulation files, or software repository executable.
- Project Report: Printed and bound lab report formatted as per the guidelines.
- Presentation Media: Presentation slides (on a USB drive or cloud backup).
- Supporting Requirements: Lab record books, log sheets, and any supplementary testing tools/accessories required for the live demonstration.

Note: Strict adherence to the deadlines is mandatory. Late submissions or failure to present without prior written permission will impact final evaluation scores.

Issued By:
[Your Name / Designation]
[Department Name / Institution]`
    }
];
  const byId = id => document.getElementById(id);
  const checkIcons = {
    safety:'<path d="M3 10h18l-1.3 6H15l-1.5-2h-3L9 16H4.3L3 10Zm4 0V8h10v2"/>',
    tools:'<path d="M4 20 20 4M6 4l4 4M4 6l4 4m7 5 5 5m-3-6 3 3M13 7l4 4"/>',
    testing:'<rect x="6" y="3" width="12" height="18" rx="2"/><path d="M9 7h6m-6 9h6m-3 2v1"/>',
    wiring:'<path d="M9 18h6m-5 3h4m-6-7a7 7 0 1 1 8 0c-1 1-1 2-1 3H9c0-1 0-2-1-3Z"/>',
    protection:'<path d="m12 2 8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4Zm0 5v9"/>'
  };
  function renderCheckCard(target, item) {
    target.replaceChildren();
    target.closest('.check-card').classList.toggle('grouped', Boolean(item.checkGroups));
    if (!item.checkGroups) {
      const paragraph = document.createElement('p');
      paragraph.textContent = item.check;
      target.append(paragraph);
      return;
    }
    const heading = document.createElement('h3');
    heading.className = 'check-title';
    heading.textContent = 'Workshop materials & equipment';
    const groups = document.createElement('div');
    groups.className = 'check-groups';
    item.checkGroups.forEach((group, index) => {
      const details = document.createElement('details');
      details.className = 'check-group';
      details.open = index < 2;
      const summary = document.createElement('summary');
      const icon = document.createElement('span');
      icon.className = 'group-icon ' + group.icon;
      icon.setAttribute('aria-hidden', 'true');
      icon.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true">' + checkIcons[group.icon] + '</svg>';
      const label = document.createElement('span');
      label.className = 'group-label';
      label.textContent = (index + 1) + '. ' + group.title;
      const chevron = document.createElement('span');
      chevron.className = 'group-chevron';
      chevron.setAttribute('aria-hidden', 'true');
      chevron.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 9 7 7 7-7"/></svg>';
      summary.append(icon, label, chevron);
      const list = document.createElement('ul');
      group.items.forEach(value => { const entry = document.createElement('li'); entry.textContent = value; list.append(entry); });
      details.append(summary, list);
      groups.append(details);
    });
    target.append(heading, groups);
  }
  const app = document.querySelector('.app');
  const cover = document.querySelector('.cover');
  const backBtn = byId('nav-back');
  const nextBtn = byId('nav-next');
  const steps = {instructions:1, ask:2, check:3, provided:3, rewrite:4, review:5};
  const totalSteps = 5;
  const activePage = () => document.querySelector('.page[data-page="' + current + '"]');
  const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function openCover() {
    cover.hidden = false;
    cover.classList.remove('is-leaving');
    cover.classList.add('is-entering');
    app.inert = true;
    byId('start-heading').focus({preventScroll:true});
  }
  function closeCover() {
    cover.classList.remove('is-entering');
    cover.classList.add('is-leaving');
    app.inert = false;
    setTimeout(() => { if (current !== 'start') cover.hidden = true; cover.classList.remove('is-leaving'); }, reducedMotion() ? 0 : 500);
  }
  const show = name => {
    if (!pages.includes(name)) return;
    const previous = current;
    current = name;
    clearNudges();
    if (name === 'start') { openCover(); return; }
    if (previous === 'start') closeCover();
    document.querySelectorAll('.page[data-page]').forEach(page => { page.hidden = page.dataset.page !== name; });
    const page = activePage();
    document.querySelector('.slides').scrollTop = 0;
    page.querySelectorAll('.lead, .work, .scroll, .check-layout > *, .provided-layout > *').forEach(area => { area.scrollTop = 0; });
    const step = steps[name];
    byId('prog-fill').style.width = (step / totalSteps * 100) + '%';
    byId('prog-n').textContent = step + ' / ' + totalSteps;
    nextBtn.hidden = name === 'review';
    updateLock();
    fit();
    const heading = page.querySelector('h2');
    if (heading) heading.focus({preventScroll:true});
    resetIdle();
  };
  const assignScenario = () => {
    const assignedId = new URLSearchParams(window.location.search).get('scenario');
    const available = scenarios.filter(item => item.id !== previousScenarioId);
    scenario = scenarios.find(item => item.id === assignedId) || available[Math.floor(Math.random() * available.length)];
    byId('scenario-id').textContent = scenario.id.toUpperCase();
    byId('check-scenario-id').textContent = scenario.id.toUpperCase();
    byId('scenario-prompt').textContent = scenario.prompt;
    renderCheckCard(byId('scenario-check'), scenario);
    byId('scenario-safety').hidden = scenario.id !== 'case-1';
    byId('provided-scenario-id').textContent = scenario.id.toUpperCase();
    renderCheckCard(byId('provided-check'), scenario);
    byId('provided-output').textContent = scenario.providedOutput || 'The facilitator-provided AI output for this prompt has not been added yet.';
    byId('provided-entry-wrap').hidden = Boolean(scenario.providedOutput);
    usedProvided = false;
    updateBranchUI();
  };
  const looksLikeNoClaim = answer => {
    const words = answer.toLowerCase().replace(/[’']/g,'').replace(/\s+/g,' ').trim();
    if (/\b(not|never)\s+(correct|accurate|supported)\b/.test(words)) return false;
    if (/\b(but|however|except|although)\b.{0,70}\b(unsupported|wrong|incorrect|invent\w*|hallucinat\w*|made up|false)\b/.test(words)) return false;
    return [
      /\b(no|none|nothing|without)\b.{0,45}\b(unsupported|wrong|incorrect|hallucinat|invented|made up|error|issue|problem)/,
      /\b(didnt|did not|hasnt|has not)\b.{0,45}\b(unsupported|wrong|incorrect|error|claim)/,
      /\b(didnt|did not|hasnt|has not|wasnt|was not)\b.{0,45}\b(invent|hallucinat|make up|add|fill|guess)/,
      /\b(everything|all|whole|entire)\b.{0,45}\b(correct|accurate|right|supported)/,
      /\b(asked|told|left|gave)\b.{0,55}\b(insert|fill|placeholder|blank)/,
      /\b(insert|fill in|placeholder|blank)\b.{0,55}\b(myself|ourselves|by us|later|missing)/,
      /\b(ai|answer|output|response)\b.{0,35}\b(was|is|seems|looks)\s+(?:fully\s+|completely\s+|quite\s+)?\b(clean|correct|accurate|right|valid|proper)\b/,
      /\b(clean|correct|accurate|right|valid|proper|error free)\s+(response|answer|output)\b/,
      /\b(everything|all|details|information)\b.{0,45}\b(rightly|correctly|properly)\s+(mentioned|stated|given|included)\b/,
      /\b(no|none|nothing)\b.{0,45}\b(missing|false|unverified)\b/
    ].some(pattern => pattern.test(words));
  };
  function updateBranchUI() {
    byId('rewrite-intro').textContent = usedProvided ? providedRewrite : defaultRewrite;
    byId('c6-row').hidden = !usedProvided;
    if (!usedProvided) byId('c6').checked = false;
  }
  function updateNoClaimOption() {
    const relevant = looksLikeNoClaim(byId('unsupported').value);
    byId('no-claim-row').hidden = !relevant;
    if (!relevant) byId('no-claim').checked = false;
  }
  byId('unsupported').addEventListener('input', updateNoClaimOption);
  /* ---------- sound (Web Audio, no files) ---------- */
  const sound = (() => {
    let ctx = null, on = true, lastTap = 0, lastCue = 0;
    try { on = localStorage.getItem('wigw-sound') !== 'off'; } catch (error) {}
    const audio = () => {
      if (!ctx) { const Ctx = window.AudioContext || window.webkitAudioContext; if (!Ctx) return null; ctx = new Ctx(); }
      if (ctx.state === 'suspended') ctx.resume();
      return ctx;
    };
    const tone = (freq, start, length, gain, type, endFreq, filter) => {
      const c = audio(); if (!c) return;
      const t = c.currentTime + start;
      const osc = c.createOscillator(), amp = c.createGain();
      osc.type = type; osc.frequency.setValueAtTime(freq, t);
      if (endFreq) osc.frequency.exponentialRampToValueAtTime(endFreq, t + length * .75);
      amp.gain.setValueAtTime(0.0001, t);
      amp.gain.exponentialRampToValueAtTime(gain, t + 0.008);
      amp.gain.exponentialRampToValueAtTime(0.0001, t + length);
      let node = osc;
      if (filter) { const lp = c.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = filter; osc.connect(lp); node = lp; }
      node.connect(amp); amp.connect(c.destination);
      osc.start(t); osc.stop(t + length + 0.02);
    };
    const cueAllowed = () => { const now = performance.now(); if (!on || now - lastTap > 1500 || now - lastCue < 350) return false; lastCue = now; return true; };
    return {
      get on() { return on; },
      set on(value) { on = value; try { localStorage.setItem('wigw-sound', value ? 'on' : 'off'); } catch (error) {} },
      tap() { lastTap = performance.now(); if (on) tone(1250, 0, 0.06, 0.055, 'sine', 620); },
      correct() { if (!cueAllowed()) return; tone(880, 0, 0.32, 0.11, 'sine'); tone(1760, 0, 0.25, 0.02, 'sine'); tone(1318.5, 0.09, 0.42, 0.11, 'sine'); tone(2637, 0.09, 0.3, 0.02, 'sine'); },
      wrong() { if (!cueAllowed()) return; tone(329.6, 0, 0.26, 0.1, 'triangle', null, 1400); tone(261.6, 0.12, 0.34, 0.1, 'triangle', null, 1100); }
    };
  })();
  const soundToggle = byId('sound-toggle');
  const paintSound = () => {
    soundToggle.setAttribute('aria-pressed', String(sound.on));
    soundToggle.setAttribute('aria-label', sound.on ? 'Sound effects on' : 'Sound effects off');
  };
  soundToggle.addEventListener('click', () => { sound.on = !sound.on; paintSound(); });
  paintSound();
  document.addEventListener('pointerdown', event => {
    if (event.target.closest('button, .tick, .choice, summary') && !event.target.closest('#sound-toggle')) sound.tap();
  }, true);

  /* ---------- required activity, locked Next ---------- */
  const required = {
    instructions: () => [byId('instructions-read')],
    ask: () => ['assigned-prompt','first-output','capture-method'].map(byId),
    check: () => {
      const list = ['check-source','unsupported','consequence'].map(byId);
      if (looksLikeNoClaim(byId('unsupported').value)) list.push(byId('no-claim'));
      return list;
    },
    provided: () => (scenario && scenario.providedOutput ? [] : [byId('provided-entry')]).concat(['provided-check-source','provided-unsupported','provided-consequence'].map(byId)),
    rewrite: () => [byId('revised-prompt'), byId('second-output'), document.querySelector('input[name="improved"]'), byId('comparison')],
    review: () => []
  };
  const isFilled = field => {
    if (field.type === 'checkbox') return field.checked;
    if (field.type === 'radio') return Boolean(document.querySelector('input[name="' + field.name + '"]:checked'));
    return Boolean(field.value.trim());
  };
  const missingFor = page => (required[page] ? required[page]() : []).filter(field => !isFilled(field));
  const messageFor = field => {
    if (field.id === 'instructions-read') return 'Read the instructions and tick the checkbox before continuing.';
    if (field.id === 'no-claim') return 'Confirm your no-claim answer with the checkbox before continuing.';
    if (field.id === 'provided-entry') return 'Ask the facilitator for the provided AI response, then paste it here to continue.';
    if (field.type === 'radio' && current === 'rewrite' && missingFor('rewrite').length === 1) return 'Select whether the second answer improved before continuing.';
    return 'Complete all required answers before continuing.';
  };
  const glowTarget = field => field.type === 'checkbox' ? field.closest('.tick') : field.type === 'radio' ? field.closest('.choices') : field;
  function updateLock() {
    if (current === 'start') return;
    activePage().querySelectorAll('.field[data-required]').forEach(field => {
      const control = field.querySelector('textarea, input[type=text]');
      if (control) field.classList.toggle('is-done', Boolean(control.value.trim()));
    });
    const locked = missingFor(current).length > 0;
    nextBtn.classList.toggle('saa-locked', locked);
    nextBtn.setAttribute('aria-disabled', String(locked));
    const status = byId(current + '-status');
    if (!locked && status) status.textContent = '';
  }
  document.addEventListener('input', updateLock);
  document.addEventListener('change', updateLock);

  /* ---------- nudges ---------- */
  let nudged = [];
  let idleTimer = 0;
  function clearNudges() { nudged.forEach(element => element.classList.remove('saa-nudge')); nudged = []; }
  function nudge(elements, duration) {
    clearNudges();
    nudged = elements.filter(Boolean).slice(0, 8);
    nudged.forEach(element => element.classList.add('saa-nudge'));
    if (duration) { const these = nudged; setTimeout(() => these.forEach(element => element.classList.remove('saa-nudge')), duration); }
  }
  function resetIdle() {
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => {
      if (document.hidden || !byId('confirm-modal').hidden) return resetIdle();
      if (current === 'start') { nudge([byId('start')]); return; }
      if (current === 'review') return;
      const missing = missingFor(current);
      nudge(missing.length ? [...new Set(missing.map(glowTarget))] : [nextBtn]);
    }, 5000);
  }
  ['pointerdown','keydown','wheel','input','touchstart'].forEach(type => document.addEventListener(type, () => {
    if (nudged.length && !nudged.some(element => element.dataset.hold)) clearNudges();
    resetIdle();
  }, {passive:true, capture:true}));

  /* ---------- navigation ---------- */
  function goNext() {
    const missing = missingFor(current);
    if (missing.length) {
      const status = byId(current + '-status');
      if (status) status.textContent = messageFor(missing[0]);
      sound.wrong();
      const card = activePage().querySelector('.card');
      card.classList.remove('shake'); void card.offsetWidth; card.classList.add('shake');
      setTimeout(() => card.classList.remove('shake'), 400);
      nudge([...new Set(missing.map(glowTarget))], 2600);
      missing[0].focus();
      return;
    }
    if (current === 'instructions') show('ask');
    else if (current === 'ask') show('check');
    else if (current === 'check') {
      usedProvided = looksLikeNoClaim(byId('unsupported').value);
      updateBranchUI();
      show(usedProvided ? 'provided' : 'rewrite');
    } else if (current === 'provided') {
      usedProvided = true;
      updateBranchUI();
      show('rewrite');
    } else if (current === 'rewrite') show('review');
  }
  function goBack() {
    const previous = {instructions:'start', ask:'instructions', check:'ask', provided:'check', rewrite: usedProvided ? 'provided' : 'check', review:'rewrite'};
    show(previous[current]);
  }
  nextBtn.addEventListener('click', goNext);
  backBtn.addEventListener('click', goBack);
  byId('start').addEventListener('click', () => {
    if (!scenario) assignScenario();
    show('instructions');
  });

  byId('copy-prompt').addEventListener('click', async () => {
    const label = byId('copy-prompt').querySelector('span');
    try {
      await navigator.clipboard.writeText(scenario.prompt);
      label.textContent = 'Copied';
    } catch (error) {
      const range = document.createRange();
      range.selectNodeContents(byId('scenario-prompt'));
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      label.textContent = 'Selected — press Ctrl+C';
    }
    setTimeout(() => { label.textContent = 'Copy prompt'; }, 2000);
  });

  /* ---------- proportional zoom ---------- */
  function fit() {
    const width = window.innerWidth, height = window.innerHeight;
    let zoom = width <= 700 ? 1 : Math.max(1, Math.min(width / 980, height / 640, 1.7));
    const root = document.documentElement;
    root.style.setProperty('--z', zoom.toFixed(3));
    if (zoom === 1 || current === 'start') return;
    const page = activePage();
    const overflowing = () => [...page.querySelectorAll('.card, .split > .lead')].some(area => area.scrollHeight > area.clientHeight + 1);
    while (zoom > 1 && overflowing()) {
      zoom = Math.max(1, zoom - 0.04);
      root.style.setProperty('--z', zoom.toFixed(3));
    }
  }
  let fitFrame = 0;
  window.addEventListener('resize', () => { cancelAnimationFrame(fitFrame); fitFrame = requestAnimationFrame(fit); });
  const fields = [
    ['Prompt entered','assigned-prompt'],['First AI answer','first-output'],
    ['Capture method','capture-method'],['Check source or card','check-source'],
    ['Unsupported claim or missing fact','unsupported'],['Possible consequence','consequence'],
    ['Revised prompt','revised-prompt'],['Second AI answer','second-output'],
    ['What changed and what still needs checking','comparison'],['Reflection','learner-reflection']
  ];
  const value = id => byId(id).value.trim() ? byId(id).value : '[Not entered]';
  function record() {
    const improved = document.querySelector('input[name="improved"]:checked');
    const lines = ['WATCH IT GET IT WRONG','AAI-E-MC1-S01-LAB02 | PC 1.1 to 1.5','Assigned scenario: ' + (scenario ? scenario.id.toUpperCase() : '[Not selected]'),'Provided prompt: ' + (scenario ? scenario.prompt : '[Not selected]'),'Check card: ' + (scenario ? scenario.check : '[Not selected]'),''];
    fields.forEach(item => { lines.push(item[0].toUpperCase(), value(item[1]), ''); });
    if (usedProvided) {
      lines.push('PROVIDED AI OUTPUT USED', scenario.providedOutput || value('provided-entry'), '');
      [['Check source or card','provided-check-source'],['Unsupported claim in provided output','provided-unsupported'],['Possible consequence of provided output','provided-consequence']].forEach(item => {
        lines.push(item[0].toUpperCase(), value(item[1]), '');
      });
    }
    lines.push('DID THE ANSWER IMPROVE?', improved ? improved.value : '[Not selected]', '', 'Evidence checklist: ' + document.querySelectorAll('.checklist input:checked').length + ' of ' + (usedProvided ? 6 : 5) + ' checked');
    return lines.join('\n');
  }
  function pdfText(value) {
    const punctuation = {'\u2018':145,'\u2019':146,'\u201c':147,'\u201d':148,'\u2022':149,'\u2013':150,'\u2014':151,'\u2026':133,'\u20ac':128,'\u2212':45,'\u00a0':32};
    let result = '';
    for (const character of value) {
      if (character === '\u20b9') { result += 'INR '; continue; }
      const point = character.codePointAt(0);
      const code = punctuation[character] || (point >= 32 && point <= 255 ? point : 63);
      if (code === 40 || code === 41 || code === 92) result += '\\' + String.fromCharCode(code);
      else if (code > 126) result += '\\' + code.toString(8).padStart(3,'0');
      else result += String.fromCharCode(code);
    }
    return result;
  }
  function wrapReport(value, width = 86) {
    const lines = [];
    value.replace(/\r/g,'').split('\n').forEach(paragraph => {
      if (!paragraph) { lines.push(''); return; }
      let rest = paragraph;
      while (rest.length > width) {
        let end = rest.lastIndexOf(' ', width);
        if (end < 35) end = width;
        lines.push(rest.slice(0,end));
        rest = rest.slice(end).trimStart();
      }
      lines.push(rest);
    });
    return lines;
  }
  function makePdf(value) {
    const lines = wrapReport(value);
    const pages = [];
    for (let start = 0; start < lines.length; start += 53) pages.push(lines.slice(start,start + 53));
    const objects = [];
    objects[1] = '<< /Type /Catalog /Pages 2 0 R >>';
    objects[2] = '<< /Type /Pages /Kids [' + pages.map((_,i) => (5 + i*2) + ' 0 R').join(' ') + '] /Count ' + pages.length + ' >>';
    objects[3] = '<< /Type /Font /Subtype /Type1 /BaseFont /Courier /Encoding /WinAnsiEncoding >>';
    objects[4] = '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>';
    pages.forEach((page,i) => {
      const pageId = 5 + i*2, contentId = pageId + 1;
      objects[pageId] = '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents ' + contentId + ' 0 R >>';
      const commands = [
        'BT /F2 17 Tf 0.055 0.106 0.36 rg 46 786 Td (Watch It Get It Wrong) Tj ET',
        '0.89 0.90 0.95 RG 46 774 m 549 774 l S'
      ];
      page.forEach((line,j) => {
        commands.push('BT /F1 9 Tf 0.055 0.106 0.36 rg 46 ' + (751 - j*13) + ' Td (' + pdfText(line) + ') Tj ET');
      });
      commands.push('BT /F1 8 Tf 0.28 0.32 0.46 rg 46 35 Td (AAI-E-MC1-S01-LAB02) Tj ET');
      commands.push('BT /F1 8 Tf 0.28 0.32 0.46 rg 480 35 Td (Page ' + (i+1) + ' of ' + pages.length + ') Tj ET');
      const stream = commands.join('\n') + '\n';
      objects[contentId] = '<< /Length ' + stream.length + ' >>\nstream\n' + stream + 'endstream';
    });
    let pdf = '%PDF-1.4\n';
    const offsets = [0];
    for (let id = 1; id < objects.length; id++) {
      offsets[id] = pdf.length;
      pdf += id + ' 0 obj\n' + objects[id] + '\nendobj\n';
    }
    const xref = pdf.length;
    pdf += 'xref\n0 ' + objects.length + '\n0000000000 65535 f \n';
    for (let id = 1; id < objects.length; id++) pdf += String(offsets[id]).padStart(10,'0') + ' 00000 n \n';
    pdf += 'trailer\n<< /Size ' + objects.length + ' /Root 1 0 R >>\nstartxref\n' + xref + '\n%%EOF';
    return new Blob([pdf], {type:'application/pdf'});
  }
  byId('download').addEventListener('click', () => {
    try {
      const url = URL.createObjectURL(makePdf(record()));
      const link = document.createElement('a');
      link.href = url;
      link.download = 'watch-it-get-it-wrong-report.pdf';
      document.body.append(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 10000);
      byId('download-status').classList.add('ok');
      byId('download-status').textContent = 'PDF download started. Open the file to check it before submission.';
      byId('logout-panel').hidden = false;
      sound.correct();
    } catch (error) {
      byId('download-status').classList.remove('ok');
      byId('download-status').textContent = 'The PDF could not be created. Keep this page open and try again.';
      sound.wrong();
    }
  });

  /* ---------- confirm modal ---------- */
  const modal = byId('confirm-modal');
  const closeModal = () => { modal.hidden = true; app.inert = false; byId('logout').focus(); };
  byId('logout').addEventListener('click', () => {
    modal.hidden = false;
    app.inert = true;
    byId('confirm-cancel').focus();
  });
  byId('confirm-cancel').addEventListener('click', closeModal);
  modal.addEventListener('click', event => { if (event.target === modal) closeModal(); });
  modal.addEventListener('keydown', event => {
    if (event.key === 'Escape') { closeModal(); return; }
    if (event.key !== 'Tab') return;
    const first = byId('confirm-cancel'), last = byId('confirm-ok');
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  });
  byId('confirm-ok').addEventListener('click', () => {
    modal.hidden = true;
    clearActivity();
  });
  function clearActivity() {
    fields.forEach(item => { byId(item[1]).value = ''; });
    ['provided-entry','provided-check-source','provided-unsupported','provided-consequence'].forEach(id => { byId(id).value = ''; });
    document.querySelectorAll('input[name="improved"], .checklist input').forEach(input => { input.checked = false; });
    byId('no-claim').checked = false;
    byId('no-claim-row').hidden = true;
    byId('instructions-read').checked = false;
    byId('instructions-status').textContent = '';
    byId('ask-status').textContent = '';
    byId('check-status').textContent = '';
    byId('provided-status').textContent = '';
    byId('rewrite-status').textContent = '';
    previousScenarioId = scenario ? scenario.id : previousScenarioId;
    scenario = null;
    usedProvided = false;
    updateBranchUI();
    byId('scenario-id').textContent = '';
    byId('check-scenario-id').textContent = '';
    byId('scenario-prompt').textContent = '';
    byId('scenario-check').textContent = '';
    byId('scenario-safety').hidden = true;
    byId('logout-panel').hidden = true;
    byId('download-status').textContent = '';
    byId('download-status').classList.remove('ok');
    document.querySelectorAll('.field.is-done').forEach(field => field.classList.remove('is-done'));
    show('start');
  }

  /* ---------- init ---------- */
  app.inert = true;
  fit();
  resetIdle();
})();
