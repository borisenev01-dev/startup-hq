// All content for the planning platform lives here.
// Edit this file to add or change sections, checklists, and projects.
// Checklist IDs must stay unique and stable — progress is saved against them.

// How a project runs with an industrial / manufacturing client (shared by the engineering projects).
const INDUSTRIAL_LIFECYCLE = [
  { title: "1 · Site visit", text: "Walk the shop floor. See the process, the machines, the people doing the work by hand. Ask about volumes, cost of failures/defects, and who decides on purchases." },
  { title: "2 · Feasibility check", text: "Ask for sample data (photos, sensor logs, drawings, old quotes). Spend ~1 week proving it can work. Free or cheap — this is what wins the pilot." },
  { title: "3 · Paid pilot", text: "Fixed scope and price, 30–50% upfront. Agree measurable success criteria up front (e.g. '≥95% of defects caught', 'quote in 5 min instead of 1 hour')." },
  { title: "4 · Shadow mode", text: "Run the system alongside the existing process — humans still decide. Compare results and fix edge cases. Nobody's production is at risk." },
  { title: "5 · Rollout & handover", text: "Go live, train operators and engineers, document everything, collect the final payment." },
  { title: "6 · Support contract & case study", text: "Monthly support/licence fee. Write a case study with real numbers (hours saved, scrap reduced) — your best sales tool for the next client in Brainport." },
];

