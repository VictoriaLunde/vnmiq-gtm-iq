const questions = [
  // POSITIONING IQ
  {
    id: 1,
    category: "positioning",
    text: "Our target customers can quickly understand what we do and why it matters."
  },
  {
    id: 2,
    category: "positioning",
    text: "Our value proposition is clearly differentiated from our competitors and alternative solutions."
  },
  {
    id: 3,
    category: "positioning",
    text: "Our messaging communicates customer problems and measurable outcomes rather than primarily describing product features."
  },
  {
    id: 4,
    category: "positioning",
    text: "Sales, marketing, and leadership communicate a consistent market narrative."
  },
  {
    id: 5,
    category: "positioning",
    text: "We have evidence that our positioning and messaging resonate with our highest-value customers."
  },

  // MARKET IQ
  {
    id: 6,
    category: "market",
    text: "We have a clearly defined Ideal Customer Profile (ICP) based on customer and market data."
  },
  {
    id: 7,
    category: "market",
    text: "We understand the decision-makers, champions, influencers, and end users involved in buying our solution."
  },
  {
    id: 8,
    category: "market",
    text: "We can identify specific market, company, or buyer signals that indicate when a prospect may be ready to buy."
  },
  {
    id: 9,
    category: "market",
    text: "We prioritize accounts or audiences based on fit, opportunity, and timing instead of treating every lead equally."
  },
  {
    id: 10,
    category: "market",
    text: "We understand why our best customers choose us, what triggers their purchase, and what alternatives they consider."
  },

  // REVENUE IQ
  {
    id: 11,
    category: "revenue",
    text: "We have a documented and repeatable process for turning prospects into customers."
  },
  {
    id: 12,
    category: "revenue",
    text: "Leadership has clear visibility into how prospects move from initial interest through qualified pipeline to closed revenue."
  },
  {
    id: 13,
    category: "revenue",
    text: "We consistently measure meaningful conversion metrics throughout our GTM funnel."
  },
  {
    id: 14,
    category: "revenue",
    text: "Our team can consistently determine which opportunities deserve the most attention and why."
  },
  {
    id: 15,
    category: "revenue",
    text: "We can forecast future pipeline and revenue using data we trust."
  },

  // AI + SYSTEMS IQ
  {
    id: 16,
    category: "systems",
    text: "Our CRM and customer data are consistently maintained and trusted by our GTM organization."
  },
  {
    id: 17,
    category: "systems",
    text: "We automate repetitive GTM activities that do not require human judgment."
  },
  {
    id: 18,
    category: "systems",
    text: "Our team uses AI for meaningful GTM activities beyond basic content generation."
  },
  {
    id: 19,
    category: "systems",
    text: "Our sales, marketing, customer, and account data are connected well enough to support decision-making."
  },
  {
    id: 20,
    category: "systems",
    text: "Our technology stack provides actionable intelligence about what our GTM team should do next."
  },

  // TEAM IQ
  {
    id: 21,
    category: "team",
    text: "Responsibilities across sales, marketing, customer success, and leadership are clearly defined."
  },
  {
    id: 22,
    category: "team",
    text: "Our GTM professionals spend most of their time on work that requires human judgment, relationships, creativity, or selling."
  },
  {
    id: 23,
    category: "team",
    text: "Our team receives structured enablement across messaging, sales process, technology, data, and AI."
  },
  {
    id: 24,
    category: "team",
    text: "Before adding GTM headcount, we evaluate whether AI, automation, or process improvements could increase our existing team's capacity."
  },
  {
    id: 25,
    category: "team",
    text: "Our GTM operation could significantly increase revenue without requiring headcount to increase at the same rate."
  }
];

const categoryNames = {
  positioning: "POSITIONING IQ™",
  market: "MARKET IQ™",
  revenue: "REVENUE IQ™",
  systems: "AI + SYSTEMS IQ™",
  team: "TEAM IQ™"
};

const scaleOptions = [
  { value: 1, label: "Not at all" },
  { value: 2, label: "Beginning" },
  { value: 3, label: "Partially" },
  { value: 4, label: "Mostly" },
  { value: 5, label: "Fully" }
];

const questionsContainer = document.getElementById("questionsContainer");
const assessmentForm = document.getElementById("gtmAssessment");
const resultsSection = document.getElementById("results");

