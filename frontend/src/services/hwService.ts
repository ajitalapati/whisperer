import { ConvBubble } from "../components/conv/Conv"; 

export default class hwService{
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
      const rawResponse = await fetch('https://bcif2jc2wa.execute-api.us-east-1.amazonaws.com/beta/continue', {
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
      const rawResponse = await fetch('https://bcif2jc2wa.execute-api.us-east-1.amazonaws.com/beta/mark1', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({"user": user, "conversee": conversee, "conversation": conv})
        });
        const content = await rawResponse.json();
      return content.statusCode
    }
  }