window.PLATFORM = {
  name: "Startup HQ",
  tagline: "AI software for engineering & manufacturing — Eindhoven",

  groups: [
    {
      title: "Overview",
      pages: [
        { id: "dashboard", title: "Dashboard", icon: "◎", kind: "dashboard" },
        {
          id: "strategy",
          title: "Strategy",
          icon: "➶",
          intro:
            "Start as an AI services business, then turn repeated client requests into a product. No upfront investment — clients fund the company.",
          blocks: [
            {
              type: "steps",
              title: "The path",
              items: [
                { title: "1 · Services", text: "Sell AI-powered engineering software services to local SMEs. Take 30–50% upfront so no project costs you money." },
                { title: "2 · Spot patterns", text: "Track which requests repeat. Three clients wanting the same thing = a validated product idea." },
                { title: "3 · Product", text: "Build the repeated solution as a SaaS/product. Service income pays the bills while it grows." },
                { title: "4 · Funding (optional)", text: "Only after traction: accelerators, grants, angels. Traction gives better terms — or makes funding unnecessary." },
              ],
            },
            {
              type: "callout",
              tone: "info",
              title: "Our edge",
              text: "We are mechanical engineering & mechatronics students in Brainport Eindhoven. Most AI agencies build chatbots — we understand machines, sensors, CAD, and manufacturing. That is our niche.",
            },
            {
              type: "checklist",
              id: "strategy-roadmap",
              title: "Roadmap milestones",
              items: [
                "Founders' agreement signed",
                "Niche and first service offer defined",
                "First demo built and filmed",
                "Portfolio site live",
                "First paid (or testimonial) client",
                "KVK registration",
                "3+ paying clients",
                "Repeated request identified → product idea",
                "Product MVP launched",
                "Convert to BV / consider funding",
              ],
            },
          ],
        },
      ],
    },

    {
      title: "Business Foundations",
      pages: [
        {
          id: "team",
          title: "Team & Founders",
          icon: "⚇",
          intro: "Get the team aligned in writing before any money or clients are involved. Cost: €0.",
          blocks: [
            {
              type: "checklist",
              id: "team-agreement",
              title: "Founders' agreement must cover",
              items: [
                "Equity split between founders",
                "Roles: sales, engineering/building, design, admin",
                "Time commitment per person (hours/week)",
                "All code and IP belongs to the company",
                "Vesting (e.g. 4 years with a 1-year cliff)",
                "What happens if someone leaves",
                "How decisions are made (unanimous / majority)",
                "How revenue is used (reinvest vs. pay out)",
              ],
            },
            { type: "roles", title: "Roles & owners" },
            {
              type: "callout",
              tone: "warn",
              title: "Don't skip this",
              text: "Starting without a written agreement is the #1 way friend-founded companies fall apart. A shared Google Doc signed by everyone is enough to start.",
            },
          ],
        },
        {
          id: "legal",
          title: "Legal & Tax (NL)",
          icon: "§",
          intro:
            "As EU citizens living in the Netherlands we can register a business just like Dutch citizens — we need a BSN and a Dutch address. KVK registration is a one-time fee of roughly €80–85.",
          blocks: [
            {
              type: "table",
              title: "Legal forms",
              head: ["Form", "When", "Notes"],
              rows: [
                ["Eenmanszaak (sole proprietorship)", "One person invoices for the first projects", "Cheapest and fastest"],
                ["VOF (general partnership)", "Several founders sharing income", "Each partner is personally liable for the company's debts, including partners' commitments. Write a partnership contract."],
                ["BV (private limited company)", "Steady revenue or investors", "Limits personal liability, clean equity & vesting. Needs a notary (hundreds to 1000+ euros)."],
              ],
            },
            {
              type: "callout",
              tone: "info",
              title: "Recommendation",
              text: "Start with one eenmanszaak or a VOF with a written contract. Convert to a BV once revenue justifies it. Register at the KVK only when the first client is ready to pay.",
            },
            {
              type: "list",
              title: "Tax notes",
              items: [
                "KOR (small business scheme): if yearly turnover stays under €20,000 you can opt out of charging VAT — much less paperwork.",
                "Entrepreneur tax deductions mostly require ≥1,225 business hours/year. Full-time students usually don't qualify — don't count on them.",
                "WBSO: Dutch R&D tax benefit — worth checking once we develop real technology.",
              ],
            },
            {
              type: "checklist",
              id: "legal-checks",
              title: "Check before registering",
              items: [
                "Health insurance: does our EHIC still cover us once we earn money in NL? (ask insurer / CAK) — Dutch basic insurance may become mandatory",
                "DUO student finance: how does self-employment income affect eligibility?",
                "Decide legal form (eenmanszaak / VOF)",
                "Book KVK appointment & register",
                "Decide on KOR (VAT exemption)",
                "Business bank account",
                "Professional liability insurance (once working on clients' production systems)",
                "Verify current figures with KVK, Belastingdienst and DUO",
              ],
            },
          ],
        },
        {
          id: "tools",
          title: "Tool Stack & Costs",
          icon: "⚙",
          intro: "Use free tiers everywhere. The only real recurring cost is AI tools.",
          blocks: [
            {
              type: "table",
              title: "Free stack",
              head: ["Need", "Free option"],
              rows: [
                ["Code & collaboration", "GitHub (free private repos)"],
                ["Hosting", "Vercel / Netlify / Cloudflare Pages free tiers"],
                ["Database & auth", "Supabase or Firebase free tier"],
                ["Communication", "Discord / Slack free"],
                ["Design", "Figma free plan"],
                ["Cloud credits", "Microsoft for Startups, AWS Activate, Google for Startups (apply)"],
                ["Students", "GitHub Student Developer Pack"],
                ["Prototyping hardware", "Raspberry Pi, webcam, Arduino — cheap, often available via TU/e"],
              ],
            },
            {
              type: "callout",
              tone: "warn",
              title: "AI costs",
              text: "≈ €20/month per person for an AI subscription, plus API usage if apps call an AI model. Set spending limits on every API key. Share subscriptions at first if needed.",
            },
            {
              type: "checklist",
              id: "tools-setup",
              title: "Setup",
              items: [
                "GitHub organisation created, everyone invited",
                "Student Developer Pack claimed by each founder",
                "Team chat (Discord/Slack) set up",
                "Shared drive for documents",
                "AI subscription(s) chosen",
                "Spending limits set on all API keys",
                "Applied for cloud startup credits",
              ],
            },
            { type: "budget", title: "Monthly budget tracker" },
          ],
        },
        {
          id: "risks",
          title: "Risks & Pitfalls",
          icon: "⚠",
          intro: "Mistakes to actively avoid.",
          blocks: [
            {
              type: "checklist",
              id: "risks-list",
              title: "Mitigated?",
              items: [
                "Not building for months before talking to customers",
                "Spending caps on every API key (no surprise bills)",
                "Written agreement between founders",
                "Client permission before sending their data to AI services",
                "Liability insurance before touching production machines",
                "Health insurance / DUO situation checked",
                "Not over-promising timelines while studying full-time",
              ],
            },
          ],
        },
      ],
    },

    {
      title: "Growth",
      pages: [
        {
          id: "ecosystem",
          title: "Eindhoven Support",
          icon: "⌂",
          intro: "Free university and regional support around Brainport.",
          blocks: [
            {
              type: "cards",
              items: [
                { title: "TU/e innovation Space", text: "Student entrepreneurship support, courses and contacts. Check if projects can count toward study credits." },
                { title: "TU/e startup programs & incubator", text: "Mentoring, workspace, access to the university network." },
                { title: "HighTechXL", text: "Deep-tech venture building. Relevant once we have traction." },
                { title: "Brainport Development", text: "Regional economic development, network and events." },
                { title: "BOM", text: "Brabant development agency — funding for high-tech startups." },
                { title: "KVK", text: "Free starter webinars and advice." },
                { title: "WBSO (RVO)", text: "R&D tax benefit once we develop real technology." },
              ],
            },
            {
              type: "checklist",
              id: "ecosystem-contacts",
              title: "Reach out",
              items: [
                "Visit TU/e innovation Space",
                "Ask about TU/e startup programs / incubator",
                "Attend a KVK starter webinar",
                "Attend a Brainport / startup event",
                "Talk to professors about industry contacts",
                "Check WBSO eligibility (later)",
              ],
            },
          ],
        },
        {
          id: "gtm",
          title: "Sales & Clients",
          icon: "✉",
          intro:
            "Target: small and mid-sized suppliers around ASML, Philips, VDL, DAF and others — shops with no software team. Many work in Dutch, so a Dutch-speaking team member or partner helps.",
          blocks: [
            {
              type: "list",
              title: "Where to find clients",
              items: [
                "Personal network, family businesses",
                "Professors and internship contacts",
                "LinkedIn outreach to local machine shops and suppliers",
                "Freelance platforms (Upwork, Fiverr, Contra)",
                "Posting demos on LinkedIn, X and Reddit",
              ],
            },
            {
              type: "list",
              title: "Pricing rules",
              items: [
                "Take 30–50% upfront",
                "First 1–2 projects cheap/free in exchange for a testimonial and portfolio piece",
                "Fixed-price pilots with clear scope",
              ],
            },
            { type: "pipeline", title: "Client pipeline" },
          ],
        },
        {
          id: "plan30",
          title: "First 30 Days",
          icon: "▦",
          intro: "Concrete action plan for the first month.",
          blocks: [
            {
              type: "checklist",
              id: "plan30-week1",
              title: "Week 1 — Team",
              items: ["Agree on roles", "Draft founders' agreement", "Sign founders' agreement", "Pick one niche from the Projects section"],
            },
            {
              type: "checklist",
              id: "plan30-week2",
              title: "Week 2 — Demo",
              items: ["Define demo scope", "Build first demo (e.g. defect detection on 3D-printed parts)", "Film the demo"],
            },
            {
              type: "checklist",
              id: "plan30-week3",
              title: "Week 3 — Presence",
              items: ["Portfolio site live (free hosting)", "LinkedIn profiles updated", "Post the demo video"],
            },
            {
              type: "checklist",
              id: "plan30-week4",
              title: "Week 4 — Outreach",
              items: ["List 20–30 local machine shops / suppliers", "Contact professors and internship contacts", "Send outreach messages", "Offer cheap/free pilot for a testimonial", "Register at KVK when first client is ready to pay"],
            },
          ],
        },
      ],
    },
  ],

  // ---------------- Project types ----------------
  projects: [
    {
      id: "vision",
      title: "Vision Quality Inspection",
      icon: "◉",
      tagline: "Detect defects in parts with a cheap camera and an open-source model.",
      customers: "Machine shops, injection moulders, 3D-printing services, assembly lines",
      problem: "Manual visual inspection is slow, inconsistent and expensive.",
      solution: "Camera + Raspberry Pi / laptop running an open-source vision model that flags defective parts and logs results.",
      stack: ["Python", "OpenCV", "YOLO / open-source vision models", "Raspberry Pi or laptop", "USB/industrial camera", "Simple web dashboard"],
      hardware: "≈ €50–150 (Pi + camera) for a demo",
      pricing: "Fixed-price pilot, then per-line installation + support",
      mvp: [
        "Collect images of good and defective parts (start with 3D prints)",
        "Label dataset",
        "Train/fine-tune detection model",
        "Live camera demo with pass/fail output",
        "Results dashboard / log",
        "Film demo video",
        "Pitch to 5 local shops",
      ],

      lifecycle: INDUSTRIAL_LIFECYCLE,
      examples: [
        {
          title: "End-of-line defect detection for moulded parts",
          client: "Example: an injection-moulding or die-casting supplier in the Eindhoven region where an operator visually checks every part at the end of the line.",
          problem: "Manual inspection is tiring and inconsistent — defects like short shots, flash, burn marks or scratches get missed late in a shift, and a missed defect can mean a complaint or a rejected batch from a big customer.",
          solution: "A camera in a simple enclosure with fixed LED lighting photographs each part. An anomaly-detection model, trained mostly on good parts (defects are rare, so you can't collect many examples), flags anything unusual. Results show as green/red on a screen and every image is logged for traceability.",
          how: [
            "Visit the line: note part sizes, cycle time, how parts arrive (conveyor, robot, by hand), and which defects matter most.",
            "Build a fixed enclosure + LED lighting — consistent lighting matters more than the model.",
            "Collect a few hundred images of good parts and every defect example the client has kept.",
            "Train an anomaly-detection model (e.g. with Anomalib) and/or a defect classifier (e.g. YOLO) for known defect types.",
            "Tune the threshold together with the quality engineer: how many false alarms are acceptable vs. missed defects?",
            "Run in shadow mode for 1–2 weeks next to the operator, compare results, then go live.",
          ],
          stack: ["Python", "OpenCV", "Anomalib / YOLO", "Industrial or USB camera + LED lighting", "Raspberry Pi 5 / mini-PC (optionally with AI accelerator)", "Web dashboard + image log"],
          deliverables: ["Inspection station (camera, lighting, computer)", "Trained model + retraining instructions", "Pass/fail display and image archive", "Accuracy report from shadow mode", "Operator manual"],
          timeline: "3–6 weeks for a pilot on one line",
          price: "Starter estimate: €2,000–6,000 pilot (hardware at cost on top) + €100–300/month support per station. Pitch it against the cost of one customer complaint or scrapped batch.",
          risks: [
            "Lighting and part position vary → fixed enclosure, jig or guide rail; collect images across shifts.",
            "Too many false rejects and operators start ignoring it → tune thresholds with the client and measure in shadow mode before going live.",
            "Liability for missed defects → start as an assistant to the human inspector, state clearly in the contract that final quality responsibility stays with the client.",
            "Factory IT security → run offline/on-premise, agree with IT before connecting to their network.",
          ],
        },
        {
          title: "Assembly completeness check",
          client: "Example: a small machine builder or electronics assembler where workers assemble modules by hand (screws, connectors, labels, cables).",
          problem: "Forgotten screws, missing labels or unplugged connectors are found only at final test — or worse, by the customer. Rework is expensive.",
          solution: "A camera above the assembly station checks that all components are present and in the right place before the module moves on, and stores a photo per serial number as proof of correct assembly.",
          how: [
            "List the checks per product variant (e.g. 8 screws, 2 connectors, 1 label in the right orientation).",
            "Mount a camera above the workstation; scan the serial number (barcode/QR) to know which variant is being built.",
            "Train an object-detection model (YOLO) to find each component; compare to the expected list.",
            "Show the operator what's missing on a screen, with the region highlighted.",
            "Store image + result per serial number for traceability.",
          ],
          stack: ["Python", "YOLO (Ultralytics)", "Roboflow or Label Studio for labelling", "Webcam / industrial camera", "Barcode scanner", "Simple web UI"],
          deliverables: ["Working check station for 1–3 product variants", "Labelled dataset + training pipeline", "Traceability log per serial number", "Guide to add new variants"],
          timeline: "2–4 weeks",
          price: "Starter estimate: €1,500–4,000 per station + optional €50–150/month for support and adding new variants.",
          risks: [
            "Many product variants → start with the highest-volume one; make adding variants part of a paid support package.",
            "Workers feel monitored → position it as a helper that prevents rework, involve them in testing; don't record people, only the product.",
          ],
        },
      ],
      resources: [
        {
          group: "Computer vision fundamentals",
          items: [
            { title: "OpenCV tutorials", url: "https://docs.opencv.org/4.x/d9/df8/tutorial_root.html", desc: "Image processing basics: thresholding, contours, camera calibration — often enough without any AI." },
            { title: "Stanford CS231n notes", url: "https://cs231n.github.io", desc: "Classic course notes on convolutional neural networks for vision." },
            { title: "fast.ai Practical Deep Learning", url: "https://course.fast.ai", desc: "Free, practical — train image classifiers in the first lessons." },
            { title: "PyTorch tutorials", url: "https://pytorch.org/tutorials/", desc: "The deep-learning framework behind most vision models." },
          ],
        },
        {
          group: "Detection & anomaly models",
          items: [
            { title: "Ultralytics YOLO docs", url: "https://docs.ultralytics.com", desc: "Train object-detection and segmentation models on your own data in a few lines." },
            { title: "Anomalib", url: "https://github.com/open-edge-platform/anomalib", desc: "Open-source library for industrial anomaly detection — train on good parts only." },
            { title: "MVTec AD dataset", url: "https://www.mvtec.com/company/research/datasets/mvtec-ad", desc: "Benchmark dataset of industrial defects — practise before you have client data (check its licence for commercial use)." },
          ],
        },
        {
          group: "Data labelling",
          items: [
            { title: "Roboflow", url: "https://roboflow.com", desc: "Labelling, dataset management and tutorials; free tier for public projects." },
            { title: "Roboflow blog", url: "https://blog.roboflow.com", desc: "Many practical guides on industrial vision use cases." },
            { title: "Label Studio", url: "https://labelstud.io", desc: "Open-source labelling tool — self-host to keep client images private." },
          ],
        },
        {
          group: "Hardware & deployment",
          items: [
            { title: "Raspberry Pi camera docs", url: "https://www.raspberrypi.com/documentation/computers/camera_software.html", desc: "Set up cameras on a Pi for cheap prototypes." },
            { title: "OpenVINO docs", url: "https://docs.openvino.ai", desc: "Run models fast on ordinary Intel CPUs / mini-PCs on the factory floor." },
          ],
        },
      ],
    },
    {
      id: "sensors",
      title: "Sensor Data & Predictive Maintenance",
      icon: "∿",
      tagline: "Turn machine data into dashboards and early failure warnings.",
      customers: "Small machine builders, factories with older equipment",
      problem: "Machines fail unexpectedly; data is collected but never used.",
      solution: "Ingest sensor/PLC data, build dashboards, and use anomaly detection to predict maintenance needs.",
      stack: ["Python", "pandas / scikit-learn", "Time-series DB or Supabase", "Grafana or custom dashboard", "MQTT / OPC UA", "Accelerometer / current sensors for demos"],
      hardware: "≈ €20–80 for sensor demo kit",
      pricing: "Setup fee + monthly dashboard subscription",
      mvp: [
        "Build demo rig (motor + vibration sensor)",
        "Data logging pipeline",
        "Live dashboard",
        "Anomaly detection model",
        "Alert (email/Teams) on anomalies",
        "Case-study write-up",
      ],

      lifecycle: INDUSTRIAL_LIFECYCLE,
      examples: [
        {
          title: "Retrofit vibration monitoring on older machines",
          client: "Example: a metalworking shop with older CNC machines, compressors or pumps that have no built-in monitoring.",
          problem: "Machines break down unexpectedly — a failed spindle bearing or compressor can stop production for days and cost thousands in rush repairs and missed deliveries.",
          solution: "Clip-on wireless sensors (vibration, temperature, motor current) send data to a small server. A dashboard shows machine health, and an anomaly model learns each machine's 'normal' and sends an alert when it starts behaving differently — weeks before failure.",
          how: [
            "Pick 1–3 critical machines with the maintenance manager — the ones whose failure hurts most.",
            "Mount sensors: ESP32 microcontroller + accelerometer on the bearing housing, current clamp on the motor cable, temperature sensor. No changes to the machine's control system.",
            "Send data over Wi-Fi with MQTT to a small on-site server (mini-PC or Raspberry Pi).",
            "Store in a time-series database (InfluxDB) and visualise in Grafana.",
            "Compute features (RMS vibration, frequency peaks via FFT, temperature trend) and train an anomaly-detection model on 2–4 weeks of normal operation.",
            "Alerts by email / Teams / SMS when health drops; weekly health report.",
          ],
          stack: ["ESP32 / Arduino", "Accelerometer, current clamp, temperature sensor", "MQTT (Mosquitto)", "InfluxDB", "Grafana", "Python: pandas, NumPy (FFT), scikit-learn"],
          deliverables: ["Sensor kits installed on pilot machines", "Live health dashboard", "Anomaly alerts", "Monthly health report", "Documentation for adding machines"],
          timeline: "4–8 weeks (includes 2–4 weeks of collecting 'normal' data)",
          price: "Starter estimate: €1,500–5,000 pilot (sensors ~€30–80 per machine at cost) + €30–100/month per machine for monitoring. Pitch it against the cost of one day of unplanned downtime.",
          risks: [
            "Can't prove 'predictive' quickly because failures are rare → sell the dashboard and early-warning value first; build failure history over time.",
            "Wi-Fi in a factory is unreliable → buffer data on the device; consider wired or LoRa options.",
            "Safety when mounting sensors → only install with the machine stopped and with the client's maintenance staff present.",
          ],
        },
        {
          title: "Production (OEE) dashboard from existing PLC data",
          client: "Example: a small factory or machine builder with several production machines that have PLCs, but where nobody looks at the data.",
          problem: "Management doesn't know real machine utilisation, why machines stop, or how much output is lost. Data exists in the PLCs but is never collected.",
          solution: "Read-only connection to the machines' PLCs to collect cycle counts, stops and alarms. A dashboard shows OEE (availability × performance × quality) per machine and shift, and an AI-written weekly summary explains the biggest losses in plain language.",
          how: [
            "Inventory the machines and controllers (Siemens, Beckhoff, Omron…) together with the client's automation engineer.",
            "Connect read-only via OPC UA, Modbus TCP or the PLC's native protocol — or with a gateway like Node-RED.",
            "Map signals: running/stopped, part counter, alarm codes, reject counter.",
            "Store data, calculate OEE, and categorise downtime reasons (operators can add reasons on a tablet).",
            "Weekly AI summary: 'Machine 3 lost 6 hours to material shortages on Tuesday night shift'.",
          ],
          stack: ["OPC UA (asyncua) / Modbus / Node-RED", "InfluxDB or PostgreSQL", "Grafana", "Python", "AI model API for weekly summaries"],
          deliverables: ["Data connection to pilot machines", "OEE dashboard per machine/shift", "Downtime reason input", "Weekly automated report"],
          timeline: "3–6 weeks",
          price: "Starter estimate: €2,000–6,000 setup + €100–300/month for hosting, support and reports.",
          risks: [
            "Touching PLCs is risky → read-only access only, never write values; always work with the client's automation engineer.",
            "Old machines without a network connection → use a simple sensor (current clamp, light-stack sensor) instead.",
            "Network security → isolated network/VLAN, agree with client IT; no remote access without approval.",
          ],
        },
      ],
      resources: [
        {
          group: "Data analysis & ML",
          items: [
            { title: "pandas getting started", url: "https://pandas.pydata.org/docs/getting_started/index.html", desc: "Load, clean and resample time-series sensor data." },
            { title: "scikit-learn outlier & novelty detection", url: "https://scikit-learn.org/stable/modules/outlier_detection.html", desc: "Isolation Forest, One-Class SVM and more — the core of anomaly detection." },
            { title: "scikit-learn user guide", url: "https://scikit-learn.org/stable/user_guide.html", desc: "Reference for all classic ML methods." },
            { title: "CWRU Bearing Data Center", url: "https://engineering.case.edu/bearingdatacenter", desc: "Public vibration dataset of healthy and faulty bearings — practise fault detection before you have client data." },
          ],
        },
        {
          group: "Industrial communication",
          items: [
            { title: "HiveMQ MQTT Essentials", url: "https://www.hivemq.com/mqtt/mqtt-essentials/", desc: "Clear series explaining MQTT, the standard for IoT sensor messaging." },
            { title: "Eclipse Mosquitto", url: "https://mosquitto.org", desc: "Free open-source MQTT broker." },
            { title: "opcua-asyncio (Python OPC UA)", url: "https://github.com/FreeOpcUa/opcua-asyncio", desc: "Read data from PLCs and industrial machines with Python." },
            { title: "Node-RED docs", url: "https://nodered.org/docs/", desc: "Visual tool to connect PLCs, sensors and databases — popular in factories." },
          ],
        },
        {
          group: "Storage & dashboards",
          items: [
            { title: "Grafana tutorials", url: "https://grafana.com/tutorials/", desc: "Build live dashboards and alerts." },
            { title: "InfluxDB docs", url: "https://docs.influxdata.com", desc: "Time-series database built for sensor data." },
          ],
        },
        {
          group: "Hardware",
          items: [
            { title: "Arduino docs", url: "https://docs.arduino.cc", desc: "Microcontroller basics, sensors and communication." },
            { title: "Espressif ESP32 docs", url: "https://docs.espressif.com", desc: "Cheap Wi-Fi microcontroller — ideal for wireless sensor nodes." },
          ],
        },
      ],
    },
    {
      id: "engauto",
      title: "Engineering Automation",
      icon: "⌬",
      tagline: "Scripts that generate CAD variants, automate calculations, or turn drawings into quotes and BOMs.",
      customers: "Engineering firms, machine builders, sheet-metal and CNC shops",
      problem: "Engineers spend hours on repetitive CAD variants, calculations and quoting.",
      solution: "Parametric CAD scripts, calculation tools, and AI that reads drawings/specs to produce quotes or bills of materials.",
      stack: ["Python", "CAD APIs (SolidWorks, Fusion 360, FreeCAD, CadQuery)", "AI model API for document/drawing extraction", "Excel / ERP export"],
      hardware: "None",
      pricing: "Per-tool fixed price; later a quoting SaaS",
      mvp: [
        "Pick one repetitive task (e.g. bracket variants or sheet-metal quotes)",
        "Parametric CAD generator demo",
        "Drawing/spec → BOM extraction demo",
        "Quote calculator prototype",
        "Time-saved measurement for case study",
      ],

      lifecycle: INDUSTRIAL_LIFECYCLE,
      examples: [
        {
          title: "Instant quotes for a sheet-metal / laser-cutting shop",
          client: "Example: a sheet-metal, laser-cutting or CNC shop that receives dozens of quote requests per week by email with DXF/STEP files and PDF drawings.",
          problem: "An experienced estimator spends 30–60 minutes per quote measuring cut lengths, counting bends and looking up material prices. Quotes are slow, so customers go to faster competitors.",
          solution: "A web tool where the estimator (and later customers) uploads a DXF or STEP file. The tool calculates cut length, area, pierce points, bends and material use, applies the shop's own rates, and produces a quote PDF in minutes. AI reads the request email/PDF to extract quantity, material, thickness and finish.",
          how: [
            "Collect 20–50 old quotes with their drawings — these define the shop's pricing logic and are your test set.",
            "Parse geometry: ezdxf for 2D DXF (cut length, holes, outer contour), CadQuery/OCP for 3D STEP (volume, bends, bounding box).",
            "Build the pricing model with the estimator: material cost + machine time (cut length ÷ speed per material/thickness) + pierces + bends + setup + margin.",
            "Use the AI model to extract quantity, material, thickness and deadline from the customer's email or PDF drawing.",
            "Compare calculated prices with the old quotes; tune until within an agreed margin (e.g. ±10%).",
            "Estimator reviews and approves before anything is sent.",
          ],
          stack: ["Python", "ezdxf", "CadQuery / OCP (STEP files)", "Streamlit or Next.js for the web tool", "AI model API (email/PDF extraction)", "PDF generation"],
          deliverables: ["Quote tool with the shop's own rates", "Validation report vs. historical quotes", "Quote PDF template", "Manual for updating prices"],
          timeline: "4–8 weeks",
          price: "Starter estimate: €2,000–6,000 + €100–250/month licence/support. Strong candidate to grow into a SaaS product for many shops.",
          risks: [
            "Wrong price = lost money or lost customer → estimator approves every quote; validate against historical quotes first.",
            "Messy or incomplete drawings → flag them for manual handling instead of guessing.",
            "Customer drawings are confidential → keep data on the client's server or in the EU; NDA with the client.",
          ],
        },
        {
          title: "Parametric product configurator (CAD variants + BOM)",
          client: "Example: a machine builder making conveyors, frames, platforms or enclosures that are always 'the same, but a different size'.",
          problem: "Engineers redraw almost identical designs for every order — changing lengths, adjusting parts lists, updating drawings. Days of repetitive work per order, and copy mistakes.",
          solution: "A configurator where sales or engineering enters parameters (length, width, load, options). A script generates the 3D model, production drawings and bill of materials automatically, exported to Excel or the ERP system.",
          how: [
            "Pick one product family with the client's engineers; capture the design rules (e.g. 'add a support leg every 1.5 m', 'profile size depends on load').",
            "Rebuild the product as a parametric script — in the client's CAD (SolidWorks / Inventor / Fusion API) or in CadQuery/build123d for a CAD-independent version.",
            "Generate the BOM with part numbers and quantities; export to Excel or the ERP's import format.",
            "Optional: AI turns a customer's written request into configuration parameters.",
            "Engineer checks each generated design before production.",
          ],
          stack: ["Python", "SolidWorks / Inventor / Fusion API or CadQuery / build123d", "openpyxl (Excel)", "Simple web form", "Optional AI model API"],
          deliverables: ["Configurator for one product family", "Automatic model + drawing + BOM generation", "Documentation of design rules", "Guide to add new options"],
          timeline: "4–10 weeks depending on product complexity",
          price: "Starter estimate: €3,000–10,000 per product family + support. Pitch it in engineering hours saved per order.",
          risks: [
            "Structural safety → design rules come from the client's engineers; they approve and remain responsible for every design.",
            "CAD licences and versions → develop on the client's licence or agree on a CAD-independent tool.",
            "IP ownership → contract states who owns the configurator code and design rules.",
          ],
        },
      ],
      resources: [
        {
          group: "CAD as code",
          items: [
            { title: "CadQuery docs", url: "https://cadquery.readthedocs.io", desc: "Free Python library for parametric 3D CAD; exports STEP/STL." },
            { title: "build123d docs", url: "https://build123d.readthedocs.io", desc: "Modern Python CAD library built on the same kernel as CadQuery." },
            { title: "FreeCAD Python scripting", url: "https://wiki.freecad.org/Power_users_hub", desc: "Automate the free FreeCAD program with Python." },
            { title: "Onshape developer docs", url: "https://onshape-public.github.io/docs/", desc: "API and FeatureScript for the cloud CAD (free for students)." },
          ],
        },
        {
          group: "Commercial CAD APIs",
          items: [
            { title: "SolidWorks help (API section)", url: "https://help.solidworks.com", desc: "Automate SolidWorks with VBA/C#/Python — what many Brainport machine builders use." },
            { title: "Autodesk Platform Services", url: "https://aps.autodesk.com", desc: "APIs for Fusion, Inventor and Autodesk cloud data." },
          ],
        },
        {
          group: "Drawings, files & data",
          items: [
            { title: "ezdxf docs", url: "https://ezdxf.readthedocs.io", desc: "Read/write DXF files — calculate cut lengths and contours for quoting." },
            { title: "openpyxl docs", url: "https://openpyxl.readthedocs.io", desc: "Generate Excel BOMs and quote sheets from Python." },
            { title: "Claude cookbook", url: "https://github.com/anthropics/claude-cookbooks", desc: "Recipes for extracting structured data from PDFs and emails." },
          ],
        },
        {
          group: "Quick internal tools",
          items: [
            { title: "Streamlit docs", url: "https://docs.streamlit.io", desc: "Turn a Python script into a web tool in an afternoon — perfect for configurators and quote tools." },
          ],
        },
      ],
    },
    {
      id: "testdocs",
      title: "Test & Documentation Automation",
      icon: "☰",
      tagline: "Generate test scripts, manuals and technical documents for machine shops.",
      customers: "Machine builders, suppliers needing CE documentation and manuals",
      problem: "Manuals, test procedures and documentation are tedious and always out of date.",
      solution: "AI-assisted generation of manuals, test procedures and technical docs from CAD data, specs and engineer notes.",
      stack: ["AI model API", "Python", "Document templates (Word/PDF)", "Simple web app"],
      hardware: "None",
      pricing: "Per-document package or monthly subscription",
      mvp: [
        "Collect example manual / test procedure",
        "Template + generation pipeline",
        "Review workflow (engineer approves output)",
        "Export to Word/PDF",
        "Pilot with one machine builder",
      ],

      lifecycle: INDUSTRIAL_LIFECYCLE,
      examples: [
        {
          title: "Machine manual generator",
          client: "Example: a machine builder that ships custom or semi-custom machines and must deliver a user manual with every machine — often in several languages.",
          problem: "Writing and updating manuals takes engineers days per machine. Manuals are copied from old projects, contain outdated information, and translations are expensive.",
          solution: "A tool that collects the machine's data (BOM, component datasheets, risk assessment, engineer notes, photos) and drafts a structured manual — safety, installation, operation, maintenance, troubleshooting — in a consistent template and multiple languages. An engineer reviews and approves every section.",
          how: [
            "Collect 2–3 existing manuals and the client's template; define the standard chapter structure with them.",
            "Gather inputs per machine: BOM export, component manuals (PDF), risk-assessment items, maintenance intervals, engineer notes.",
            "AI drafts each chapter from those inputs only, citing which source each statement came from.",
            "Reusable text blocks for standard components (same motor = same maintenance text every time).",
            "Engineer review workflow: approve / edit per section; track what changed.",
            "Export to Word/PDF in the client's house style; generate translations for review.",
          ],
          stack: ["AI model API", "Python", "python-docx / Pandoc for Word & PDF", "Simple web review interface", "Template library"],
          deliverables: ["Manual generation tool", "Client-branded template", "Library of reusable component sections", "Review & approval workflow"],
          timeline: "4–8 weeks",
          price: "Starter estimate: €2,500–7,000 setup + per-manual fee or €100–300/month.",
          risks: [
            "Safety-critical content → legal responsibility for the manual stays with the manufacturer; mandatory engineer review of every section, AI only drafts.",
            "Regulations (EU Machinery Directive → Machinery Regulation 2023/1230) → the client's compliance person defines required content; we don't give legal advice.",
            "Translation errors in safety text → native-speaker or professional review for safety chapters.",
          ],
        },
        {
          title: "Automated test bench & test reports",
          client: "Example: a mechatronics or electronics supplier that tests every product (motors, sensors, PCBs, modules) before shipping, using manual measurements and Excel sheets.",
          problem: "Operators manually run measurements, type values into Excel and make PDF reports. Slow, error-prone, and hard to trace when a customer complains.",
          solution: "Python scripts control the test equipment (power supply, multimeter, oscilloscope, motor controller), run the test sequence automatically, judge pass/fail against limits, and generate a test report per serial number. AI helps turn product specifications into draft test procedures.",
          how: [
            "List current test steps and limits from the client's test procedure.",
            "Connect instruments via USB/LAN using PyVISA (SCPI commands) or the device's own interface.",
            "Write the test sequence with pytest or Robot Framework: setup, measure, compare to limits, teardown.",
            "Simple operator screen: scan serial number → press start → green/red result.",
            "Auto-generate a PDF test report and store results in a database for traceability and statistics.",
            "Use AI to draft new test procedures from product specs; the test engineer reviews and approves.",
          ],
          stack: ["Python", "PyVISA", "pytest or Robot Framework", "SQLite / PostgreSQL", "PDF report generation", "AI model API (draft procedures)"],
          deliverables: ["Automated test sequence for one product", "Operator interface", "Test report per serial number", "Results database + statistics dashboard"],
          timeline: "3–6 weeks",
          price: "Starter estimate: €2,000–6,000 per product test + support for new products.",
          risks: [
            "Electrical safety and damaging the client's equipment → work with their test engineer, current limits on power supplies, start with simulated instruments.",
            "Instrument compatibility → check models and interfaces during the feasibility phase.",
          ],
        },
      ],
      resources: [
        {
          group: "Regulations & standards",
          items: [
            { title: "Machinery Regulation (EU) 2023/1230", url: "https://eur-lex.europa.eu/eli/reg/2023/1230/oj", desc: "The EU rules defining what machine manuals and documentation must contain." },
            { title: "CE marking — business.gov.nl", url: "https://business.gov.nl/regulation/ce-marking/", desc: "Dutch government guide to CE marking and technical documentation." },
            { title: "NEN (Dutch standards body)", url: "https://www.nen.nl", desc: "Where to find standards for manuals and machine safety (paid; TU/e library may provide access)." },
          ],
        },
        {
          group: "Technical writing",
          items: [
            { title: "Google technical writing courses", url: "https://developers.google.com/tech-writing", desc: "Free, short courses on writing clear technical documentation." },
            { title: "Write the Docs guide", url: "https://www.writethedocs.org/guide/", desc: "Community guide to documentation practices and docs-as-code." },
          ],
        },
        {
          group: "Document generation",
          items: [
            { title: "python-docx", url: "https://python-docx.readthedocs.io", desc: "Generate Word documents in the client's template from Python." },
            { title: "Pandoc", url: "https://pandoc.org", desc: "Convert between Markdown, Word, PDF and HTML." },
            { title: "MkDocs", url: "https://www.mkdocs.org", desc: "Docs-as-code: manuals as a searchable website." },
            { title: "Claude docs (Anthropic)", url: "https://docs.claude.com", desc: "Prompting for long, structured documents and working with PDFs." },
          ],
        },
        {
          group: "Test automation",
          items: [
            { title: "PyVISA docs", url: "https://pyvisa.readthedocs.io", desc: "Control lab instruments (power supplies, scopes, multimeters) from Python." },
            { title: "pytest docs", url: "https://docs.pytest.org", desc: "Python's standard test framework — also works for hardware test sequences." },
            { title: "Robot Framework", url: "https://robotframework.org", desc: "Keyword-driven test automation used in industry; readable test scripts." },
          ],
        },
      ],
    },
    {
      id: "general",
      title: "General AI Services",
      icon: "✦",
      tagline: "Chatbots, automations and quick websites/MVPs — backup offers for cash flow.",
      customers: "Local businesses, shops, small startups",
      problem: "Small businesses want AI and a web presence but have no developers.",
      solution: "Website chatbots, email/invoice automations, quick websites and MVPs built fast with AI tools.",
      stack: ["Next.js / plain HTML", "Vercel / Netlify", "Supabase", "AI model API", "Automation tools (n8n, Zapier)"],
      hardware: "None",
      pricing: "Fixed price per project, 30–50% upfront",
      mvp: [
        "Build one example chatbot",
        "Build one email/invoice automation demo",
        "Template website for local businesses",
        "Price list",
        "Contact 10 local businesses",
      ],

      // ---- "Example projects" tab ----
      lifecycle: [
        { title: "1 · Discovery call (30 min)", text: "Understand the client's business, the problem, what tools they already use, and what success looks like. Ask about volumes (how many emails, questions, invoices per week)." },
        { title: "2 · Proposal", text: "One page: fixed scope, what's included and excluded, timeline, price, 30–50% upfront, and an optional monthly maintenance fee." },
        { title: "3 · Build", text: "Build in small steps. Show a working prototype within the first week so the client can react early." },
        { title: "4 · Test with real data", text: "Run it on real examples from the client. Measure accuracy and fix edge cases before going live." },
        { title: "5 · Handover", text: "Go live, write a short manual, train the client's staff, collect the final payment." },
        { title: "6 · Maintenance & testimonial", text: "Offer a monthly retainer (monitoring, updates, API costs). Ask for a testimonial and permission to show it in the portfolio." },
      ],
      examples: [
        {
          title: "Website chatbot for a local business",
          client: "Example: a bike repair shop, dental clinic or language school in Eindhoven that gets the same questions every day by phone and email.",
          problem: "Staff spend hours answering questions about opening hours, prices, booking, and services. Customers outside opening hours get no answer.",
          solution: "A chat widget on their website that answers questions using only the business's own information (website text, price list, FAQ). When it can't answer or the customer wants to book, it hands over to a human via email or a booking link.",
          how: [
            "Collect the business's information: website pages, FAQ, price lists, policies.",
            "Store it as a knowledge base the AI searches before answering (this pattern is called RAG — retrieval-augmented generation).",
            "Small backend (e.g. a serverless function on Vercel) receives the question, finds relevant knowledge, calls the AI model API with strict instructions: answer only from this information, in Dutch or English, otherwise hand over.",
            "Chat widget: a small script tag the client pastes into their website.",
            "Log conversations (anonymised) so the client sees what customers ask — often valuable insight for them.",
          ],
          stack: ["AI model API", "Vercel serverless functions", "Supabase (knowledge base + logs)", "Embeddable JS widget"],
          deliverables: ["Chat widget live on the website", "Admin page or spreadsheet to update the knowledge", "Monthly report of top questions", "Short manual"],
          timeline: "1–2 weeks",
          price: "Starter estimate: €500–1,500 setup + €30–100/month (covers hosting, API costs, updates). Adjust once you know your speed.",
          risks: [
            "AI inventing answers → restrict to the knowledge base, test with 50+ real questions, always offer a human handover.",
            "Privacy (GDPR / AVG) → don't collect personal data you don't need, tell users they are talking to an AI, check the AI provider's data terms, sign a data processing agreement with the client if you handle customer data.",
            "API costs spike → rate limits and spending caps per client.",
          ],
        },
        {
          title: "Invoice & email automation",
          client: "Example: a small webshop, installation company or bookkeeping firm that processes dozens of supplier invoices or order emails per week by hand.",
          problem: "Someone manually opens each PDF invoice, types supplier, date, amount, VAT and invoice number into a spreadsheet or accounting software. Slow and error-prone.",
          solution: "Invoices sent to a dedicated mailbox are picked up automatically, the AI extracts the fields, the data lands in a spreadsheet or the accounting software, and anything uncertain is flagged for a human to check.",
          how: [
            "Set up a workflow tool (n8n self-hosted is free; Zapier/Make are easier but paid) that watches the mailbox.",
            "For each PDF: extract text, send it to the AI model with a fixed output format (supplier, date, amount, VAT, IBAN, invoice number).",
            "Validate: do amounts add up, is the VAT rate valid, is it a duplicate?",
            "Write to Google Sheets / Excel, or to the accounting software via its API (common Dutch ones: Exact Online, Moneybird, e-Boekhouden).",
            "Send low-confidence invoices to a 'please check' list instead of booking them automatically.",
          ],
          stack: ["n8n / Make / Zapier", "AI model API (document extraction)", "Google Sheets or accounting software API", "Email (IMAP / Gmail / Outlook)"],
          deliverables: ["Running automation", "Review list for uncertain items", "Dashboard of processed invoices", "Manual + handover call"],
          timeline: "1–3 weeks",
          price: "Starter estimate: €750–2,500 setup + optional €50–150/month maintenance. Pitch it as hours saved per month.",
          risks: [
            "Wrong amounts booked → human review step for anything uncertain; never auto-pay.",
            "Financial data is sensitive → client's permission, minimal data retention, check AI provider data terms.",
            "Accounting API changes → include maintenance in the retainer.",
          ],
        },
        {
          title: "Quick website or MVP for a small business / startup",
          client: "Example: a new local business with no website, or a fellow student startup that needs a working prototype to show investors or test with users.",
          problem: "They need something online fast and cheap, but agencies charge thousands and take months.",
          solution: "Use AI coding tools to build a clean website or a simple web app (forms, logins, database, dashboard) in days instead of weeks.",
          how: [
            "Agree on 3–5 must-have pages or features — nothing more in version 1.",
            "Build with a modern framework (e.g. Next.js) and host on Vercel/Netlify free tier.",
            "Add Supabase if users need accounts or data storage.",
            "Optional AI feature: a smart search, a form that summarises requests, or a content generator.",
            "Hand over the code in the client's own GitHub account and hosting so they're never locked in.",
          ],
          stack: ["Next.js or plain HTML/CSS", "Vercel / Netlify", "Supabase", "AI coding assistant", "Optional AI model API"],
          deliverables: ["Live website / app on the client's domain", "Source code in client's GitHub", "Basic SEO + analytics", "Handover call"],
          timeline: "3 days – 3 weeks",
          price: "Starter estimate: €300–800 simple website, €1,000–4,000 MVP web app. Hosting usually free at this scale.",
          risks: [
            "Scope creep → write the feature list into the proposal; extras are quoted separately.",
            "Client expects ongoing free support → offer a paid maintenance package up front.",
          ],
        },
      ],

      // ---- "Learning resources" tab ----
      resources: [
        {
          group: "AI models & APIs",
          items: [
            { title: "Claude docs (Anthropic)", url: "https://docs.claude.com", desc: "API reference, prompt engineering guide, tool use, and RAG patterns." },
            { title: "Anthropic courses (GitHub)", url: "https://github.com/anthropics/courses", desc: "Free hands-on notebooks: API fundamentals, prompt engineering, tool use." },
            { title: "Claude cookbook", url: "https://github.com/anthropics/claude-cookbooks", desc: "Ready-made code recipes: RAG, PDF extraction, classification, agents." },
            { title: "OpenAI API docs", url: "https://platform.openai.com/docs", desc: "Alternative provider — useful to compare models and pricing." },
            { title: "DeepLearning.AI short courses", url: "https://www.deeplearning.ai/short-courses/", desc: "Free 1–2 hour courses on RAG, agents, prompt engineering." },
          ],
        },
        {
          group: "Chatbots & RAG",
          items: [
            { title: "Hugging Face Learn", url: "https://huggingface.co/learn", desc: "Free courses on NLP, embeddings and open-source models." },
            { title: "LangChain docs", url: "https://python.langchain.com", desc: "Framework for RAG chatbots — good tutorials even if you don't use the framework." },
            { title: "LlamaIndex docs", url: "https://docs.llamaindex.ai", desc: "Framework focused on connecting AI to documents and data." },
            { title: "Supabase vector / AI docs", url: "https://supabase.com/docs/guides/ai", desc: "Store embeddings for a knowledge base in the free Supabase tier." },
          ],
        },
        {
          group: "Automation",
          items: [
            { title: "n8n docs & courses", url: "https://docs.n8n.io", desc: "Open-source workflow automation — free to self-host. Has beginner and advanced courses." },
            { title: "Make (Integromat) academy", url: "https://academy.make.com", desc: "Visual automation tool with a free tier and free courses." },
            { title: "Zapier learn", url: "https://zapier.com/learn", desc: "Guides on automating business processes — good for client ideas." },
          ],
        },
        {
          group: "Web development",
          items: [
            { title: "MDN Learn web development", url: "https://developer.mozilla.org/en-US/docs/Learn", desc: "The reference for HTML, CSS and JavaScript fundamentals." },
            { title: "The Odin Project", url: "https://www.theodinproject.com", desc: "Free full-stack web curriculum, project-based." },
            { title: "Next.js Learn", url: "https://nextjs.org/learn", desc: "Official step-by-step course building a full app." },
            { title: "Supabase docs", url: "https://supabase.com/docs", desc: "Database, auth and storage for MVPs." },
            { title: "freeCodeCamp", url: "https://www.freecodecamp.org", desc: "Free certifications in web dev, Python and more." },
          ],
        },
        {
          group: "Python & machine learning",
          items: [
            { title: "CS50's Introduction to Programming with Python", url: "https://cs50.harvard.edu/python/", desc: "Free Harvard course — solid Python foundation." },
            { title: "Official Python tutorial", url: "https://docs.python.org/3/tutorial/", desc: "Concise reference tutorial." },
            { title: "fast.ai Practical Deep Learning", url: "https://course.fast.ai", desc: "Free, practical ML course — also great for the vision project." },
          ],
        },
        {
          group: "Business, sales & legal",
          items: [
            { title: "YC Startup School", url: "https://www.startupschool.org", desc: "Free startup course from Y Combinator." },
            { title: "YC Startup Library", url: "https://www.ycombinator.com/library", desc: "Essays and videos on finding customers, pricing, and founders." },
            { title: "The Mom Test (book, Rob Fitzpatrick)", url: "https://www.momtestbook.com", desc: "How to talk to customers and find out what they really need. Short, essential." },
            { title: "KVK — starting a business", url: "https://www.kvk.nl/en/starting/", desc: "Registration, legal forms and starter webinars in the Netherlands." },
            { title: "Autoriteit Persoonsgegevens", url: "https://autoriteitpersoonsgegevens.nl/en", desc: "Dutch data protection authority — GDPR/AVG rules when handling client data." },
          ],
        },
      ],
    },
  ],

  statuses: ["Idea", "Researching", "Building demo", "Pitching", "Active client", "Paused"],
};
