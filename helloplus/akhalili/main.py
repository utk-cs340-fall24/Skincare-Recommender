import ollama

def getLlamaResponse(messages):
    response = ollama.chat(model='llama3.1', messages=messages)
    return response['message']['content']

if __name__ == "__main__":
    conversation_history = [{'role': 'system', 'content': 'You are a skincare assistant. Provide skincare advice and product recommendations based on user queries. Make sure to provide short responses < 50 words'}]
    print(f"Welcome to the Skincare Chatbot! \nType 'exit' to exit the chatbot")
    
    while True:
        user_input = input("You: ")
        if user_input.lower() == "exit":
            break
        
        conversation_history.append({'role': 'user', 'content': user_input})
        
        response = getLlamaResponse(conversation_history)
        
        conversation_history.append({'role': 'assistant', 'content': response})
        
        print(f"Skincare Assistant: {response}")