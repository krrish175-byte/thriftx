const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.getAIPriceRecommendation = async (productData) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `
      Act as an expert appraiser for "Campus ThriftX", a student-to-student marketplace. 
      Your goal is to suggest a FAIR and REALISTIC resale price for used items.
      
      **Product Details:**
      - Category: ${productData.category}
      - Title: ${productData.title}
      - Description: ${productData.description}
      - Condition: ${productData.condition} (Brand New > Excellent > Good > Fair > Poor)
      - Brand: ${productData.brand}
      - Usage Duration: ${productData.usageDuration}
      - Original Price: ${productData.originalPrice ? '₹' + productData.originalPrice : 'Not provided'}
      - Bill Available: ${productData.hasBill ? 'Yes (Verified)' : 'No'}

      **Valuation Rules (IMPORTANT):**
      1. **Depreciation**: Start with the Original Price. 
         - Open Box/New: ~80-90% of original.
         - Excellent: ~60-70% of original.
         - Good: ~40-50% of original.
         - Fair/Poor: ~20-30% of original.
         - *Heavy Usage (>1 year)*: Reduce value further by 10-15%.
      2. **Student Budget**: This is for students. Prices must be affordable. If the calculated price is very high (e.g., > ₹5000 for a used jacket), suggest a slightly lower, faster-selling price.
      3. **Unknown Original Price**: If Original Price is NOT provided, estimate the current market value of a NEW item of this brand/type first, then apply depreciation.
      4. **Brand Value**: Premium brands (Nike, Zara, Apple) hold value better than generic items.

      **Output Format:**
      Provide a JSON response ONLY. Do not add markdown or explanations outside the JSON.
      {
        "recommendedPrice": (Integer, the ideal selling price),
        "minPrice": (Integer, roughly 10% lower than recommended),
        "maxPrice": (Integer, roughly 10% higher than recommended),
        "confidence": (Integer 0-100, based on how much info is provided),
        "reasoning": "A short, 1-sentence explanation for the user (e.g., '50% off original price due to 1 year usage')."
      }
    `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        console.log("Gemini Raw Response:", text);

        // Extract JSON from markdown code block if present
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            return JSON.parse(jsonMatch[0]);
        }
        return JSON.parse(text);

    } catch (error) {
        console.error("AI Price Error:", error);
        // Return null to indicate failure
        return null;
    }
};

exports.getChatbotResponse = async (userMessage, context) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

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
