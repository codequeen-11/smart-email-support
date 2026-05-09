const { GoogleGenerativeAI } = require("@google/generative-ai");
function generateFallbackReply(message, category) {
  if (category === "Login Issue") {
    return "Hi, we’re sorry you’re having trouble logging in. Please try resetting your password. If the issue continues, our support team will assist you shortly.";
  }

  if (category === "Payment Issue") {
    return "Hi, we’re sorry about the payment issue. Please check your transaction details, and our billing team will review this request as soon as possible.";
  }

  if (category === "Technical Bug") {
    return "Hi, thank you for reporting this technical issue. Our team will investigate the problem and work on a fix.";
  }

  return "Hi, thank you for contacting support. We have received your request and our team will respond shortly.";
}

async function generateReply(message, category) {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `
Write a short, polite, professional customer support reply.

Rules:
- Keep it under 3 sentences.
- Do not mention that you are an AI.
- Be helpful and professional.
- Say "we" instead of "I" to sound more human and team-oriented.


Category: ${category}
Customer message: ${message}
`;

    const result = await model.generateContent(prompt);
    const response = result.response.text();

    return response.trim();
  } catch (error) {
    console.log("Gemini reply failed, using fallback:", error.message);
    return generateFallbackReply(message, category);
  }
}

module.exports = generateReply;