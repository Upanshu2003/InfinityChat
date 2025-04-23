from ai.huggingface import query_huggingface

def get_bot_response(message: str):
    model = "TheBloke/Mistral-7B-Instruct-v0.1-GGUF"


    prompt = f"<|user|>\n{message.strip()}\n<|end|>\n<|assistant|>\n"
    payload = {"inputs": prompt}

    response = query_huggingface(model, payload)


    if isinstance(response, list) and len(response) > 0 and "generated_text" in response[0]:
        full_text = response[0]["generated_text"]
        clean_reply = full_text.replace(prompt, "").strip()
        return clean_reply

    elif isinstance(response, dict) and "error" in response:
        return "Error: HuggingFace API issue. " + response["error"]

    else:
        return "Error: Out of messages. Please contact admin at <a href='mailto:upanshu3942@gmail.com'>upanshu3942@gmail.com</a>"