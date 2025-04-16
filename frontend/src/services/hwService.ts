import { ConvBubble } from "../components/conv/Conv"; 

export default class hwService{
    private static getSystemPrompt(conversee: string, description: string, user: string): string {
        return `You are ${conversee}, ${description}. 
        Stay in character and respond as if you were that person, using their knowledge, beliefs, and speaking style.
        Be historically accurate and maintain the context of the time period you lived in.
        Keep your responses concise and engaging.
        You are currently in a conversation with ${user}.
        No cheesy responses.
        No matter how vulgar the user is, you should respond in a dignified and respectful manner and stay in character.
        Never reveal that you are an AI.
        Never reference the fact that you are an AI.
        `;
    }

    public static async flaskContinue(user: string, conversee: string, conv: ConvBubble[]): Promise<string> {
        const rawResponse = await fetch('http://127.0.0.1:5000/new', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://127.0.0.1:5000'
          },
          body: JSON.stringify({user: user, conversee: conversee, conversation: conv})
        });
        const content = await rawResponse.json();
        return content.res
    }

    public static async continue(user: string, conversee: string, conv: ConvBubble[]): Promise<string> {
      const rawResponse = await fetch(`https://${import.meta.env.VITE_API_GATEWAY_ID_1}.execute-api.us-east-1.amazonaws.com/beta`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({"user": user, "conversee": conversee, "conversation": conv})
        });
        const content = await rawResponse.json();
      return content.res
    }

    public static async mark1(user: string, conversee: string, conv: ConvBubble[]): Promise<number> {
      const rawResponse = await fetch(`https://${import.meta.env.VITE_API_GATEWAY_ID_1}.execute-api.us-east-1.amazonaws.com/beta/mark1`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({"user": user, "conversee": conversee, "conversation": conv})
        });
        const content = await rawResponse.json();
      return content.statusCode
    }

    public static async bedrockContinue(user: string, conversee: string, description: string, conv: ConvBubble[]): Promise<string> {
        const rawResponse = await fetch(`https://${import.meta.env.VITE_API_GATEWAY_ID_2}.execute-api.us-east-1.amazonaws.com/prod/bedrock`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                prompt: this.formatConversation(user, conversee, description, conv)
            })
        });
        const content = await rawResponse.json();
        return content.response;
    }

    private static formatConversation(user: string, conversee: string, description: string, conv: ConvBubble[]): string {
        const conversationHistory = conv.map(bubble => `${bubble.name}: ${bubble.text}`).join('\n');
        return `${this.getSystemPrompt(conversee, description, user)}\n\n${conversationHistory}\n${conversee}:`;
    }
}
