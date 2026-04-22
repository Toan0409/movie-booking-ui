import axiosClient from './axiosClient';

const chatbotApi = {
    async sendMessage(message) {
        try {
            const response = await axiosClient.post('/chatbot/chat', {
                message: message.trim()
            });

            // Handle both task format {reply} and existing page {data: {message}}
            const reply = response.data.reply || response.data.data?.message || response.data.message || 'Xin lỗi, tôi chưa hiểu câu hỏi của bạn.';

            return {
                reply,
                movies: response.data.data?.movies || [] // Compatible with ChatbotPage
            };
        } catch (error) {
            console.error('Chatbot API error:', error);
            throw new Error('Không thể kết nối chatbot. Vui lòng thử lại.');
        }
    }
};

export default chatbotApi;
