const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.getAIPriceRecommendation = async (productData) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const prompt = `
      Analyze this product and suggest a fair resale price in INR for a student thrift store Campus ThriftX:
      - Product Type: ${productData.category}
      - Title: ${productData.title}
      - Description: ${productData.description}
      - Condition: ${productData.condition}
      - Brand: ${productData.brand}
      - Usage: ${productData.usageDuration}
      - Original Price: ${productData.originalPrice || 'Not provided'}
      - Has Bill: ${productData.hasBill}
      
      Provide a JSON response ONLY with the following structure:
      {
        "recommendedPrice": 1200,
        "minPrice": 1000,
        "maxPrice": 1400,
        "confidence": 85,
        "reasoning": "Based on similar items and condition."
      }
    `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Extract JSON from markdown code block if present
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            return JSON.parse(jsonMatch[0]);
        }
        return JSON.parse(text);

    } catch (error) {
        console.error("AI Price Error:", error);
        // Fallback or error
        return null;
    }
};

exports.getChatbotResponse = async (userMessage, context) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const prompt = `
      You are the AI assistant for "Campus ThriftX", a student marketplace.
      Current page context: ${context.page || 'Home'}
      User's query: "${userMessage}"
      
      Provide a helpful, friendly, and concise response. 
      If asked about pricing, explain that our AI fairness tool calculates it.
      If asked about safety, mention Aadhaar verification and Escrow payments.
    `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("AI Chatbot Error:", error);
        return "I'm having trouble connecting to my brain right now. Please try again later.";
    }
};