function renderQuestions() {
  let currentCategory = "";

  questions.forEach((question) => {
    if (question.category !== currentCategory) {
      currentCategory = question.category;

      const categoryHeader = document.createElement("div");
      categoryHeader.className = "question-category";
      categoryHeader.innerHTML = `
        <p class="section-label">${categoryNames[currentCategory]}</p>
      `;

      questionsContainer.appendChild(categoryHeader);
    }

    const questionBlock = document.createElement("div");
    questionBlock.className = "question-block";

    const optionsHtml = scaleOptions
      .map(
        (option) => `
          <label class="scale-option">
            <input
              type="radio"
              name="question-${question.id}"
              value="${option.value}"
              required
            >
            <span class="scale-number">${option.value}</span>
            <span class="scale-label">${option.label}</span>
          </label>
        `
      )
      .join("");

    questionBlock.innerHTML = `
      <h3>
        <span class="question-number">${question.id}.</span>
        ${question.text}
      </h3>

      <div class="question-options">
        ${optionsHtml}
      </div>
    `;

    questionsContainer.appendChild(questionBlock);
  });
}

function getCategoryScores() {
  const categoryTotals = {
    positioning: 0,
    market: 0,
    revenue: 0,
    systems: 0,
    team: 0
  };

  questions.forEach((question) => {
    const selectedAnswer = document.querySelector(
      `input[name="question-${question.id}"]:checked`
    );

    if (!selectedAnswer) {
      return;
    }

    categoryTotals[question.category] += Number(selectedAnswer.value);
  });

  const categoryScores = {};

  Object.keys(categoryTotals).forEach((category) => {
    categoryScores[category] = Math.round(
      (categoryTotals[category] / 25) * 100
    );
  });

  return categoryScores;
}

function getOverallScore(categoryScores) {
  const scores = Object.values(categoryScores);

  const total = scores.reduce((sum, score) => sum + score, 0);

  return Math.round(total / scores.length);
}

function getMaturityLevel(score) {
  if (score <= 39) {
    return {
      level: "FOUNDATION",
      description:
        "Your GTM infrastructure is still being established. Focus on strengthening the fundamentals before aggressively scaling headcount or spend."
    };
  }

  if (score <= 59) {
    return {
      level: "DEVELOPING",
      description:
        "You have important GTM building blocks in place, but gaps across strategy, systems, intelligence, or execution may be limiting growth."
    };
  }

  if (score <= 79) {
    return {
      level: "SCALING",
      description:
        "You have a functioning GTM engine. Your biggest opportunity is increasing leverage through better intelligence, AI, automation, and enablement."
    };
  }

  return {
    level: "INTELLIGENT GTM",
    description:
      "Your organization demonstrates strong GTM maturity. The next opportunity is advanced optimization, AI orchestration, and scalable intelligence."
  };
}

function getWeakestCategory(categoryScores) {
  return Object.entries(categoryScores).reduce((lowest, current) => {
    return current[1] < lowest[1] ? current : lowest;
  });
}

function getRecommendation(category) {
  const recommendations = {
    positioning:
      "Clarify your value proposition, differentiation, and messaging before scaling demand generation or sales headcount.",

    market:
      "Strengthen your ICP, buyer intelligence, segmentation, and signal strategy so your GTM team knows exactly where to focus.",

    revenue:
      "Improve your sales process, funnel visibility, prioritization, conversion measurement, and forecasting discipline.",

    systems:
      "Evaluate where AI, automation, connected data, and better GTM intelligence can reduce manual work and improve decision-making.",

    team:
      "Review your GTM roles, enablement, workflows, and capacity before adding additional headcount."
  };

  return recommendations[category];
}

assessmentForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const categoryScores = getCategoryScores();
  const overallScore = getOverallScore(categoryScores);
  const maturity = getMaturityLevel(overallScore);
  const weakest = getWeakestCategory(categoryScores);

  document.getElementById("overallScore").textContent = overallScore;

  document.getElementById("positioningScore").textContent =
    categoryScores.positioning;

  document.getElementById("marketScore").textContent =
    categoryScores.market;

  document.getElementById("revenueScore").textContent =
    categoryScores.revenue;

  document.getElementById("systemsScore").textContent =
    categoryScores.systems;

  document.getElementById("teamScore").textContent =
    categoryScores.team;

  document.getElementById("maturityLevel").textContent = maturity.level;

  document.getElementById("maturityDescription").textContent =
    maturity.description;

  document.getElementById("weakestCategory").textContent =
    categoryNames[weakest[0]];

  document.getElementById("recommendation").textContent =
    getRecommendation(weakest[0]);

  resultsSection.classList.remove("hidden");

  resultsSection.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
});

renderQuestions();