export default class hwService{
    // Insert an article
    public static async continueConv(user: string, conversee: string, conv: string[]): Promise<string> {
        const rawResponse = await fetch('http://127.0.0.1:5000/new', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({user: user, conversee: conversee, conversation: conv})
        });
        const content = await rawResponse.json();
        return content.res
    }
}