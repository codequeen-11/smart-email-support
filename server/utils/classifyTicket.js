const { GoogleGenerativeAI } = require("@google/generative-ai");

function classifyByRules(message) {
  const text = message.toLowerCase();

  if (
    text.includes("password") ||
    text.includes("log in") ||
    text.includes("login") ||
    text.includes("sign in") ||
    text.includes("account locked")
  ) {
    return "Login Issue";
  }

  if (
    text.includes("payment") ||
    text.includes("paid") ||
    text.includes("billing") ||
    text.includes("charged") ||
    text.includes("transaction")
  ) {
    return "Payment Issue";
  }

  if (
    text.includes("bug") ||
    text.includes("error") ||
    text.includes("crash") ||
    text.includes("not working") ||
    text.includes("issue with page")
  ) {
    return "Technical Bug";
  }

  return "General Inquiry";
}

async function classifyTicket(message) {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `
Classify this support message into ONE category only.

Allowed categories:
- Login Issue
- Payment Issue
- Technical Bug
- General Inquiry

Return only the category name.

Message: ${message}
`;

    const result = await model.generateContent(prompt);
    const category = result.response.text().trim();

    const allowed = [
      "Login Issue",
      "Payment Issue",
      "Technical Bug",
      "General Inquiry",
    ];

    return allowed.includes(category) ? category : classifyByRules(message);
  } catch (error) {
    console.log("Gemini classification failed, using fallback:", error.message);
    return classifyByRules(message);
  }
}

module.exports = classifyTicket;