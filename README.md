# History Whisperer

> Connect with history's greatest minds through AI-powered conversations.

History Whisperer is an innovative platform that bridges the gap between the present and the past, allowing users to engage in meaningful conversations with historical figures through advanced AI technology. Started as a college project in 2022, it has evolved into a sophisticated application that demonstrates the potential of AI in education and historical engagement.

[Live Demo](http://www.ajitalapati.com)

## 🌟 Features

- **Interactive Conversations**: Engage in natural dialogue with historical figures
- **Historical Accuracy**: AI responses based on extensive historical research
- **Modern UI/UX**: Clean, responsive interface built with React and Tailwind CSS
- **Dark/Light Mode**: Customizable theme with parchment-like aesthetics
- **User Authentication**: Secure login and personalized experience
- **Mobile Responsive**: Seamless experience across all devices

## 🛠️ Technical Stack

### Frontend
- **Framework**: React with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: React Context API
- **Routing**: React Router v6
- **Testing**: Vitest + React Testing Library
- **Build Tool**: Vite

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Authentication**: Amazon Cognito
- **API Integration**: OpenAI GPT
- **Database**: MongoDB (planned)

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/history-whisperer.git
   ```

2. **Install dependencies**
   ```bash
   cd frontend && npm install
   cd ../backend && npm install
   ```

3. **Set up environment variables**
   ```bash
   # Frontend (.env)
   VITE_API_URL=your_api_url
   VITE_COGNITO_USER_POOL_ID=your_user_pool_id
   VITE_COGNITO_CLIENT_ID=your_client_id

   # Backend (.env)
   OPENAI_API_KEY=your_openai_key
   ```

4. **Run development servers**
   ```bash
   # Frontend
   npm run dev

   # Backend
   npm run dev
   ```

## 🧪 Testing

The project includes comprehensive unit tests for components and utilities:

```bash
# Run tests once
npm test

# Run tests in watch mode
npm run test:watch

# Run tests before build
npm run build
```

## 🔮 Future Plans


### Frontend Improvements
- Add more historical figures
- Implement real-time conversation updates
- Enhance mobile responsiveness
- Add accessibility features
- Implement progressive web app capabilities

### Infrastructure
- Set up automated deployment pipeline
- Implement performance monitoring
- Add error tracking and logging
- Enhance security measures
- Implement caching strategies

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Ajit Alapati**
- Continuously improving and expanding the project
- [Portfolio](http://www.ajitalapati.com)

---

*Note: This project is continuously evolving, with regular updates and improvements being made to both the frontend and backend components.*
