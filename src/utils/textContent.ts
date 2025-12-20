export const welcomeMessage = `::::    ::: ::::::::::: ::::::::  :::    ::: ::::::::  :::    ::: :::::::::: :::        :::        
:+:+:   :+:     :+:    :+:    :+: :+:   :+: :+:    :+: :+:    :+: :+:        :+:        :+:        
:+:+:+  +:+     +:+    +:+        +:+  +:+  +:+        +:+    +:+ +:+        +:+        +:+        
+#+ +:+ +#+     +#+    +#+        +#++:++   +#++:++#++ +#++:++#++ +#++:++#   +#+        +#+        
+#+  +#+#+#     +#+    +#+        +#+  +#+         +#+ +#+    +#+ +#+        +#+        +#+        
#+#   #+#+#     #+#    #+#    #+# #+#   #+# #+#    #+# #+#    #+# #+#        #+#        #+#        
###    #### ########### ########  ###    ### ########  ###    ### ########## ########## ########## 

Welcome to Nickshell! My personal website(terminal)!
Type (or click) \`help\` to get started and explore my work.`;

export const helpText = `
Uh oh... how did you get here? I hope this is just Nick accessing this terminal!
In any case, here's a list of commands you can use:

AVAILABLE COMMANDS
📁 Navigation:
  \`ls\`        - List files and directories
  \`cd <dir>\`  - Change directory (try \`cd projects\` or \`cd about-me\`)
  \`pwd\`       - Show current directory
  \`cd ..\`     - Go back one directory

📖 Reading Files:
  \`cat <file>\` - Display file contents
  \`open <file>\` - Open files 
  \`./<file>\` - Execute a file (try \`./mystery\`)

🧹 Utilities:
  \`clear\`     - Clear terminal screen
  \`help\`      - Show this help message

💡 Tips:
• Try clicking on highlighted \`commands\` in the output!
• Use Tab for auto-completion
• Use ↑/↓ for command history
• Start with \`ls\` to see what's available

Ready to explore? Try: \`ls\` or \`cat about-me.txt\``;

export const aboutMeContent = `Hey there! 👋
I'm Nick, a Cybersecurity student at Northeastern University, Graduating in May 2027!
<img src="${import.meta.env.BASE_URL}headshot.png" alt="Nick's Headshot" style="max-width: 200px; border-radius: 10px; margin: 10px 0;" />
🎓 B.S. Cybersecurity | Minor: Law & Public Policy | GPA: 3.70 | Dean's List

I am passionate about offensive and defensive security, software development, and compliance, with experience in all three!
I love teaching, building, reading philosophy, playing guitar, snowboarding, and ping pong!

💻 Languages: Java, JavaScript, TypeScript, C, Python, SQL, Go, Swift
🛡️ Security: BurpSuite, MetaSploit, IDA Pro, WireShark, NMap, PowerBI, Splunk, Aravo, Archer GRC
🚀 Tools/Frameworks: React, NestJS, NextJS, AWS, Supabase, PostgreSQL, MongoDB

🎯 Seeking Summer 2026 & Fall 2026 opportunities!
🔍 Feel free to reach out here!
<a href="mailto:chen.nich@northeastern.edu" style="text-decoration: none; margin: 0 0px; color: #60a5fa;">📧 Email</a><a href="https://www.linkedin.com/in/nckchen/" style="text-decoration: none; margin: 0 8px; color: #0077b5;">💼 LinkedIn</a><a href="https://github.com/chnnick" style="text-decoration: none; margin: 0 0px; color: #7c3aed;">🐙 GitHub</a>`;

export const experienceContent: Record<string, string> = {
  'Liberty_Mutual_Insurance.txt': `Cybersecurity Audit Co-Op @ Liberty Mutual Insurance
📅 July 2025 - Dec 2025 | 📍 Boston, MA
<img src="${import.meta.env.BASE_URL}libertylogo.png" alt="Liberty Mutual Insurance Logo" style="max-width: 200px; border-radius: 10px; margin: 10px 0;" />
🛡️ Responsibilities:
• Audit 17 enterprise cybersecurity policies across 4 SBUs for compliance
• Evaluate SDLC/DevOps security controls, and check IAM procedures using PowerBI, Aravo, Archer GRC
• Led Continuous Improvement initiatives, developed multiple AI agents for enhancing audit efficiency
• Updated 5+ onboarding IAM procedures for future new-hires

🎯 Key Areas: Cybersecurity Policy, Application Security, Change Management, 
Backup/DR, MFA, Third-Party Vendor Risk, Secrets Management

🛠️ Tools: PowerBI, Aravo, Archer GRC, AWS, Azure`,

  'Code4Community.txt': `Full Stack Software Engineer @ Code4Community
📅 May 2025 - Present | 📍 Boston, MA
<img src="${import.meta.env.BASE_URL}c4clogo.jpg" alt="Code4Community Logo" style="max-width: 200px; border-radius: 10px; margin: 10px 0;" />
🚀 Key Work:
• Built NestJS/PostgreSQL/TypeORM backend with TypeScript/React frontend
• Developed recruitment portal for 70+ members across 3+ subteams
• Led TypeScript/React workshop for 80+ underclassmen
• Built backend for 9-week project-based curriculum

🛠️ Tech Stack: NestJS, PostgreSQL, TypeORM, Jest, TypeScript, React`,

  'FirstByte.txt': `President @ FirstByte
📅 April 2025 - Present | 📍 Boston, MA
<img src="${import.meta.env.BASE_URL}firstbytelogo.png" alt="FirstByte Logo" style="max-width: 200px; border-radius: 10px; margin: 10px 0;" />
🚀 Leadership:
• Lead 5 subteams, partnerships with 2 Boston youth organizations
• Increased potential partners by 200%, recruited 20+ new members
• Founded full-stack web dev curriculum for high school students
• Taught web development to 40+ students, presented at university hackathon

🌟 Previous Roles:
• React Team Mentor: Founded React curriculum with Supabase integration
• Web Developer: Rebuilt website using React, TypeScript, NextJS

🛠️ Focus: Teaching, Curriculum Development, Web Development, Leadership`
};

