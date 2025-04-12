from ai.huggingface import query_huggingface

def get_bot_response(message: str):
    model = "mistralai/Mixtral-8x7B-Instruct-v0.1"

    # 👇 Yeh proper prompt formatting hai Mixtral ke liye
    prompt = f"<|user|>\n{message.strip()}\n<|end|>\n<|assistant|>\n"
    payload = {"inputs": prompt}

    response = query_huggingface(model, payload)

    # ✅ Clean response
    if isinstance(response, list) and len(response) > 0 and "generated_text" in response[0]:
        full_text = response[0]["generated_text"]
        clean_reply = full_text.replace(prompt, "").strip()
        return clean_reply

    elif isinstance(response, dict) and "error" in response:
        return "Error: HuggingFace API issue. " + response["error"]

    else:
        return "Error: Unexpected response format."