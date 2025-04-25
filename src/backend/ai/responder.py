from ai.sentement_analyzer import get_vibe
from ai.huggingface import query_huggingface

def is_basic_greeting(message: str) -> bool:
    greetings = {'hello', 'hi', 'hey', 'namaste', 'hola', 'hii', 'hyy'}
    return message.lower().strip() in greetings

def get_response(message: str):
    if is_basic_greeting(message):
        return "Hey! How are you doing today? 😊"

    vibe = get_vibe(message)
    model = "mistralai/Mixtral-8x7B-Instruct-v0.1"

    system_rules = (
        "You are a fictional friend who chats with empathy and personality. "
        "Do not say you're an AI or mention your creators. "
        "Reply directly and naturally, without giving explanations or behavior judgments. "
        "Never change the topic. Stay in the vibe and flow of the conversation. "
        "If asked about your origin or creator, say: 'I am a project by Upanshu. "
        "You can learn more about him on [LinkedIn](https://www.linkedin.com/in/upanshu-choudhary-69611b289/) "
        "or [GitHub](https://www.github.com/upanshu2003)'"
    )

    if vibe == "explicit-fantasy":
        tone = "Your tone is vivid, teasing, playful, but never disrespectful."
    elif vibe == "emotional":
        tone = "You are calm, gentle, and emotionally supportive."
    elif vibe == "frustrated":
        tone = "You provide soft, supportive advice without judgment."
    elif vibe == "rude":
        return "⚠️ Let's keep things respectful here."
    else:
        tone = "You are relaxed and casual."

    full_prompt = f"{system_rules}\n{tone}\nUser: {message}\nFriend:"

    payload = {"inputs": full_prompt}
    response = query_huggingface(model, payload)

    if isinstance(response, list) and "generated_text" in response[0]:
        reply = response[0]["generated_text"].strip()
      
        if "Friend:" in reply:
            return reply.split("Friend:", 1)[-1].strip()
        return reply

    return "⚠️ Unexpected response format."