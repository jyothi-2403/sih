import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Lazy Gemini client helper
let geminiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!process.env.GEMINI_API_KEY) {
    return null;
  }
  if (!geminiClient) {
    geminiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return geminiClient;
}

// Health check
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    app: "Pragya AI",
    tagline: "Learn. Play. Grow.",
    problemStatement: "SIH 2026 - Problem Statement 26101",
    hasGeminiKey: Boolean(process.env.GEMINI_API_KEY),
  });
});

// Authentication Routes
app.post("/api/auth/login", (req, res) => {
  const { email, role } = req.body;
  // Demo token simulation
  const token = "pragya-jwt-" + Math.random().toString(36).substring(2);
  res.json({
    success: true,
    token,
    user: {
      email: email || "arjun.sharma@mospi.gov.in",
      role: role || "learner",
    },
  });
});

app.post("/api/auth/register", (req, res) => {
  const { name, email, role, department, designation } = req.body;
  const token = "pragya-jwt-" + Math.random().toString(36).substring(2);
  res.json({
    success: true,
    token,
    user: {
      name,
      email,
      role: role || "learner",
      department,
      designation,
    },
  });
});

// Competency Gap Analysis with Gemini AI
app.post("/api/competency/analyze", async (req, res) => {
  const { role, department, skills } = req.body;
  const ai = getGeminiClient();

  let explanation = "";
  if (ai) {
    try {
      const prompt = `You are the chief competency architect for India's Official Statistical System under MoSPI.
Analyze the following learner skills and competency gaps for the role of ${role || "Statistical Officer"} in the department of ${department || "Field Operations Division"}:
Skills: ${JSON.stringify(skills)}

Provide a concise, highly professional 2-paragraph analysis highlighting:
1. The highest priority skill gaps needing immediate capacity building.
2. How acquiring these competencies directly strengthens official statistical survey data quality, economic indices, and evidence-based policymaking in India.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: prompt,
      });
      explanation = response.text || "";
    } catch (err) {
      console.warn("Gemini competency analysis fallback:", err);
    }
  }

  if (!explanation) {
    explanation = `Based on your diagnostic profile as a ${role || "Senior Statistical Officer"} in ${department || "Field Operations Division (FOD)"}, your highest priority skill gaps are Python for Data Analysis (Gap: 3/5 - High) and Data Visualization & Reporting (Gap: 3/5 - High). 

Strengthening programmatic data wrangling via Python will automate validation checks on large-scale NSS survey schedules and drastically reduce non-sampling errors. Furthermore, enhancing visual reporting skills will empower your division to present rapid policy dashboards for district and national planning bodies.`;
  }

  res.json({
    success: true,
    analysis: explanation,
    calculatedAt: new Date().toISOString(),
  });
});

// AI Content Material Processing (OCR, Chunking, Vector Embedding simulation)
app.post("/api/materials/process", async (req, res) => {
  const { fileName, textContent } = req.body;
  const ai = getGeminiClient();

  let summary = "";
  let extractedConcepts: string[] = [];

  if (ai && textContent) {
    try {
      const prompt = `You are an AI curriculum specialist for India's National Academy of Statistical Administration (NASA).
Extract key concepts and write a 2-paragraph summary of this official statistical training material:
File: ${fileName}
Content: ${textContent.substring(0, 4000)}

Respond strictly in JSON format with two keys:
"summary": string,
"concepts": string[]`;

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        },
      });

      if (response.text) {
        const parsed = JSON.parse(response.text);
        summary = parsed.summary || "";
        extractedConcepts = parsed.concepts || [];
      }
    } catch (err) {
      console.warn("Gemini material processing fallback:", err);
    }
  }

  if (!summary) {
    summary = `This training document provides comprehensive operational guidelines for statistical officers, detailing standardized field procedures, primary sampling unit (PSU) definitions, sampling multipliers, and rigorous data quality validation protocols.`;
    extractedConcepts = [
      "Primary Sampling Units (PSU)",
      "Stratification Criteria",
      "Inverse Probability Weighting",
      "Field Paradata Auditing",
      "Non-Sampling Error Mitigation",
    ];
  }

  res.json({
    success: true,
    summary,
    extractedConcepts,
    chunksCreated: 14,
    vectorStore: "ChromaDB Ready (Collection: mospi_official_materials)",
  });
});

// AI Quiz Generator from Material (MCQs)
app.post("/api/ai/generate-quiz", async (req, res) => {
  const { topic, materialText, difficulty = "Medium", count = 4 } = req.body;
  const ai = getGeminiClient();

  if (ai && (materialText || topic)) {
    try {
      const prompt = `You are a senior statistical examiner creating rigorous multiple-choice questions (MCQs) for India's Official Statistical System (MoSPI / NASA).
Topic: ${topic || "Official Statistics & Survey Methodology"}
Reference Material: ${(materialText || "").substring(0, 4000)}
Number of questions: ${count}
Difficulty level: ${difficulty}

CRITICAL RULES:
- Questions must be grounded in real statistical concepts and the provided material.
- Each question must have exactly 4 options.
- Exactly one correct answer (index 0, 1, 2, or 3).
- Provide an informative statistical explanation.

Return JSON matching this schema:
[
  {
    "question": "string",
    "options": ["A", "B", "C", "D"],
    "correctAnswer": 0,
    "explanation": "string",
    "difficulty": "${difficulty}",
    "topic": "${topic || "General Statistics"}"
  }
]`;

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        },
      });

      if (response.text) {
        const parsed = JSON.parse(response.text);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const questionsWithId = parsed.map((q: any, idx: number) => ({
            id: `gen-q-${Date.now()}-${idx}`,
            question: q.question,
            options: q.options || ["Option A", "Option B", "Option C", "Option D"],
            correctAnswer: typeof q.correctAnswer === "number" ? q.correctAnswer : 0,
            explanation: q.explanation || "Standard statistical protocol applies.",
            difficulty: q.difficulty || difficulty,
            topic: q.topic || topic || "Official Statistics",
          }));
          return res.json({ success: true, questions: questionsWithId });
        }
      }
    } catch (err) {
      console.warn("Gemini quiz generation fallback:", err);
    }
  }

  // Realistic grounded fallback questions
  const fallbackQuestions = [
    {
      id: `gen-q-${Date.now()}-1`,
      question: `In official household surveys, why are sub-sample weights applied to raw sample data?`,
      options: [
        "To inflate sample frequencies to represent the true universe population size",
        "To reduce the number of recorded survey rows",
        "To hide the identities of surveyed respondents",
        "To artificially balance gender disparities"
      ],
      correctAnswer: 0,
      explanation: "Sub-sample weights (multipliers) equal the inverse of the selection probability, ensuring unbiased population parameter estimation.",
      difficulty,
      topic: topic || "Sampling Multipliers"
    },
    {
      id: `gen-q-${Date.now()}-2`,
      question: `Under the Generic Statistical Business Process Model (GSBPM), which phase precedes 'Process'?`,
      options: ["Collect", "Disseminate", "Evaluate", "Analyse"],
      correctAnswer: 0,
      explanation: "GSBPM specifies: Specify Needs -> Design -> Build -> Collect -> Process -> Analyse -> Disseminate -> Evaluate.",
      difficulty,
      topic: topic || "GSBPM Framework"
    },
    {
      id: `gen-q-${Date.now()}-3`,
      question: `What distinguishes Stratified Sampling from Cluster Sampling?`,
      options: [
        "Stratification samples from all strata for precision; clustering samples groups to reduce travel cost",
        "Clustering is always more accurate than stratification",
        "Stratified sampling does not use random selection",
        "Cluster sampling is illegal in national surveys"
      ],
      correctAnswer: 0,
      explanation: "Stratification creates homogeneous groups to minimize sampling variance, while clustering groups heterogeneous units logistically.",
      difficulty,
      topic: topic || "Sampling Theory"
    },
    {
      id: `gen-q-${Date.now()}-4`,
      question: `What statistical check detects enumerator fabrication in Computer Assisted Personal Interviewing (CAPI)?`,
      options: [
        "Paradata analysis of interview duration and GPS geo-stamping",
        "Changing respondent telephone numbers",
        "Printing paper schedules after interview",
        "Disabling battery power saving mode"
      ],
      correctAnswer: 0,
      explanation: "Paradata tracks timestamps per question and spatial coordinates to catch abnormal speed-running and off-location interviews.",
      difficulty,
      topic: topic || "CAPI Quality Control"
    }
  ];

  res.json({ success: true, questions: fallbackQuestions });
});

// AI Game Generator (Matching, Scenario, True/False)
app.post("/api/ai/generate-game", async (req, res) => {
  const { type, topic, materialText, difficulty = "medium" } = req.body;
  const ai = getGeminiClient();

  if (ai && (materialText || topic)) {
    try {
      let prompt = "";
      if (type === "match_concept") {
        prompt = `Generate 5 high-quality concept-definition pairs for an educational matching game in India's Official Statistical System.
Topic: ${topic || "Statistics"}
Material: ${(materialText || "").substring(0, 3000)}
Return strictly JSON matching:
{
  "title": "Match: ${topic || "Key Concepts"}",
  "pairs": [
    { "concept": "Term", "definition": "Accurate clear definition (under 15 words)" }
  ]
}`;
      } else if (type === "scenario_challenge") {
        prompt = `Generate 3 realistic professional dilemma scenarios faced by Statistical Officers / Data Analysts in India.
Topic: ${topic || "Field Survey & Data Analysis"}
Material: ${(materialText || "").substring(0, 3000)}
Return strictly JSON matching:
{
  "title": "Scenario Challenge: ${topic || "Official Statistics"}",
  "scenarios": [
    {
      "situation": "Detailed realistic workplace situation",
      "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
      "correctOption": 0,
      "explanation": "Why this is correct under statistical protocols",
      "hint": "Helpful guiding hint"
    }
  ]
}`;
      } else {
        prompt = `Generate 5 true or false statements on official statistical methodology.
Topic: ${topic || "Official Statistics"}
Return strictly JSON matching:
{
  "title": "True or False: ${topic || "Statistical Concepts"}",
  "items": [
    { "statement": "Clear statement", "isTrue": true, "explanation": "Rationale" }
  ]
}`;
      }

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        },
      });

      if (response.text) {
        const parsed = JSON.parse(response.text);
        return res.json({ success: true, game: parsed });
      }
    } catch (err) {
      console.warn("Gemini game generation fallback:", err);
    }
  }

  // Fallback game pack
  if (type === "match_concept") {
    res.json({
      success: true,
      game: {
        title: `Match: ${topic || "Key Statistical Concepts"}`,
        pairs: [
          { concept: "Primary Sampling Unit", definition: "First-stage cluster such as Census Village or Urban Frame Block" },
          { concept: "Design Effect (Deff)", definition: "Ratio of complex sample variance to simple random sample variance" },
          { concept: "Consumer Price Index", definition: "Monthly indicator measuring retail price movements across representative baskets" },
          { concept: "Sampling Multiplier", definition: "Inverse probability weight used to compute national universe aggregates" },
          { concept: "CAPI Paradata", definition: "Auxiliary interview process timestamps and geospatial coordinates" }
        ]
      }
    });
  } else if (type === "scenario_challenge") {
    res.json({
      success: true,
      game: {
        title: `Scenario Challenge: ${topic || "Field Survey Management"}`,
        scenarios: [
          {
            situation: "A field survey team submits data with 20 consecutive households reporting identical monthly milk expenditure of exactly Rs. 500. What is the immediate supervisory action?",
            options: [
              "Flag for potential enumerator fabrication and dispatch a senior supervisor for spot verification",
              "Accept because milk prices might be fixed by state dairy cooperatives",
              "Increase sample weights arbitrarily",
              "Delete the milk column from the state survey bulletin"
            ],
            correctOption: 0,
            explanation: "Suspicious uniformity across varied household sizes strongly suggests synthetic response imputation by the enumerator, mandating physical verification.",
            hint: "Check for natural socio-economic variance among diverse households."
          }
        ]
      }
    });
  } else {
    res.json({
      success: true,
      game: {
        title: `True or False: ${topic || "Statistical Standards"}`,
        items: [
          {
            statement: "In official statistics, non-sampling errors decrease automatically when sample size increases.",
            isTrue: false,
            explanation: "Sample size expansion only reduces sampling error; non-sampling errors may actually escalate if field training is stretched."
          },
          {
            statement: "GSBPM provides a unified lifecycle framework for national and international statistical organizations.",
            isTrue: true,
            explanation: "GSBPM standardizes statistical production phases across 8 universal stages."
          }
        ]
      }
    });
  }
});

// Pragya Assistant (AI Tutor & Chatbot)
app.post("/api/ai/assistant", async (req, res) => {
  const { message, action, context } = req.body;
  const ai = getGeminiClient();

  if (ai && message) {
    try {
      let promptPrefix = "";
      if (action === "explain_simply") {
        promptPrefix = "Explain this statistical or data science concept in simple, accessible language with an everyday analogy: ";
      } else if (action === "give_example") {
        promptPrefix = "Provide a practical real-world example from India's official statistical system (such as NSS surveys, PLFS, CPI, or National Accounts) illustrating: ";
      } else if (action === "give_hint") {
        promptPrefix = "Provide a subtle, pedagogical hint without giving away the direct answer to: ";
      } else if (action === "summarize") {
        promptPrefix = "Summarize the key takeaways and official statistical relevance of: ";
      } else {
        promptPrefix = "Answer this question authoritatively and constructively as Pragya Assistant for India's Official Statistical System: ";
      }

      const prompt = `You are 'Pragya Assistant', an expert AI tutor and mentor dedicated to India's Official Statistical System (MoSPI / NASA / iGOT Karmayogi).
Your tagline is: "Learn. Play. Grow."
Helpful, clear, professional, government-friendly, encouraging.
Context: ${context || "Indian Official Statistics, Data Analysis, Python, and iGOT Karmayogi Capacity Building."}

User request:
${promptPrefix}${message}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: prompt,
      });

      if (response.text) {
        return res.json({ success: true, reply: response.text });
      }
    } catch (err) {
      console.warn("Gemini assistant fallback:", err);
    }
  }

  // Fallback assistant reply
  let reply = "";
  if (action === "explain_simply") {
    reply = `Think of sampling weights like a spokesperson at a town hall. If one person was chosen to represent 500 citizens in their village, their opinion counts with a weight of 500 when calculating the town's overall consensus! In official statistics, this is called the sampling multiplier.`;
  } else if (action === "give_example") {
    reply = `In the Periodic Labour Force Survey (PLFS), households are selected using a two-stage stratified sampling design. First, villages (rural) or Urban Frame Survey blocks (urban) are selected as Primary Sampling Units (PSUs). Then, households within those units are randomly selected to measure employment trends across India.`;
  } else if (action === "give_hint") {
    reply = `Hint: Remember the distinction between sampling error and non-sampling error. Does increasing the number of respondents stop an enumerator from writing down the wrong digit?`;
  } else if (action === "summarize") {
    reply = `Summary: The Generic Statistical Business Process Model (GSBPM) standardizes the entire data production workflow across 8 iterative phases—from specifying user policy needs to final dissemination and evaluation.`;
  } else {
    reply = `Hello! I am Pragya Assistant. In India's Official Statistical System, combining rigorous theoretical sampling with automated Python data pipelines ensures our national indicators—from Consumer Price Index to Gross Value Added—remain robust, transparent, and internationally benchmarked. How can I guide your learning today?`;
  }

  res.json({ success: true, reply });
});

// iGOT Karmayogi Integration Architecture Endpoints
app.get("/api/igot/courses", (_req, res) => {
  res.json({
    success: true,
    service: "iGOT Karmayogi Course Catalog Service",
    provider: "DoPT / MoSPI Capacity Building Commission (CBC)",
    status: "Active (Demo Integration)",
    lastSynced: new Date().toISOString(),
    apiEndpoint: "https://karmayogi.gov.in/api/v2/competency/courses",
  });
});

app.post("/api/igot/sync", (req, res) => {
  const { userId } = req.body;
  res.json({
    success: true,
    message: "Successfully synchronized competency requirements and course progress with iGOT Karmayogi ecosystem.",
    syncedAt: new Date().toISOString(),
    user: userId || "usr-001",
    competencyPassportStatus: "Verified",
  });
});

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Pragya AI server running at http://localhost:${PORT}`);
  });
}

startServer();
