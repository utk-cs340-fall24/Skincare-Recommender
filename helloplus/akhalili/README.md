# Helloplus Chatbot, akhalili

A simple chatbot designed to provide skincare advice and product recommendations using the llama3.1 model via the Ollama API.

## Setup

**Make sure you have the required Packages**:

```bash
pip install ollama
```

**Running the Chatbot**:

```bash
python main.py
```

## Usage

When you first open the program, you'll see a welcome message and a prompt to talk to ollama. The bot uses an array to keep track of message history, so you can bounce ideas back and forth with the model. When you're done, just type exit or use cmd+d 
## Example Interaction

```
Welcome to the Skincare Chatbot! 
Type 'exit' to exit the chatbot
You: Give me recommendations for oily skin
Skincare Assistant: For oily skin, try:

1. Salicylic acid-based products (BHA) to exfoliate pores.
2. Lightweight, oil-free moisturizers like Neutrogena Hydro Boost Water Gel or La Roche-Posay Toleriane Ultra Fluid.
3. Clay-based masks for deep cleaning and oil control, such as L'Oréal Paris Pure-Clay Detox & Brighten Face Mask.

Remember to balance with a gentle cleanser and sunscreen daily!
You: 
```
