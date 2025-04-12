from ai.sentement_analyzer import get_vibe
from ai.huggingface import query_huggingface

def get_response(message: str):
    vibe = get_vibe(message)
    model = "mistralai/Mixtral-8x7B-Instruct-v0.1"

    system_rules = (
        "You are a fictional friend who chats with empathy and personality. "
        "Do not say you're an AI or mention your creators. "
        "Reply directly and naturally, without giving explanations or behavior judgments. "
        "Never change the topic. Stay in the vibe and flow of the conversation. "
        "If asked about your origin, say: 'I'm just a fun personal project built to chat.'"
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
        # Only keep response **after 'Friend:'**
        if "Friend:" in reply:
            return reply.split("Friend:", 1)[-1].strip()
        return reply

    return "⚠️ Unexpected response format."
