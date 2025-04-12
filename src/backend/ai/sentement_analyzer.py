from ai.huggingface import query_huggingface

def get_vibe(prompt: str):
    labels = [
        "casual",
        "emotional",
        "frustrated",
        "explicit-fantasy",
        "rude",
        "support-needed"
    ]

    payload = {
        "inputs": prompt,
        "parameters": {
            "candidate_labels": labels,
            "multi_label": True
        }
    }

    result = query_huggingface("facebook/bart-large-mnli", payload)

    if isinstance(result, dict) and "labels" in result:
        top_label = result["labels"][0]
        score = result["scores"][0]

   
        if top_label == "explicit-fantasy" and score > 0.7:
            return "explicit-fantasy"
        elif top_label == "emotional" and score > 0.7:
            return "emotional"
        elif top_label == "frustrated":
            return "frustrated"
        elif top_label == "rude":
            return "rude"
        return "casual"
    
    return "casual"