export const projectsContent = {
  'dream-store.txt': `💈 DreamStore - Online Barber Store/Gallery
📅 May 2025 | Full-stack E-commerce Platform | 🔗 [GitHub](https://github.com/chnnick/dreamstore)

📖 Description:
E-commerce platform with customer store and secure admin portal for barber operations.

🚀 Features:
• Stripe payment processing and checkout
• Supabase Auth-secured admin portal
• Persistent shopping cart with Zustand
• Real-time stock validation
• Secure image management

🛠️ Tech: React, TypeScript, NextJS, Supabase, Stripe API, Zustand`,

  'throwapin.txt': `📍 ThrowAPin - Digital Road Trip Planner
📅 February 2025 | 🔗 [throwapin.com](https://throwapin.com) | 🔗 [GitHub](https://github.com/NoHaxsJustAsian/throw-a-pin)
🏆 Honorable Mention for Best Overall Project at HackBeanPot

📖 Description:
Interactive road trip planner with 3D mapping and personalized itineraries.

🚀 Features:
• Interactive 3D mapping with Three.js
• Google Places & Directions API integration
• User authentication and saved trip planning via Supabase
• Geospatial data with Leaflet.js/GeoJSON

🛠️ Tech: NextJS, React, TypeScript, Three.js, Leaflet.js, Google APIs, Supabase
🏆 Won Honorable Mention against 100+ contestants at 36-hour hackathon (and won a mug!)`,

  'cipher-encryptor.txt': `🔐 Cipher Encryptor - Basic CLI Security Tool
📅 January 2025 | Python | 🔗 [GitHub](https://github.com/chnnick/cipher-maker)

📖 Description:
Command-line encryption tool with cryptanalysis capabilities for penetration testing.

🚀 Features:
• Vigenère and Caesar (ROT) cipher implementation
• Extended ASCII support with secure validation
• Brute-force attack capabilities for security testing
• Input validation and error handling

🛠️ Tech: Python, Cryptography, CLI Design
🎯 Use Cases: Security education, penetration testing, cipher analysis`,

  'mini-shell.txt': `🐚 Mini Shell in C - Northeastern Systems Project
📅 October 2024 | C, Linux

📖 Description:
Fully functional Linux shell with advanced process management and I/O capabilities.

🚀 Features:
• Built-in commands (cd, help, prev, source)
• I/O redirection and pipe implementation
• Process management with fork/exec
• Command parsing and tokenization
• Concurrent command execution

🛠️ Tech: C, Linux System Calls (fork, exec, pipe, dup2)
📚 Skills: Process management, memory management, system programming`, 

'scrambler.txt': `🔒 Scrambler - CSV/Excel Anonymization Tool
📅 October 2025 | Python, pandas, OpenPyXL, Faker, Colorama | 🔗 [GitHub](https://github.com/chnnick/scrambler)

📖 Description:
A Python tool for anonymizing sensitive data in CSV and Excel files while preserving data structure and relationships. Perfect for creating test datasets, protecting privacy, and preparing data for sharing.

🚀 Features:
• Anonymizes sensitive data across CSV/Excel and clipboard input while preserving data relationships via pandas
• Implemented auto-detection for 10+ sensitive data types (SSN, PII, financial) using regex patterns and Faker library
• User-first CLI tool with Colorama styling, seed reproducibility, JSON rule usage, OpenPyXL excel sheet building
• Smart data detection for email, phone, name, SSN, address, date, ID, and numeric data
• Consistent mapping with seed-based reproducible results
• Clipboard support for direct Excel/Google Sheets processing
• Custom JSON rules for override automatic detection

🛠️ Tech: Python, pandas, Faker, OpenPyXL, Colorama, regex patterns
📚 Skills: Data anonymization, privacy protection, CLI development, data processing`, 

};

