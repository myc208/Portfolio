/* ============================================================================
   CONTENT.JS. Everything on the site that you might want to change.

   This is the only file you need to open to edit the site. No code in here,
   just your words and your file names. Change something, save, refresh the
   page. That is the whole workflow.

   THREE RULES, and they are the only ones:

   1. Keep the quote marks. Every piece of text sits between ' or ` marks.
      Keep them, change what is inside.
   2. Keep the commas between items.
   3. If your text contains an apostrophe, use the backtick style:
         summary: `It's fine inside backticks.`
      Backticks are the key above Tab. They never fight with apostrophes.

   ADDING A PICTURE OR A CLIP, anywhere on the site:
      Put the file in  assets/img/   (pictures)  or  assets/gif/  (clips)
      Then reference it in a shots list:
         ['img', 'my-picture.webp',   'Caption under the picture']
         ['vid', 'my-clip.mp4',       'Caption under the clip']
      Every shots list can hold as many as you like. They become a gallery
      the visitor can click through.

      Big raw files? Run  tools/optimise-images.cmd  first and it shrinks
      whatever you dropped into the incoming folder. See EDITING.md.
   ========================================================================== */

window.SITE = {

/* ============================================================================
   YOU
   ========================================================================== */
identity: {
  name:      'Ming Yang',
  role:      'Applied Computing and Fintech',
  email:     'mychw208@gmail.com',
  resume:    'assets/MingYangCheow-Resume.pdf',
  linkedin:  'https://www.linkedin.com/in/myc208',
  github:    'https://github.com/myc208',
  instagram: 'https://www.instagram.com/_ap.cr_',
  footerLine: 'Applied Computing and Fintech, Singapore Institute of Technology. Open to graduate and internship roles.'
},

/* ============================================================================
   THE HERO. The words that ride over the scrolling video.
   Keep them short. They are read in a glance, not a sitting.
   `band` is which beat of the video it lands on, 1 to 4.
   ========================================================================== */
hero: {
  kicker:  '01 / Resolution',
  band1:   'I find what other people miss.',
  band2:   'Defects on a wafer. Phishing in an inbox. A jam three roads away.',
  band3:   'The signal was always there. Someone had to go down and look.',
  name:    'Ming Yang',
  subline: 'Applied Computing and Fintech at the Singapore Institute of Technology. I build the systems that make problems visible.',
  ctaWork: 'See the work',
  ctaMail: 'Email me'
},

/* ============================================================================
   01  THE PROOF STRIP
   Four numbers a recruiter sees before anything else.
   Set  accent: true  on ONE of them. That is the only red number on the page,
   and it stops being special if more than one has it.
   ========================================================================== */
proof: [
  { num: '270',    accent: true,
    label: `pre-arbitration cases a day, across VISA and Mastercard, on a bank's dispute desk.`,
    org: 'DBS Bank' },

  { num: '$250K',
    label: 'saved every month, by replacing the inspection software four machines were licensed for.',
    org: 'Micron Technology' },

  { num: '0.742',
    label: 'R squared forecasting a full day of city traffic, with a mean error of 4.68 km/h.',
    org: 'Traffic-AI' },

  { num: '18',
    label: 'projects built and documented, from neural networks to a card game I could not stop playing.',
    org: 'Three years' }
],
proofNote: 'Numbers first, because you are busy.',

/* ============================================================================
   02  ABOUT
   ========================================================================== */
about: {
  kicker:   '02 / The work',
  heading:  'Noise in. A signal you can act on, out.',
  lede:     'Three years of applied computing, specialising in fintech.',
  body: [
    `In practice that means I sit between the data and the person who has to decide something. At Micron that person was an engineer in Penang who needed to see which board failed and why. At DBS it was a checker who needed the non-compliant rows to light up before the case went out the door. On the traffic project it was a commuter who needed forty minutes of warning. The work is the same either way: find the thing, then make it impossible to miss.`
  ],
  portrait: 'portrait.jpg',
  tags: ['Python','TensorFlow','SQL','MongoDB','ElasticSearch','Flask','Plotly',
         'Tableau','Excel VBA','Docker','C#','Java','C','PHP','JavaScript','Cisco IOS']
},

/* ============================================================================
   03  EXPERIENCE
   Every role has the SAME shape, so they read as one set:
     when / role / org / logo / summary / win     -> what shows on the card
     detail: { intro, points, stack, quote, shots } -> what opens when clicked

   Newest first. Set  lead: true  on the most recent one for the badge.
   Everything inside detail is optional. A role with no detail block simply
   does not open, and the card still looks right.
   ========================================================================== */
experienceIntro: {
  kicker:  '03 / Experience',
  heading: 'Four rooms, one job.',
  lede:    `A bank's dispute desk, a semiconductor fab, a commando battalion, and a database team. Every one of them was the same exercise in finding the thing that mattered.`
},
experience: [
  {
    lead: true,
    when:    'May 2026 to Aug 2026',
    role:    'Chargeback Intern',
    org:     'DBS Bank, Singapore',
    logo:    'logo-dbs.png',
    // the one line that sits on the card
    summary: `Thirteen weeks inside a bank's dispute desk, working up to 270 pre-arbitration cases a day across VISA and Mastercard.`,
    // the single result, shown under the card in the accent
    win:     'Built the VBA tooling that pulls three card schemes into one reporting spreadsheet',
    // everything below appears only once the card is opened
    detail: {
      intro: [
        `Thirteen weeks on the Chargeback team, inside both the fraud and non-fraud dispute workflows. Up to 270 pre-arbitration cases a day, 170 VISA and 100 Mastercard, where a wrong entry or a missed window costs the bank or the customer real money.`,
        `The work runs under a maker-checker process, so every case I made was checked by someone else and every case I checked was made by someone else. That is the part that changes how you work: you write for the next person, not for yourself.`
      ],
      points: [
        ['Automation', 'Built Excel VBA macros and a file consolidator that pull Mastercard, VISA and AMEX case reporting into one flexible spreadsheet. The team noticed, and handed me the consolidator feature to build on top of it.'],
        ['Anomaly detection', 'Added formulas and conditional formatting that flag non-compliant rows automatically, V10 and PWC, so the maker-checker review catches them before a case goes out.'],
        ['Root cause', 'Worked the awkward dispute codes nobody wants: VISA ROL-3544 and 3545, Mastercard 4048, VISA 10.1 and 10.3, ROL 4577, and partial merchant refunds. Each one meant auditing transaction history and mismatched authentication data to stop a loss.'],
        ['Process mapping', 'Turned the VISA Dispute Management Guide into a high level activity diagram, then a 2D swimlane of the whole non-fraud cycle, split by stage and by platform.'],
        ['Validation', 'Ran user acceptance testing on the upgraded crediting and debiting platforms, including Hong Kong non-fraud test cases and the new regional integration.'],
        ['Handover', 'Wrote the master step by step guide covering every task I was given, plus recap notes on merchant refund types, so the next intern starts where I finished.']
      ],
      stack: ['Excel VBA','VROL','Mastercard','VISA','AMEX','Process mapping','UAT'],
      shots: []
    }
  },
  {
    when:    'May 2025 to Sep 2025',
    role:    'MOD SSD Defect Data Visualization Intern, Global',
    org:     'Micron Technology',
    logo:    'logo-micron.png',
    summary: 'Liaised with lead engineers and managers across manufacturing sites worldwide, and built the visualizations they all agreed they needed.',
    win:     'Visualizations for three inspection machines, saving about $250k a month in software subscriptions',
    detail: {
      intro: [
        `A two person project building defect visualization for three inspection machines: AOI, SPI and SAOI. We engaged engineers in Singapore, Penang and Xian to understand what they actually needed to see for root cause analysis and reporting.`,
        `It ran end to end: gathering data from sub-teams, iterative testing with the engineers, accuracy verification in Singapore, fine tuning, documentation, and handover to IT with detailed guides. A fourth machine was attempted, but the data retrieval was complex and delayed and the time ran out.`
      ],
      points: [
        ['AOI', 'Multi board panels with defect overlays laid over the real board image, filterable by line, recipe, lot and defect type.'],
        ['SPI', 'Solder paste heatmaps, with volume coloured against the low and high limits.'],
        ['SAOI', 'CAD matching with dual XML support, normalising component coordinates to a common origin.'],
        ['Scale', 'Wrote a setup guide so other manufacturing sites could stand the tools up themselves, with step by step instructions for configuring the data inputs.'],
        ['Housekeeping', 'Real time XML to CSV conversion, image resizing and compression so the front end stays fast, shift based logging, and scheduled cleanup so storage does not run away.']
      ],
      stack: ['Python','Flask','Plotly','Pandas','XML','CSV'],
      quote: {
        text: 'MingYang played the key role in developing real-time defect visualization tools for three manufacturing machines. Their visualizations allowed technicians to quickly identify defect patterns, enhancing decision-making.',
        who:  'Li Yan, Senior Manager, PDE CEM, Micron Singapore'
      },
      shots: [
        ['img','aoi_image.webp','AOI defect visualization'],
        ['img','spi_image.webp','SPI heatmap view'],
        ['img','saoi_image.webp','SAOI multi board panel']
      ]
    }
  },
  {
    when:    'Jun 2022 to Apr 2024',
    role:    'Commando Trooper',
    org:     'SAF 1st Commando Battalion',
    logo:    'logo-saf.png', logoTall: true,
    summary: 'Operated in small discreet teams, planning together and backbriefing until everyone could repeat the mission back.',
    win:     'Best operational company, and best combat unit 2025',
    detail: {
      intro: [
        `Two years in a commando battalion. Small teams, little information, and no room to be vague. Every mission started with team planning and ended with a backbrief, where each person repeats the plan and the execution profile back until it is clear that everyone holds the same picture.`,
        `It is the same discipline the rest of this page runs on. If the other person cannot repeat it back, it was not communicated, and on a dispute desk or a factory floor that costs exactly as much as it does anywhere else.`
      ],
      points: [
        ['Small teams', 'Discreet operations where the plan has to survive contact without anyone checking in.'],
        ['Backbrief', 'Every mission rehearsed out loud until the whole team could repeat the profile back.'],
        ['Under load', 'Two years of deciding on incomplete information with a clock running.']
      ],
      stack: ['Team planning','Backbrief','Reconnaissance'],
      shots: []
    }
  },
  {
    when:    'Sep 2021 to Feb 2022',
    role:    'Database Engineer Intern',
    org:     'AiDA Technologies',
    logo:    'logo-aida.png',
    summary: 'Tested and implemented new database software, and built the algorithm that flags sensitive words in communications.',
    win:     'ElasticSearch ran text search three times faster than the MSSQL it was tested against',
    detail: {
      intro: [
        `My job was to find out whether the ElasticStack was worth moving to. I stood the whole thing up in a Docker container, monitored it through Kibana, and ran it head to head against the existing MSSQL setup.`,
        `Text search came back three times faster. On the back of that I built the algorithm that flags sensitive words in communications, and took it through testing and user acceptance.`
      ],
      points: [
        ['The stack', 'Researched ElasticSearch, containerised it on Docker, and monitored status through Kibana.'],
        ['The algorithm', 'Implemented the sensitive word list and the flagging logic, then took it through UAT.'],
        ['The habit', 'Documented every test failure and its fix, and took part in daily standups, which is where most of the actual knowledge transfer happened.'],
        ['The result', 'Reduced data processing time on the new ecosystem through optimised algorithms.']
      ],
      stack: ['ElasticSearch','Docker','Kibana','Logstash','MSSQL'],
      shots: [['img','elasticsearch.webp','The ElasticStack setup']]
    }
  }
],

/* ============================================================================
   04  TESTIMONIALS
   `quote` is a list of paragraphs. Add as many people as you like.
   Set  pending: true  to hold a designed empty slot for one you are waiting on.
   `photo` is optional: a headshot of the person, from assets/img/.
   ========================================================================== */
testimonialsIntro: { kicker: '04 / What they said', heading: 'Not my words.' },
testimonials: [
  {
    quote: [
      'MingYang played the key role in developing real-time defect visualization tools for three manufacturing machines. Their visualizations allowed technicians to quickly identify defect patterns, enhancing decision-making.',
      'We wholeheartedly recommend MingYang for any role requiring technical expertise, teamwork, and a relentless drive for improvement.'
    ],
    who:  'Li Yan',
    role: 'Senior Manager, PDE CEM, Micron Singapore'
  },
  {
    pending: true,
    note: 'Reserved for the DBS Chargeback team. The testimonial is on its way, and it drops straight into this slot.',
    who:  'DBS Bank',
    role: 'Chargeback, Consumer Banking Operations'
  }
],

/* ============================================================================
   05  THE INSPECTION, the hold-to-scan moment
   ========================================================================== */
method: {
  kicker:  '05 / The method',
  heading: 'This is the whole job, in one button.',
  lede:    'Below is a board. Four of the parts on it are bad. Hold the button and watch the scan find them.',
  reveal: [
    'Four faults out of a hundred and eighty.',
    'A person doing this by eye takes about nine minutes a board.',
    'The system does it in under a second, and never gets bored.'
  ]
},

/* ============================================================================
   06  PROJECTS
   Add one by copying any block below and changing what is inside.
   The count in the heading and the All button work themselves out.

     cat     which filter it appears under: 'ml', 'data', 'systems', 'web'
     proves  the one line a recruiter reads first. What it PROVES, not what it is.
     img     the card picture, from assets/img/
     shots   the gallery inside the detail panel. Add as many as you like.
     pts     bullet points. ['Bold bit', 'the rest of the sentence']
   ========================================================================== */
projectsIntro: {
  kicker:  '06 / Projects',
  heading: 'and what each one proves.',   // the count is prepended automatically
  lede:    'Every card leads with what it proves, because that is the part that decides whether the rest is worth reading. Click any of them and the full detail opens right here.'
},
filters: [
  { cat: 'all',     label: 'All' },
  { cat: 'ml',      label: 'Machine learning' },
  { cat: 'data',    label: 'Data' },
  { cat: 'systems', label: 'Systems' },
  { cat: 'web',     label: 'Web & games' }
],
projects: [

{ id:'micron', cat:'data',
  title:'Defect Visualization Systems at Micron',
  proves:'Software that replaced software they were paying for',
  sum:'Three inspection machines, three visualization systems, built with engineers in three countries and handed to IT.',
  img:'aoi_image.webp',
  tags:['Python','Flask','Plotly','Pandas','XML'],
  ctx:[`A two person project building defect visualization for AOI, SPI and SAOI inspection machines. We talked to engineers in Singapore, Penang and Xian to find out what they actually needed to see for root cause analysis, then pulled data from their sub teams, tested with them, verified accuracy in Singapore, fine tuned, wrote the guides, and handed it to IT.`,
       `The systems read inspection data, convert XML to CSV in real time, generate interactive plots, resize and compress board images so the front end stays fast, and clean up old files on a schedule so storage does not run away.`],
  pts:[['AOI','multi board panels with defect overlays laid over the real board image, filterable by line, recipe, lot and defect type.'],
       ['SPI','solder paste heatmaps, with volume coloured against the low and high limits.'],
       ['SAOI','CAD matching with dual XML support, normalising component coordinates to a common origin.'],
       ['','Shift based logging, scheduled cleanup, and a full handover document so the team could run it without us.']],
  shots:[['img','aoi_image.webp','AOI defect visualization'],
         ['img','spi_image.webp','SPI heatmap view'],
         ['img','saoi_image.webp','SAOI multi board panel']] },

{ id:'traffic', cat:'ml',
  title:'Traffic-AI: Predictive Traffic Forecasting',
  proves:'0.742 R squared on real city traffic',
  sum:'A cloud system that fuses live traffic, weather and accident data to predict congestion before it forms.',
  img:'traffic_prediction.webp',
  tags:['Deep Learning','Graph Neural Networks','LSTM','XGBoost','Python'],
  ctx:[`I led model development. The system pulls live speed bands from LTA DataMall, joins them with weather and incident reports, and answers two different questions: how long will this specific trip take, and what does the whole city look like over the next 24 hours.`,
       `Getting there meant handling missing sensor values, stripping outliers caused by GPS drift, and building spatial and temporal features including historical congestion windows, holiday flags, and a road adjacency matrix for the graph models.`],
  pts:[['Point to point','compared GraphWaveNet, a custom Spatial-Temporal GNN, and a fine tuned pretrained STGCN. The graph approach caught the ripple effect, where a jam on one road spreads to the roads connected to it.'],
       ['City scale, 24 hours','tested Informer, Temporal Fusion Transformer and N-BEATS. A hybrid LSTM and XGBoost won.'],
       ['Result','R squared of 0.742, mean absolute error of 4.68 km/h, and fast enough to run inference on CPU.'],
       ['','The LSTM handles the sequence, the morning and evening peaks. XGBoost handles the flat features, weather and accidents and holidays. Splitting the job was what made it both accurate and cheap.']],
  shots:[['img','traffic_prediction.webp','Forecast output']] },

{ id:'hdb', cat:'data',
  title:'HDB Resale Market and Community Analytics',
  proves:'Picking two databases on purpose, not by habit',
  sum:'A platform pairing decades of Singapore resale records with a community discussion layer, on a hybrid SQL and NoSQL back end.',
  img:'hdb.webp',
  tags:['MySQL','MongoDB','ETL','Python','Geospatial'],
  ctx:[`Housing data and conversation data are not the same shape, so they did not go in the same database. Transaction records are rigid, need joins, and must never drift, so they live in MySQL. Comments and likes need high write throughput and a schema that can change, so they live in MongoDB.`,
       `Before any of that, an ETL pipeline in Python cleaned the raw records: merging inconsistent flat types like "3 ROOM" and "3-ROOM", normalising town names across decades, and flagging price per square foot outliers before they could skew the trends.`],
  pts:[['Why SQL for transactions','ACID compliance keeps the pricing data consistent, and joins across flats, towns and amenities are what the analytics run on.'],
       ['Why MongoDB for community','nested comments retrieve without expensive joins, and new features like badges or attachments ship without a migration.'],
       ['','Used the $inc operator for likes, so concurrent clicks stay accurate instead of racing each other.'],
       ['','Enriched listings with MRT station coordinates to compute a proximity score, turning convenience into a number you can sort on.'],
       ['','The price by town endpoint answers in 295ms across millions of records.']],
  shots:[['img','hdb.webp','Analytics platform']] },

{ id:'hnn', cat:'ml',
  title:'Hybrid Neural Network for Phishing Detection',
  proves:'12% more accuracy from redesigning the architecture',
  sum:'Convolutional layers and LSTM layers merged into one model, classifying email as phishing or legitimate.',
  img:'hybridmodel.webp',
  tags:['TensorFlow','Keras','CNN','LSTM','Python'],
  ctx:[`The question was whether a hybrid beats the usual suspects at spotting phishing email. I benchmarked against Naive Bayes, HGBoost, KNN and Random Forest.`,
       `The model runs two branches off one embedding layer. A convolutional branch picks up local patterns, the phrases and character runs that give phishing away. An LSTM branch reads the message as a sequence. The two branches merge into dense layers with dropout, then a single sigmoid output.`],
  pts:[['','Merged and cleaned several Kaggle datasets, which was most of the work.'],
       ['Architecture refinement','improved accuracy by 12%, by changing how the two branches connect rather than by adding parameters.'],
       ['','Systematically tuned learning rates, batch sizes and dropout instead of guessing.'],
       ['','The point of the hybrid: spatial patterns and temporal patterns are different signals, and one model can carry both.']],
  shots:[['img','hnn_new.webp','Hybrid architecture'],['img','hnn_result.webp','Training results']] },

{ id:'elastic', cat:'data',
  title:'Establishing an ElasticSearch Ecosystem',
  proves:'A 3x speedup, measured against the incumbent',
  sum:'Tested whether ElasticSearch could beat MSSQL for text search at AiDA, then built the flagging algorithm on top.',
  img:'elasticsearch.webp',
  tags:['ElasticSearch','Docker','Kibana','Logstash'],
  ctx:[`As a database engineer intern my job was to find out whether the ElasticStack was worth moving to. I stood the whole thing up on Docker, monitored it through Kibana, and ran it head to head against the existing MSSQL setup.`,
       `Text search came back three times faster. On the back of that I built the algorithm that flags sensitive words in communications, and took it through testing and user acceptance.`],
  pts:[['','Researched, containerised and monitored the stack end to end.'],
       ['','Implemented the sensitive word list and the flagging logic.'],
       ['','Ran the testing and UAT process, and documented the failures and the fixes.'],
       ['','Daily standups with the team, which is where most of the actual knowledge transfer happened.']],
  shots:[['img','elasticsearch.webp','ElasticStack setup']] },

{ id:'cnn', cat:'ml',
  title:'Convolutional Neural Network vs VGG16',
  proves:'Knowing when not to build it yourself',
  sum:'A self trained CNN benchmarked against VGG16, ResNet, InceptionV3 and MobileNet on food image classification.',
  img:'cnn.webp',
  tags:['Computer Vision','TensorFlow','Transfer Learning','Python'],
  ctx:[`I built a CNN from scratch and put it against four pretrained models on the same food classification task. The honest result is that my model lost.`,
       `VGG16 came in 15% more accurate, and converged faster despite being much larger, because the pretrained weights had already learned the general visual features mine was starting from zero on.`],
  pts:[['Self trained','smaller parameter count, faster to train, lower accuracy.'],
       ['VGG16','sixteen layers, pretrained on ImageNet, 15% higher accuracy.'],
       ['','The useful lesson was not how to build a CNN. It was learning to recognise the tasks where transfer learning wins before spending a week finding out.']],
  shots:[['img','cnn_self.webp','Self trained architecture'],
         ['img','cnn_pre.webp','VGG16 transfer learning'],
         ['img','cnn_result.webp','Accuracy comparison']] },

{ id:'rnn', cat:'ml',
  title:'Recurrent Neural Network for Text Generation',
  proves:'Sequence models, built and tuned end to end',
  sum:'An LSTM based model that learns from paragraphs of text and continues an incomplete sentence.',
  img:'rnn.webp',
  tags:['NLP','LSTM','TensorFlow','Python'],
  ctx:[`The model reads several paragraphs and learns to carry a sentence forward from a partial input, up to a set word count. It is the simplest possible demonstration of why order matters in language.`],
  pts:[['','Built the base LSTM architecture, then tuned layer sizes, dropout and learning parameters.'],
       ['','Evaluated against validation metrics and loss curves rather than by reading the output and hoping.'],
       ['','Refined it in increments, keeping the numbers that justified each change.']],
  shots:[['img','rnn.webp','Model output']] },

{ id:'storyboard', cat:'data',
  title:'Storyboard: Mapping of Visualizations',
  proves:'Making a set of charts tell one story',
  sum:'Multiple graphs in a single view, arranged so the sequence itself carries the argument.',
  img:'storyboard.webp',
  tags:['Tableau','Python','Jupyter','Storytelling'],
  ctx:[`Any single chart answers one question. A storyboard answers the question behind the question, by putting charts in an order that builds. This project was about choosing the right chart for each relationship, then choosing the right order for the charts.`],
  pts:[['','Explored the dataset first and picked the variables actually worth showing.'],
       ['','Matched chart type to data relationship rather than to preference.'],
       ['','Built visual hierarchy so the eye lands where the point is.'],
       ['','Sequenced the views so each one sets up the next.']],
  shots:[['vid','tableau.mp4','Interactive Tableau dashboard'],
         ['vid','jupyter.mp4','Python visualization in Jupyter']] },

{ id:'tableau', cat:'data',
  title:'Data Visualization and Analysis with Tableau',
  proves:'Choosing an encoding for a reason',
  sum:'Temporal, compositional and distributional views built to compare how different encodings change what a reader sees.',
  img:'tab.webp',
  tags:['Tableau','Python','Excel','Dashboards'],
  ctx:[`A working tour through the chart types, done to find out where each one actually earns its place: line and area for trends over time, pie and stacked bar for parts of a whole, histogram and box plot for distribution.`],
  pts:[['','Built interactive dashboards rather than static exports.'],
       ['','Tested how different visual encodings change interpretation of the same numbers.'],
       ['','Applied colour deliberately, for readability and emphasis, not decoration.']],
  shots:[['img','graph1.webp','Dashboard view'],['img','graph2.webp','Distribution analysis']] },

{ id:'excel', cat:'data',
  title:'Spreadsheet Engineering in Excel',
  proves:'Automating the boring part',
  sum:'Lookups, nested formulas and VBA macros built to cut manual filtering and calculation out of the loop.',
  img:'fse.webp',
  tags:['Excel','VBA','Automation'],
  ctx:[`Not glamorous, and used constantly. This was about learning where a spreadsheet stops being a table and starts being a small program: INDEX and MATCH instead of VLOOKUP, nested logic with statistics, and macros for anything repeated more than twice.`],
  pts:[['INDEX-MATCH','over VLOOKUP, for flexibility and speed on large sheets.'],
       ['','Nested formulas combining logical functions with statistical calculations.'],
       ['','VBA macros automating the repeated data processing steps.'],
       ['','Dashboards and storyboards inside the spreadsheet, so the analysis and the presentation live together.']],
  shots:[['vid','fse1.mp4','Data processing automation'],['vid','fse2.mp4','Interactive dashboard']] },

{ id:'gwent', cat:'web',
  title:'Online Gwent Card Game',
  proves:'Finishing something nobody assigned',
  sum:'A web remake of the Gwent mini game from The Witcher 3, rebuilt with a better interface, real card abilities and an AI opponent.',
  img:'gwent.webp',
  tags:['JavaScript','Game Development','UI/UX','Audio'],
  ctx:[`This one started as a personal obsession. I built on an open source implementation and pushed it toward the real thing: a cleaner interface, thematic music, and views and behaviours that match the in game experience closely enough that a Witcher player recognises it immediately.`,
       `The card logic is the interesting part. Spies place on the opponent battlefield and draw you two cards. Scorch burns the strongest unit on the board. Medics revive. Weather effects hit whole rows.`],
  pts:[['','Full card mechanics: spies, medics, weather, and row placement across melee, ranged and siege.'],
       ['','Turn based round logic, including passing and scoring rounds on total power.'],
       ['','An AI opponent that picks cards with some sense of strategy rather than at random.'],
       ['','Responsive layout, so it plays on a laptop or a phone.']],
  shots:[['img','gwentboard.webp','The board'],
         ['vid','gwent.mp4','Playing a round'],
         ['vid','gwentscorch.mp4','Scorch resolving']] },

{ id:'socket', cat:'systems',
  title:'Encrypted Client-Server Chat Application',
  proves:'Being straight about which parts AI wrote',
  sum:'A Python socket chat server with authentication, private and group messaging, AES encryption and spam detection.',
  img:'socketprg.webp',
  tags:['Python','Sockets','Threading','Encryption'],
  ctx:[`A group project building real time chat on raw sockets, with threading to handle multiple clients. Users authenticate, message everyone or one person, create and manage groups, and every message and every stored history entry is encrypted with Fernet.`,
       `ChatGPT generated the first pass of the code and the test cases, and that is documented in the report. I rewrote the error handling and the encryption, because the generated versions failed on both. Saying so is the point.`],
  pts:[['','Username validation against real rules: 3 to 15 characters, no spaces, reserved words blocked.'],
       ['','Broadcast and private messaging with sender identification.'],
       ['','Group creation, membership, messaging, leaving and deletion.'],
       ['','AES encryption on messages and on stored history, plus repetition based spam detection.'],
       ['','UML and sequence documentation, because a chat protocol is easier to argue about on paper.']],
  shots:[['img','socket_uml.webp','Class diagram'],['img','socket_sequence.webp','Message sequence']] },

{ id:'iot', cat:'systems',
  title:'IoT Plant Watering System',
  proves:'Hardware that has to work when nobody is watching',
  sum:'A Raspberry Pi irrigation system with soil sensors, a 3D printed dispensing tube, MQTT and a web dashboard.',
  img:'iot.webp',
  tags:['Raspberry Pi','Python','MQTT','SQLite','Sensors'],
  ctx:[`A group build combining a soil moisture sensor, a mini motor driving a valve, a reservoir with level monitoring, and a 3D printed tube designed to spread water evenly rather than dumping it in one spot.`,
       `Software runs on the Pi: reads the sensor over SPI, drives the servo through pigpio, publishes readings over MQTT, logs everything to SQLite through a queued worker thread so the sensor loop never blocks on the database.`],
  pts:[['','Automatic watering triggered by real moisture readings, not a timer.'],
       ['','Reservoir level detection with an empty warning on the dashboard.'],
       ['','Manual override from the web dashboard, plus configurable watering intervals.'],
       ['','SQLite logging of moisture and valve state, so the behaviour can be checked after the fact.'],
       ['','MQTT both ways: sensor data out, control commands in.']],
  shots:[['img','P1_37_Poster.webp','Project poster']] },

{ id:'network', cat:'systems',
  title:'Enterprise Network Design',
  proves:'Designing the whole thing before touching a switch',
  sum:'A campus network inside 103.30.215.0/24 with VLAN segmentation, OSPF routing, and a restricted admin room.',
  img:'ip.webp',
  tags:['Cisco Packet Tracer','VLAN','OSPF','Subnetting'],
  ctx:[`A group assignment designing a real campus network under real constraints. Block E2 holds a Network Lab and a Network Security Lab at 41 PCs each, plus personal devices on a Wi-Fi access point, plus an administration office of four computers and a network printer that only the admin office may reach.`,
       `Block E6 holds two labs of 25 and 21 machines with a dedicated lecturer PC in each, and a server room on its own trunk carrying a DNS server and a web server. Every device in the building still has to be able to ping every other device.`],
  pts:[['','Subnetted 103.30.215.0/24 with CIDR to fit each segment without wasting addresses.'],
       ['','VLAN segmentation isolating the labs, the admin office and the server room.'],
       ['','OSPF routing between segments, with trunking into the server room.'],
       ['','Validated in a Cisco Packet Tracer file, with a written justification for each decision.']],
  shots:[['img','ip.webp','Network topology']] },

{ id:'oop', cat:'web',
  title:'Movement and Physics for an OOP Game',
  proves:'Physics that feels right, not just correct',
  sum:'The movement system for a Java game: AI paths, player control with boundaries, gravity and sway.',
  img:'oop.webp',
  tags:['Java','LibGDX','OOP','Game Physics'],
  ctx:[`A group project split by responsibility, and mine was movement. That covered AI controlled entities, player input with boundary handling so nothing walks off the map, and the physics that make falling look like falling.`,
       `Everything moveable implements one iMoveable interface, so the game loop can move anything without knowing what it is.`],
  pts:[['','Gravity acceleration capped at a maximum speed, with different fall rates per material.'],
       ['','Oscillation and sway on light objects, because a leaf and a rock should not fall the same way.'],
       ['','Player movement with boundary clamping to prevent out of bounds errors.'],
       ['iMoveable','the interface giving polymorphic movement across every entity type.']],
  shots:[['img','oop.webp','Game view']] },

{ id:'web', cat:'web',
  title:'Medium-inspired Blog Platform',
  proves:'CRUD that does not hand you SQL injection',
  sum:'A PHP blog with post CRUD, ownership checks, live search, and an Azure hosted database.',
  img:'web.webp',
  tags:['PHP','MySQL','Azure','Bootstrap','AJAX'],
  ctx:[`A group build modelled on Medium, with tasks split by strength. Mine was post CRUD and the search bar on the logged in home page.`,
       `Every database call goes through prepared statements, ownership is verified before any update or delete, and the whole codebase passes PHP_CodeSniffer. The database runs on Azure so the client and server are genuinely separate.`],
  pts:[['','Create, read, update and delete with ownership verification on every write.'],
       ['','Prepared statements throughout, so a post title cannot become a query.'],
       ['','AJAX search returning results as you type, on a title index.'],
       ['','PHPCS clean, which mattered more than it sounds when five people are committing.']],
  shots:[['img','web.webp','The platform']] },

{ id:'csharp', cat:'systems',
  title:'Employee Management Application in C#',
  proves:'Class hierarchies that hold their shape',
  sum:'An employee system with full time, part time and sales staff, each calculating pay their own way.',
  img:'cscover.webp',
  tags:['C#','.NET','OOP','Visual Studio'],
  ctx:[`An abstract Employee base class implementing IComparable, with FullTime, PartTime and Sales subclasses overriding CalculatePay. Sorting by pay works across all three types without the sort knowing they are different, which is the whole point of the exercise.`],
  pts:[['','Abstract base class with an enforced CalculatePay override per employee type.'],
       ['','IComparable so a mixed list sorts by pay correctly.'],
       ['','Add, search by ID, remove by name, and sort, all with error handling that fails clearly.'],
       ['','Try and catch on every operation that touches user input, returning readable messages instead of stack traces.']],
  shots:[['img','cscover.webp','Application']] },

{ id:'grade', cat:'systems',
  title:'Student Grades Database in C',
  proves:'File I/O with no safety net underneath',
  sum:'A grades system in C, reading and writing a plain text file as its database, with a linked list in memory.',
  img:'grade.webp',
  tags:['C','File I/O','Linked Lists'],
  ctx:[`A team project with no database engine and no library doing the hard part. The file is the database. My share was reading the data in, displaying it, and saving it back out without corrupting anything.`,
       `The file gets created with default headers if it does not exist, parsed with error handling for corrupted rows, and rewritten completely on save so the formatting stays consistent.`],
  pts:[['','Database initialisation, creating the file with headers when it is missing.'],
       ['','Parsing with error handling, so one bad row does not take the program down.'],
       ['','Full rewrite on save, walking the linked list and keeping the format exact.'],
       ['','Coordinated file handling conventions across the team, which was the part that actually needed managing.']],
  shots:[['img','grade.webp','Program output']] }

],

/* ============================================================================
   07  STRAIGHT ANSWERS
   ========================================================================== */
faqIntro: { kicker: '07 / Straight answers', heading: 'The questions you are actually asking.' },
faq: [
  { q: 'Most of this is coursework. So what?',
    a: `Fair. So each project says what it proves, and the ones that ran inside a real company are marked. The Micron systems are in use. The AiDA stack replaced a live database. The DBS macros sit on a bank's dispute desk. The rest is where the skills came from, and I would rather show you the receipts than hide the coursework.` },

  { q: 'Have you shipped anything real people depend on?',
    a: `Yes, twice. Three defect visualization systems at Micron, built with engineers in three countries, tested on their boards, documented and handed to the IT team. And at DBS, VBA tooling the Chargeback team uses to report cases across three card schemes from one spreadsheet.` },

  { q: 'Why fintech?',
    a: `Because the stakes make the work honest. On a dispute desk a wrong row is not a bad chart, it is money leaving the bank or a customer left out of pocket. Thirteen weeks at DBS turned the specialisation on my transcript into something I have actually done, on VISA, Mastercard and AMEX cases, under a maker-checker process that does not forgive guessing.` },

  { q: 'Did AI write your code?',
    a: `On the chat application, yes, and it is written into the report. ChatGPT generated the first pass and the test cases. I rewrote the error handling and the encryption, because the generated version failed on both. I will always tell you which parts were assisted. Guessing is worse than asking.` },

  { q: 'Can you talk to people who are not engineers?',
    a: `It is most of what I did at Micron and at DBS. Engineers in Penang and Xian did not want a model, they wanted to see which board failed. A checker at a bank does not want a formula, they want the bad rows already lit up. Two years in a commando battalion taught me the same thing from a different direction: if the other person cannot repeat it back, it was not communicated.` },

  { q: 'What are you looking for?',
    a: `Graduate and internship roles in fintech, data, and software, in Singapore or remote. Anything where the job is turning messy data into a decision someone can make.` }
],

/* ============================================================================
   08  CONTACT
   ========================================================================== */
contact: {
  kicker:  '08 / Contact',
  heading: 'Found something worth a conversation?',
  lede:    'Questions, collaborations, job openings, or a good joke. I will answer the first three and laugh at the last one.',
  nameLabel: 'Your name',        namePlaceholder: 'Who is writing?',
  mailLabel: 'Your email',       mailPlaceholder: 'Where I should reply',
  msgLabel:  'Your message',     msgPlaceholder:  'What is on your mind?',
  button:    'Send it',
  note:      'This opens your own email app with the message ready. Nothing is stored on this site, because there is no server behind it.',
  success:   'Your email app is opening with this message ready to go. Hit send and it lands with me.'
}

};
