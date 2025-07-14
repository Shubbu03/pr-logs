import { ProgressReport } from '@/app/types/progress';

export const sampleReports: ProgressReport[] = [
  {
    "id": "1",
    "number": 1,
    "date": '2025-05-15',
    "items": [
      "Created Carta, a simple writing app",
      "Created a browser extension, the functioning part is done, only UI part remaining",
      "Started revising cohort 3 by @kirat_tw"
    ],
    "link": {
      "name": "Check it out",
      "url": "https://x.com/blackbaloon03/status/1922971503907246176"
    },
    "tags": ["side-projects", "learning", "cohort"]
  },
  {
    "id": "2",
    "number": 2,
    "date": '2025-05-18',
    "items": [
      "Completed the extension and published on web (rather tiring process)",
      "Didn’t do much development",
      "Revised async JS and Promises"
    ],

    "tags": ["javascript", "extension", "revision"]
  },
  {
    "id": "3",
    "number": 3,
    "date": '2025-05-22',
    "items": [
      "Revised basics of Next.js and websockets",
      "Did some Golang, made minor projects for learning",
      "Built the backend of the chess application",
      "Started building the backend for Excalidraw project"
    ],

    "tags": ["golang", "backend", "nextjs"]
  },
  {
    "id": "4",
    "number": 4,
    "date": '2025-05-25',
    "items": [
      "Completed Excalidraw project once by coding along with @kirat_tw",
      "Started rebuilding it to better understand turborepo",
      "Using Next.js with NextAuth for this version",
      "Completed login and signup backend + frontend",
      "Struggled with Tailwind config in turborepo"
    ],

    "tags": ["nextjs", "turborepo", "auth"]
  },
  {
    "id": "5",
    "number": 5,
    "date": '2025-05-28',
    "items": [
      "Done with websocket backend",
      "Implemented queues with BullMQ & Redis",
      "Started with room creation API and frontend",
      "Project mostly to be done this week"
    ],

    "tags": ["redis", "websockets", "bullmq"]
  },
  {
    "id": "6",
    "number": 6,
    "date": '2025-05-30',
    "items": [
      "Mostly done with frontend",
      "Added pencil, line, rect, circle & eraser functions",
      "Some more shapes and optimisations left",
      "APIs mostly done"
    ],

    "tags": ["frontend", "canvas", "drawing"]
  },
  {
    "id": "7",
    "number": 7,
    "date": '2025-06-02',
    "items": [
      "Completed the Excalidraw project",
      "Started learning DevOps to deploy such projects",
      "Learnt basic networking, IPs, VMs, SSH",
      "Started Paytm project with Golang backend"
    ],

    "tags": ["devops", "golang", "networking"]
  },
  {
    "id": "8",
    "number": 8,
    "date": '2025-06-08',
    "items": [
      "Completed backend for Paytm project in Golang",
      "Started frontend for the same",
      "Learnt EC2 deployment, Certbot, security groups"
    ],

    "tags": ["deployment", "ec2", "golang"]
  },
  {
    "id": "9",
    "number": 9,
    "date": '2025-06-09',
    "items": [
      "Started learning Docker, completed part 1",
      "Continued Paytm project",
      "Noticed slowdown after removing cursor but gained deeper understanding"
    ],

    "tags": ["docker", "learning", "golang"]
  },
  {
    "id": "10",
    "number": 10,
    "date": '2025-06-11',
    "items": [
      "Polished the UI of Paytm project",
      "Worked on profile panel",
      "Added support for multiple currencies",
      "Project completed, next step is deployment"
    ],

    "tags": ["ui", "paytm", "golang"]
  },
  {
    "id": "11",
    "number": 11,
    "date": '2025-06-12',
    "items": [
      "Completed remaining tasks for Paytm project",
      "Polished UI and fixed bugs",
      "Spent time on Dockerfile and deployment",
      "Made video demo",
      "Practised some basic Golang"
    ],

    "tags": ["docker", "deployment", "golang"]
  },
  {
    "id": "12",
    "number": 12,
    "date": '2025-06-13',
    "items": [
      "Completed backend for chat app",
      "Added rate limiting and validations",
      "Started frontend: landing page and auth pages done",
      "Revised Docker basics, learnt volumes and networks"
    ],

    "tags": ["chat-app", "docker", "validation"]
  },
  {
    "id": "13",
    "number": 13,
    "date": '2025-06-20',
    "items": [
      "Learnt Docker Compose",
      "Wrote compose file for practice project and hosted app",
      "Reviewed Open Cut codebase and made a small PR",
      "Planning to create devlogs site"
    ],

    "tags": ["docker", "open-source", "compose"]
  },
  {
    "id": "14",
    "number": 14,
    "date": '2025-06-23',
    "items": [
      "Completed Golang basics up to slices",
      "Merged 2 PRs in Open Cut",
      "Wrote Dockerfile & Compose for brainly app",
      "Explored browser extension idea",
      "Prepared for Turbin3 orientation"
    ],

    "tags": ["golang", "docker", "open-source"]
  },
  {
    "id": "15",
    "number": 15,
    "date": '2025-06-25',
    "items": [
      "Completed Turbin3 prerequisites 1 & 2",
      "Completed Rust basics up to functions",
      "Did research and outlined next project",
      "Decided to build original projects next"
    ],

    "tags": ["rust", "planning", "turbin3"]
  },
  {
    "id": "16",
    "number": 16,
    "date": '2025-06-26',
    "items": [
      "Watched and practiced previous Turbin3 classroom videos",
      "Did basic Rust from the Rust book",
      "Practiced with Rustlings",
      "Setup and made basic auth flow for my project (now on hold)",
      "Learnt a lot about Solana"
    ],

    "tags": ["rust", "auth", "solana"]
  },
  {
    "id": "17",
    "number": 17,
    "date": '2025-06-30',
    "items": [
      "Last few days were all about Solana",
      "Learned about PDAs, ATAs, and tokens",
      "Will continue deep diving into Solana"
    ],

    "tags": ["solana", "blockchain", "learning"]
  },
  {
    "id": "18",
    "number": 18,
    "date": '2025-07-08',
    "items": [
      "Learnt Anchor basics",
      "Implemented escrow in Rust + Anchor",
      "Read a lot about escrows and vault in Solana",
      "Will continue with vault and escrow and deep dive into AMMs"
    ],

    "tags": ["anchor", "solana", "escrow"]
  },
  {
    "id": "19",
    "number": 19,
    "date": '2025-07-11',
    "items": [
      "Attended @solanaturbine builders cohort session",
      "Learned another implementation of vault",
      "Started writing tests for it",
      "Researched capstone project, thinking of doing something with Solana Pay"
    ],

    "tags": ["solana", "vault", "testing"]
  },
  {
    "id": "20",
    "number": 20,
    "date": "2025-07-13",
    "items": [
      "Attended AMM class at solana turbine cohort, bit difficult class to grasp at once.",
      "Completed tests for vault and escrow, all passing",
      "Repo for turbine org updated completely",
      "Researched about the capstone project, setup and init done, many more things to focus on"
    ],

    "tags": ["solana", "turbine", "amm"]
  },
  {
    "id": "21",
    "number": 21,
    "date": "2025-07-14",
    "items": [
      "did a lot of work on the capstone project this past few days.",
      "really enjoyed building & learning new things, did AMM",
      "also created PR Logs - Progress Reports for these pr",
      "getting an itch to do vault, escrow again and practice more anchor"
    ],
    "link": {
      "name": "pr-logs",
      "url": "https://pr-logs.shubbu.dev/"
    },
    "tags": ["solana", "turbine", "capstone"]
  }
]
